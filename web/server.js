import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env.local") });

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/predict" && req.method === "POST") {
    await handlePrediction(req, res);
    return;
  }

  if (req.url?.startsWith("/api/") && req.method !== "GET") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "API route not found." }));
    return;
  }

  const pathname = req.url === "/" ? "/index.html" : (req.url || "/").split("?")[0];
  const filePath = path.resolve(publicDir, "." + pathname);
  if (!filePath.startsWith(publicDir + path.sep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const types = {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".json": "application/json",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".webmanifest": "application/manifest+json",
    };
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
});

async function handlePrediction(req, res) {
  const apiKey = process.env.ULTRALYTICS_API_KEY;
  const modelUrl = process.env.ULTRALYTICS_MODEL_URL;
  if (!apiKey || !modelUrl) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Server configuration error: Missing ULTRALYTICS_API_KEY or ULTRALYTICS_MODEL_URL." }));
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);

    if (!body.length) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Empty image payload received by server." }));
      return;
    }

    const response = await fetch(modelUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": req.headers["content-type"] || "application/octet-stream",
      },
      body,
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      res.writeHead(response.status || 502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Ultralytics returned non-JSON (${response.status}): ${text.slice(0, 140)}` }));
      return;
    }

    res.writeHead(response.status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response.ok ? data : { error: data.message || "Ultralytics API returned an error.", details: data }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to communicate with the inference endpoint.", details: error.message }));
  }
}

server.listen(port, "0.0.0.0", () => {
  console.log(`SightScope AI running at http://localhost:${port}`);
});
