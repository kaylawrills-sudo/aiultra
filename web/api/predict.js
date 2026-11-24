export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.ULTRALYTICS_API_KEY;
  const modelUrl = process.env.ULTRALYTICS_MODEL_URL;

  if (!apiKey || !modelUrl) {
    return res.status(500).json({
      error: 'Server configuration error: Missing ULTRALYTICS_API_KEY or ULTRALYTICS_MODEL_URL.',
    });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const rawBody = Buffer.concat(chunks);

    if (rawBody.length === 0) {
      return res.status(400).json({ error: 'Empty image payload received by server.' });
    }

    if (rawBody.length > 10 * 1024 * 1024) {
      return res.status(413).json({ error: 'Image exceeds the 10 MB upload limit.' });
    }

    const response = await fetch(modelUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': req.headers['content-type'],
      },
      body: rawBody,
    });

    const rawText = await response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return res.status(response.status || 502).json({
        error: `Ultralytics returned non-JSON (${response.status}): ${rawText.slice(0, 140)}`,
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Ultralytics API returned an error.',
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Inference proxy error:', error);
    return res.status(500).json({
      error: 'Failed to communicate with the inference endpoint.',
      details: error.message,
    });
  }
}