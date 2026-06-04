let font;
let slices=100;
let col=0;

let a=0;
let bg;

function preload(){
  font = loadFont('../../DINdong.ttf');
}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight); 
  col=width/slices; 
  bg=createGraphics(width, height);
  bg.background(0);
  bg.fill(255);
  bg.textFont(font);
  bg.textSize(300);
  bg.textAlign(CENTER);
  bg.text("CODE",width/2,height/2+150)

  image(bg,0,0);
 // frameRate(10);
}

function draw() {
  let posX=0;
  
  while(posX<width){
    let f=sin(radians(map((posX+a)%width, 0, width, 0, 180)))+1;
    col=map(f, 0, 1, 2, 10);
    push();
    translate(posX, 0)
    scale(-1,1);
    copy(bg, posX, 0, col, height, -col, 0, col, height);
    pop();

    posX+=col; 
  }

  a++; 
}
