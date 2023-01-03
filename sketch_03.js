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

    // Set initial to random points within the circle
    let angle = random(0, 2 * PI);
    let radius = random(0, width / 2 - 50);
    this.x = width / 2 + cos(angle) * radius;
    this.y = height / 2 + sin(angle) * radius;

    // Set a 'z' height for the 3D noise
    this.z = random(100);

    // Set speed and direction (pointing left)
    this.speed = 0.5 + random(0.5);
    this.angle = random(PI*2);

    // Set color to random yellow orange or red
    this.color = color(128 + random(128), random(128), 128 + random(128));

  }
}


function setup() {
  // Create the canvas
  createCanvas(512, 512);

  // Create some dots and add them to the array
  for (let i = 0; i < 250; i++) {
    dots.push(new Dot());
  }

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

  // Cool effect
  drawingContext.filter = 'blur(3px) brightness(99%)';
  drawingContext.drawImage(canvas, 0, 0);
  drawingContext.filter = "none"

  // Circle
  noFill();
  stroke(220, 20, 220);
  strokeWeight(2);
  ellipse(width / 2, height / 2, width-50, height-50);

  // Draw the dots
  for (let i = 0; i < dots.length; i++) {

    // Skip 80% of dots on a given run
    if (random(1) < 0.6) {
      continue;
    }

    // Draw the dot
    fill(dots[i].color);
    stroke(200, 140, 220, 200);
    ellipse(dots[i].x, dots[i].y, 10, 10);

    // Move the dot
    dots[i].x += dots[i].speed * cos(dots[i].angle);
    dots[i].y += dots[i].speed * sin(dots[i].angle);

    // If the dot is outside the circle, move it to the other side
    if (dist(dots[i].x, dots[i].y, width / 2, height / 2) > (width / 2 - 50)) {
      dots[i].x = width / 2 + cos(dots[i].angle + PI) * (width / 2 - 50);
      dots[i].y = height / 2 + sin(dots[i].angle + PI) * (height / 2 - 50);
    }

    // Change angle based on a 3D flow field
    let angle = noise(dots[i].x / 100, dots[i].y / 100, dots[i].z / 100) * TWO_PI;
    dots[i].angle = lerp(dots[i].angle, angle, 0.1);

    // Accelerate up to max speed
    dots[i].speed = min(dots[i].speed + 0.01, 2.5);

    // Add some glitches
    glitch_mag = 0;
    glitch_dir = 0;
    
    if ((dots[i].x / 35)%2 < 1) {
      if ( random() < 0.2 ) {glitch_mag = 20;}
    }
    if (((dots[i].y + 1.7*dots[i].x) / 70)%2 < 1) {
      if ( random() < 0.2 ) {glitch_mag = -20;}
    }
    if (((dots[i].y + 1.7*dots[i].x) / 70)%2 < 1) {
      if ( random() < 0.2 ) {glitch_dir = 0.3;}
    }

    dots[i].x += glitch_mag * cos(dots[i].angle + glitch_dir);
    dots[i].y += glitch_mag * sin(dots[i].angle + glitch_dir);


  }

  frameCount += 1;

  // Start recording after 1 second
  if (frameCount == 1*60) {
    recorder.start();
  }

  // Stop recording after 512 frames (1 loop)
  if (frameCount == 1*60 + 512*2) {
    recorder.stop();
  };

}
