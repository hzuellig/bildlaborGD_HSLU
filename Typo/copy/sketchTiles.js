let canvasW = window.innerWidth;
let canvasH = window.innerHeight;



let font;
let bg;

function preload() {
    font = loadFont('../DINdong.ttf');
    
}

function setup() {
    createCanvas(canvasW, canvasH);
    bg=createGraphics(canvasW, canvasH);
    //frameRate(1);
    //textWrap(WORD);
    //noLoop();
    bg.background(255);
    bg.fill(0)
    bg.textFont(font);
    bg.textSize(300);
    bg.textAlign(CENTER);
    bg.text("CODE",width/2,height/2+150)

    image(bg,0,0);
}

function draw() {
    
    
    let tilesX = 10;
    let tilesY = 1;

    let tileW = int(width / tilesX);
    let tileH = int(height / tilesY);

    for (let y = 0; y < tilesY; y++) {
        for (let x = 0; x < tilesX; x++) {

            // WAVE
            let waveC = int(cos(frameCount * 0.01 + (x * y ) * 0.02) * 60);
            let waveS = int(sin(frameCount + (x * 5)) * 30);
            // SOURCE
            let sx = x * tileW + waveC;
            let sy = y * tileH + waveC;
            let sw = tileW;
            let sh = tileH;
            // DESTINATION
            let dx = x * tileW;
            let dy = y * tileH;
            let dw = tileW;
            let dh = tileH;

            push();
            translate(dx,dy);
            copy(bg, sx, sy, sw, sh, waveC, waveS, dw, dh);
            pop();

        }
    }

    bg.copy(0,0,width,height,0,0,width,height)
    
}