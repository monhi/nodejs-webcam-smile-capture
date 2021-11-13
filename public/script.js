const video = document.getElementById('video')

var captured  	= false;
var HappyCntr 	= 0;

const mycanvas 	= document.getElementById("mycanvas");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),  
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() 
{
	navigator.mediaDevices.getUserMedia({
		video:true,
		audio:false
		}).then(stream =>{video.srcObject = stream });
}

function ProcessAgain()
{
	captured  		= false;
	HappyCntr 		= 0;
	let context  	= mycanvas.getContext('2d');
	context.clearRect(0, 0, mycanvas.width, mycanvas.height);
}

video.addEventListener('playing', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  //document.body.video.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()	
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
	if(!captured)
	{
		if( detections.length > 0 )
		{
			if(detections[0].expressions.happy > 0.90)
			{
				HappyCntr++;
				if(HappyCntr> 4)
				{
					console.log('Happy');	
					HappyCntr = 0;
					captured = true;
					mycanvas.getContext('2d').drawImage(video, 0, 0, mycanvas.width, mycanvas.height);
					let image_data_url = mycanvas.toDataURL('image/jpeg');
					// data url of the image
					console.log(image_data_url);					
				}			
			}
			else
			{
				HappyCntr = 0;
			}
		}		
	}
  }, 100)
})