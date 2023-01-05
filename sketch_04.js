// Create a bunch of circles highlighting their intersections

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

  // Black Background
  background(0);

  // Set to HSB
  colorMode(HSB);

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

  // Start Recording
  recorder.start();
}

function draw() {

  // End if we've done 50 circles
  if (frameCount > 150) {
    noLoop();
    recorder.stop();
    return;
  }

  // Draw a circle
  stroke(255);
  strokeWeight(1);
  hue = int(random(0, 25))*10
  fill(hue, 100, 100, 0.5);
  circle(random(0, width), random(0, height), random(0, 100));

  frameCount += 1;

}
