# SightScope AI

SightScope AI is a responsive web-based object detection platform powered by an Ultralytics YOLO model. It supports image upload, webcam capture, confidence filtering, bounding-box visualization, and installable mobile/PWA access.

## Features

- Upload JPG, PNG, or WEBP images up to 10 MB
- Capture and analyze images from a device camera
- Filter detections using a confidence threshold
- Draw detected object classes and confidence scores on an image
- Responsive desktop, tablet, and mobile interface
- Installable PWA experience
- Secure server-side proxy for the Ultralytics API

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js HTTP server and Vercel serverless function
- AI: Ultralytics-hosted YOLO inference model
- Deployment: Vercel
- Mobile experience: Progressive Web App

 Local Setup

1. Install Node.js 18 or later.
2. Run `npm install` in the project directory.
3. Create `.env.local`:

```text
ULTRALYTICS_API_KEY=your_ultralytics_api_key
ULTRALYTICS_MODEL_URL=https://predict-6b008e27c0ce9e17925f720c-dproatj77a-no.a.run.app/predict
```
4. Run `npm start`.
5. Open `http://localhost:3000`.

Phone Setup on a Local Network

1. Connect the computer and phone to the same Wi-Fi network.
2. Start the server with `npm start`.
3. Find the computer IPv4 address using `ipconfig`.
4. Open `http://COMPUTER_IP_ADDRESS:3000` on the phone.
5. Allow Node.js in Windows Defender Firewall if prompted.

Host a Public Link with Vercel

1. Push the project to GitHub.
2. Sign in to Vercel and choose **Add New Project**.
3. Import the `kaylawrills-sudo/AI-` repository.
4. Set **Root Directory** to `web`.
5. Leave Framework Preset as **Other**.
6. In Project Settings → Environment Variables, add:
   - `ULTRALYTICS_API_KEY` — your current Ultralytics key
   - `ULTRALYTICS_MODEL_URL` — `https://predict-6b008e27c0ce9e17925f720c-dproatj77a-no.a.run.app/predict`
7. Deploy the project.

The previously exposed API key must be revoked and replaced with a new key in Vercel. Never commit `.env.local`.

 Mobile Installation

 Android

1. Open the deployed HTTPS link in Chrome.
2. Choose **Install app** or Chrome menu → **Install app**.
3. Launch SightScope AI from the home screen.

iPhone/iPad

1. Open the deployed HTTPS link in Safari.
2. Tap the Share button.
3. Choose **Add to Home Screen**.

 Project Report

 1. Introduction

SightScope AI was developed to provide a simple visual interface for object detection using a deployed Ultralytics YOLO model. The system allows users to submit visual input and receive object labels, confidence scores, and bounding-box coordinates.

 2. Problem Statement

Many machine-learning demonstrations require technical knowledge and expose users only to raw model output. SightScope AI provides an accessible interface for testing and presenting object detection results.

3. Objectives

- Improve accessibility to AI-powered object detection
- Support image upload and webcam input
- Present detections in visual and text formats
- Provide adjustable confidence filtering
- Support desktop and mobile use

 4. System Architecture

```text
User Device
    │
    ▼
SightScope AI Frontend
    │ HTTPS / multipart form
    ▼
Vercel or Node.js API Proxy
    │ Authorization header
    ▼
Ultralytics YOLO Endpoint
    │ Detection JSON
    ▼
Bounding Boxes and Result List
```

5. Processing Workflow

1. The user uploads or captures an image.
2. The browser validates the image type and maximum size.
3. The frontend previews the image on a canvas.
4. The image is sent to `/api/predict`.
5. The backend forwards it to the configured Ultralytics endpoint.
6. Detection results are validated and filtered.
7. Bounding boxes and confidence values are displayed.

6. Results and Evaluation

Evaluation should include test images containing multiple, small, partially hidden, and unfamiliar objects. Record:

- Total detections
- Correct detections
- Incorrect detections
- Missed detections
- Average confidence
- Response time

Useful metrics are precision, recall, and inference latency. The confidence threshold can be adjusted to reduce false positives or false negatives.

 7. Limitations

- Results depend on the classes supported by the selected YOLO model
- Small or obscured objects may be missed
- Live webcam analysis requires modern browser permission support
- Network latency affects response time
- Public API usage may have cost or rate limits

 8. Future Improvements

- Native Android and iOS applications
- Video and live-stream detection
- Model selection from the interface
- Detection history and data export
- Image annotation downloads
- User accounts and analytics
- Automated model quality evaluation

 Repository

GitHub: `https://github.com/kaylawrills-sudo/AI-`
