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

// Create an array of dots
let dots = [];

// A class for a dot
class Dot {
  constructor() {

    // Set initial position to a random point within the circle
    let angle = random(0, 2 * PI);
    let radius = random(0, width / 2);
    this.x = width / 2 + cos(angle) * radius;
    this.y = height / 2 + sin(angle) * radius;

    // Set speed and direction
    this.speed = 1;
    this.angle = atan2(this.y - height / 2, this.x - width / 2);

  }
}



function setup() {
  // Create the canvas
  createCanvas(512, 512);

  // Create 100 dots and add them to the array
  for (let i = 0; i < 100; i++) {
    dots.push(new Dot());
  }

  // Draw a background
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
}

function draw() {

  // Cool effect
  drawingContext.filter = 'blur(2px) brightness(98%)';
  drawingContext.drawImage(canvas, 0, 0);
  drawingContext.filter = "none"

  // Draw the dots
  for (let i = 0; i < dots.length; i++) {
    // Draw the dot (purple with light outline)
    fill(255, 0, 255);
    stroke(255, 255, 255, 200);
    ellipse(dots[i].x, dots[i].y, 10, 10);

    // Move the dot
    dots[i].x += dots[i].speed * cos(dots[i].angle);
    dots[i].y += dots[i].speed * sin(dots[i].angle);

    // If the dot is outside the circle, move it to the other side
    if (dist(dots[i].x, dots[i].y, width / 2, height / 2) > width / 2) {
      dots[i].x = width / 2 + cos(dots[i].angle + PI) * width / 2;
      dots[i].y = height / 2 + sin(dots[i].angle + PI) * height / 2;
    }
  }

  frameCount += 1;

  // Start recording after 1 second
  if (frameCount == 1*60) {
    recorder.start();
  }

  // Stop recording after 512 frames (1 loop)
  if (frameCount == 1*60 + 512) {
    recorder.stop();
  };
}
