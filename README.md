# nodejs-webcam-smile-capture
This is a project to capture an image when it finds that somebody is smiling in front of webcam.
Server side is a simple node.js project.
Client side (web client) program uses faceapi library to detect face area and captures image when smile detected.
* Bootstrap library is used for responsive page segmentation.
* Server side is a simple node.js program.
* 
**How to use this program**
* Download the project.
* run npm install to install express library in main folder.
* run npm start to run the server
* Open a chrome web browser to http://localhost/3000
* Wait until webcam is loaded 
* Smile to capture an image
* You can press "Capture again" to capture another image.


> **Note 1:** This project needs a webcam attached to the system.

> **Note 2:** It takes a while to load face API library.

> **Note 3:** This project is tested with chrome and firefox web browsers.

> **Note 4:** The project is tested when just a guy in front of it.
