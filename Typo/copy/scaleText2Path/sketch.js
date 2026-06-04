let font;
let letters = {
  'L': 'L',
  'E': 'E'/*,
  'T': 'T',
  'T': 'T',
  'E': 'E',
  'R': 'R',
  'S': 'S'*/
}

function preload() {
  font = loadFont('../../DINdong.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  
  let border = 100;
  let xpos=border;
  let w = (width-2*border)/Object.keys(letters).length;
  for (key in letters) {
    let points = font.textToPoints(key, xpos, 400, 400, { sampleFactor: 0.5 });
    let stringPoints = {start:xpos, points:points};
    letters[key]=stringPoints;

    
    xpos += w;
  }
}

//https://easings.net/?

function draw() {
  background(0);
  stroke(255);
  mouseX=constrain(mouseX,50,width-50);
  line(mouseX, 0, mouseX, height);
  fill(255);
  noStroke();

  for (key in letters) {
    
    let points = letters[key].points;
    let start = letters[key].start;
    let space;

    if(key=='L'){
      space=mouseX;
    }else{
      space =width-mouseX;
    }

    let scaleX=space/(width/2);
   
    beginShape()
    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      let dx=(p.x-start)*scaleX;
      vertex(start+dx, p.y);
    }

    endShape();
  }

}


function shiftX(pt) {
  let nP = { x: pt.x, y: pt.y };
  let s = map(mouseX, 0, width, 0.3, 2);
  nP.x = nP.x * s;

  return nP;
}