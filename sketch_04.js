// Create a bunch of dots bouncing in a circle

// Set up recording
let chunks = [];
let frameCount = 0;
let recorder = 0;
function exportVideo(e) {
  var blob = new Blob(chunks, { type: 'video/mp4' });
  var vid = document.createElement('video');
  vid.id = 'recorded'
  vid.controls = true;
  vid.src = URL.createObjectURL(blob);
  document.body.appendChild(vid);
  vid.play();
}

function setup() {
  // Create the canvas
  createCanvas(512, 512);

  // Draw a background (dark purple)
  background(0, 0, 64);

  // Set Up Recording (high quality)
  chunks.length = 0;
  let stream = document.querySelector('canvas').captureStream(30)
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8,opus' });
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = exportVideo;
}

function draw() {


  frameCount += 1;

  // // Start recording after 1 second
  // if (frameCount == 1*60) {
  //   recorder.start();
  // }

  // // Stop recording after 512 frames (1 loop)
  // if (frameCount == 1*60 + 512*2) {
  //   recorder.stop();
  // };

}
