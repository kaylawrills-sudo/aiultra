# SightScope AI — Project Report

## 1. Project Overview

SightScope AI is a browser-based object detection application designed for desktop and mobile use. It provides image upload, webcam capture, confidence filtering, and visual bounding-box results using an Ultralytics YOLO model.

The application name was selected to communicate visual inspection and artificial intelligence without directly reproducing the names of third-party technologies.

## 2. Objectives

The project aims to:

- Make YOLO object detection accessible through a simple interface.
- Support both uploaded images and device-camera captures.
- Visualize detections with labels, confidence scores, and bounding boxes.
- Allow users to adjust the minimum confidence threshold.
- Operate on desktop browsers and install as a mobile PWA.
- Keep model credentials on the server rather than in frontend code.

## 3. Target Users

Potential users include:

- Students learning computer vision.
- Developers testing YOLO deployments.
- Researchers demonstrating object detection.
- Educators presenting artificial-intelligence concepts.
- Organizations conducting exploratory image-analysis demonstrations.

## 4. System Components

### Frontend

The frontend uses HTML5, CSS3, JavaScript, Canvas, the MediaDevices API, and a web app manifest.

### Backend

The backend uses Node.js for local development and a Vercel serverless function for public deployment. The backend forwards image data to the configured Ultralytics endpoint and prevents the API credential from being exposed to the browser.

### AI Model

The configured model is served through an Ultralytics-hosted endpoint. It receives an image and returns detected classes, confidence values, and bounding-box coordinates.

### Hosting

Vercel serves the static frontend and serverless prediction route. GitHub stores and manages source changes.

## 5. Architecture

```text
Device Browser
      |
      | Image upload or camera capture
      v
SightScope AI Frontend
      |
      | POST /api/predict
      v
Vercel / Node.js API Proxy
      |
      | Bearer authentication
      v
Ultralytics Inference Endpoint
      |
      | Detection JSON
      v
Browser Canvas and Results Panel
```

## 6. Processing Workflow

1. The user chooses an image or starts the webcam.
2. The browser validates file type and maximum file size.
3. The frontend decodes the image and displays it on a canvas.
4. The user adjusts a confidence threshold.
5. The browser submits the image to `/api/predict`.
6. The server forwards the request to the Ultralytics endpoint.
7. The response is converted into a normalized prediction list.
8. Results below the selected confidence threshold are filtered.
9. The canvas displays bounding boxes and labels.
10. The results panel lists classes and confidence scores.

## 7. Main Features

- Responsive desktop and mobile layout.
- Drag-and-drop image upload.
- JPG, PNG, and WEBP support.
- Maximum 10 MB file validation.
- Webcam activation and photo capture.
- Adjustable confidence threshold.
- Detection count.
- Class and confidence result list.
- Bounding boxes rendered directly on an image.
- Progressive Web App installation support.
- Service-worker app-shell caching.

## 8. Security and Credential Handling

Credentials must be stored as Vercel environment variables:

- `ULTRALYTICS_API_KEY`
- `ULTRALYTICS_MODEL_URL`

The `.env.local` file is excluded from Git commits. The frontend never reads or transmits the API key directly.

A previous API key was exposed in project configuration and chat attachments and should be revoked and replaced.

## 9. Deployment Procedure

1. Commit and push source code to GitHub.
2. Import the GitHub repository into Vercel.
3. Configure Production, Preview, and Development environment variables.
4. Deploy the project.
5. Test `/` and `/api/predict`.
6. Install the PWA from the public HTTPS URL.

## 10. Testing Checklist

| Test | Expected Result |
|---|---|
| Open root URL | SightScope interface loads |
| Upload JPG | Image preview appears |
| Upload PNG | Image preview appears |
| Upload unsupported file | Clear validation error |
| Upload over 10 MB | File rejected |
| Webcam permission granted | Live camera preview appears |
| Webcam permission denied | Clear error displayed |
| Run detection | Loader appears and results update |
| Confidence slider changes | Existing detections are filtered |
| Prediction API unavailable | User-visible error banner appears |
| Android PWA install | App appears on home screen |
| iPhone PWA install | App can be added from Safari |

## 11. Evaluation Plan

Testing should use a dataset containing:

- Multiple objects.
- Small objects.
- Partially hidden objects.
- Background clutter.
- Low-light images.
- Objects outside the model's known classes.

Record:

- True positives.
- False positives.
- False negatives.
- Precision.
- Recall.
- Average inference time.
- Browser and device type.

## 12. Limitations

- Detection accuracy depends on the deployed model and training classes.
- Webcam quality and lighting affect results.
- API availability and network latency affect response time.
- Small or obscured objects may be missed.
- Browser PWA installation availability varies by platform.
- Hosted API usage may have limits or associated cost.

## 13. Future Improvements

- Native Android and iOS applications.
- Live video inference.
- Model selection in the interface.
- Detection history and image export.
- Downloadable annotated images.
- User authentication.
- Usage and accuracy analytics.
- Backend caching and request throttling.
- Automated test suite and CI/CD deployment checks.

## 14. Repository Information

- Repository owner: `kaylawrills-sudo`
- Repository: `https://github.com/kaylawrills-sudo/AI-`
- Branch: `master`
- Application: SightScope AI

## 15. Conclusion

SightScope AI demonstrates a complete object-detection workflow: model configuration, secure API proxying, responsive presentation, image analysis, mobile installation, cloud deployment, and result visualization. Its modular structure allows the model endpoint, interface, or hosting provider to be upgraded independently.
