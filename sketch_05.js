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

  frameCount += 1;

  if (frameCount%5 != 1){
    return
  }

  // Run through each location get the pixel value
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    // If the pixel is in more than one circle, make it red
    if (pixels[i] % 10 != 0){
      pixels[i] = 255;
      pixels[i+1] = 0;
      pixels[i+2] = 0;
      pixels[i+3] = 255;
    }
  }
  updatePixels();

  // End if we've done 50 circles
  if (frameCount > 350) {
    noLoop();
    recorder.stop();
    return;
  }

  // Draw a circle
  stroke(255);
  strokeWeight(1);
  x = int(random(0, 25))*10
  fill(x, x, x, 127);
  let xc = random(0, width);
  let yc = random(0, height);
  let rc = random(50, 150);
  circle(xc, yc, rc);

  // Draw a green square around the circle
  stroke(0, 255, 0, 255)
  noFill()
  rect(xc-rc, yc-rc, 2*rc, 2*rc)


  

}
