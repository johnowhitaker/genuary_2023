// NBNBNB: This code is mostly derived from https://markofthelam.com/archive/downup/
// and all credit should go to Mark Lam. The prompt was 'steal like an artist' you see :)

let font;
let fontData;

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

function drawPathOutline(cmds) {
  // current pen position
  let cx = 0;
  let cy = 0;
  // start position of current contour
  let startX = 0;
  let startY = 0;
  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M':
        startX = cmd.x;
        startY = cmd.y;
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'L':
        line(cx, cy, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'C':
        bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Q':
        beginShape();
        vertex(cx, cy);
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        endShape();
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Z':
        // to complete path
        line(cx, cy, startX, startY);
        break;
		}
  }
}

function preload() {
  fontData = loadBytes('resources/Roboto-Black.ttf');
}

let path, path2;

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

  // Draw things
  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath("IT", 0, 0, 50);
  path2 = font.getPath("DOWN", 0, 0, 50);
  path3 = font.getPath("UP", 0, 0, 50);
  path4 = font.getPath("STEAL", 0, 0, 50);
  path5 = font.getPath("IT", 0, 0, 50);
  path6 = font.getPath("DOWN", 0, 0, 50);
  // frameRate(240);
}

function draw() {

  // Purple Background
  background( 200, 0, 235);
  // text(fameRate(),0,0);
  
  push();
  translate(200, 125);
  path3.draw(drawingContext); // opentype.js
  pop();
  
  push();
	noFill();
  stroke(255, 200, 120)
  strokeWeight(3);
  translate(200, 225);
  drawPathOutline(path3.commands); // p5js
  pop();
  
 
  push();
  translate(200, 300);
  path2.draw(drawingContext); // opentype.js
  pop();
  
  push();
	noFill();
  stroke(255, 200, 120)
  strokeWeight(3);
  translate(200, 400);
  drawPathOutline(path2.commands); // p5js
  setTimeout(aniType,500);
  setTimeout(aniTypeD,500);
  setTimeout(resetNew,5000);
  setTimeout(stopRec,15000);

}

function aniType(){

  if(frameCount%20===0){

    if(path2.commands.length>path.commands.length){
      // path2.commands.splice(path.commands.length);
      path2.commands.pop();
      
    }
  }
  for(let i =0; i<path.commands.length; i++){
    if(path2.commands[i].type==="Q"){
      path2.commands[i].type=path.commands[i].type; 
      delete path2.commands[i].x1; 
      delete path2.commands[i].y1; 
      path2.commands[i].type=path.commands[i].type;
      if(path2.commands[i].x<=path.commands[i].x){
        path2.commands[i].x+=0.1
      }
      if(path2.commands[i].x>=path.commands[i].x){
        path2.commands[i].x-=0.1
      }
      if(path2.commands[i].y<=path.commands[i].y){
        path2.commands[i].y+=0.1
      }
      if(path2.commands[i].y>=path.commands[i].y){
        path2.commands[i].y-=0.1
      }
    }
    if(path.commands[i].type==="Z"){
      path2.commands[i].type=path.commands[i].type;
      delete path2.commands[i].x; 
      delete path2.commands[i].y
    } else if (path.commands[i].type==="Q"){
      path2.commands[i].type=path.commands[i].type; 
      path2.commands[i].type=path.commands[i].type;
      if(path2.commands[i].x<=path.commands[i].x){
        path2.commands[i].x+=0.1
      }
      if(path2.commands[i].x>=path.commands[i].x){
        path2.commands[i].x-=0.1
      }
      if(path2.commands[i].y<=path.commands[i].y){
        path2.commands[i].y+=0.1
      }
      if(path2.commands[i].y>=path.commands[i].y){
        path2.commands[i].y-=0.1
      }
      path2.commands[i].x1=path.commands[i].x1;
      path2.commands[i].y1=path.commands[i].y1
    } 
      else{
      path2.commands[i].type=path.commands[i].type;
      if(path2.commands[i].x<=path.commands[i].x){
        path2.commands[i].x+=0.1
      }
      if(path2.commands[i].x>=path.commands[i].x){
        path2.commands[i].x-=0.1
      }
      if(path2.commands[i].y<=path.commands[i].y){
        path2.commands[i].y+=0.1
      }
      if(path2.commands[i].y>=path.commands[i].y){
        path2.commands[i].y-=0.1
      }
    }
  }
}

function aniTypeD() {

  if (frameCount % 20 === 0) {

      if (path3.commands.length < path4.commands.length) {
          console.log(path3.commands.length, path4.commands.length)
          // path3.commands.splice(path3.commands.length);
          let i = path3.commands.length
              console.log('thisis', i)
              path3.commands.push(path4.commands[i]);
          i++;

      }
  }
  for (let i = 0; i < path3.commands.length; i++) {
      if (path3.commands[i].type === "Q") {
          path3.commands[i].type=path4.commands[i].type;
          delete path3.commands[i].x1;
          delete path3.commands[i].y1;
          path3.commands[i].type=path4.commands[i].type;
          if (path3.commands[i].x <path4.commands[i].x) {
              path3.commands[i].x += 0.1
          }
          if (path3.commands[i].x >path4.commands[i].x) {
              path3.commands[i].x -= 0.1
          }
          if (path3.commands[i].y <path4.commands[i].y) {
              path3.commands[i].y += 0.1
          }
          if (path3.commands[i].y >path4.commands[i].y) {
              path3.commands[i].y -= 0.1
          }
      }
      if (path3.commands[i].type === "Z") {
          path3.commands[i].type=path4.commands[i].type;
          delete path3.commands[i].x;
          delete path3.commands[i].y
      } else if (path3.commands[i].type === "Q") {
          path3.commands[i].type=path4.commands[i].type;
          path3.commands[i].type=path4.commands[i].type;
          if (path3.commands[i].x <path4.commands[i].x) {
              path3.commands[i].x += 0.1
          }
          if (path3.commands[i].x >path4.commands[i].x) {
              path3.commands[i].x -= 0.1
          }
          if (path3.commands[i].y <path4.commands[i].y) {
              path3.commands[i].y += 0.1
          }
          if (path3.commands[i].y >path4.commands[i].y) {
              path3.commands[i].y -= 0.1
          }
          path3.commands[i].x1=path4.commands[i].x1;
          path3.commands[i].y1=path4.commands[i].y1
      }
      else {
          path3.commands[i].type=path4.commands[i].type;
          if (path3.commands[i].x <path4.commands[i].x) {
              path3.commands[i].x += 0.1
          }
          if (path3.commands[i].x >path4.commands[i].x) {
              path3.commands[i].x -= 0.1
          }
          if (path3.commands[i].y <path4.commands[i].y) {
              path3.commands[i].y += 0.1
          }
          if (path3.commands[i].y >path4.commands[i].y) {
              path3.commands[i].y -= 0.1
          }
      }
  }
}


function resetNew(){
  path.commands=path5.commands;
  path3.commands=path6.commands;
}

function stopRec(){
  // Check if recorder has stopped yet
  if (recorder.state == "recording") {
    // Stop recording
    recorder.stop();
  }
}