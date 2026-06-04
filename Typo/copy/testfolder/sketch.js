let font;
let slices = 100;
let col = 0;

let a = 0;
let bg;

function preload() {
    font = loadFont('../../DINdong.ttf');
}



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    bg = createGraphics(width, height);
    bg.background(0);
    bg.fill(255);
    bg.textFont(font);
    bg.textSize(500);
    bg.textAlign(CENTER);
    bg.text("CODE", width / 2, height / 2 + 250)

    image(bg, 0, 0);

    col = int(width / slices);
}

function draw() {
    lastX = 0;
    image(bg, 0, 0);
    for (let x = 0; x < slices; x++) {
        let f = 0;

        if (lastX < mouseX) {
            f = sin(map(lastX, 0, mouseX, 0, HALF_PI));
        } else {
            f = sin(map(lastX, mouseX, width, HALF_PI, 0));
        }
        col = (f + 0.6) * int(width / (slices));
        push();
        translate(lastX, 0);
        scale(-1, 1);//mirror slice

        copy(bg, lastX, 0, col, height, 0, 0, col, height);

        pop();
        stroke(255);

        lastX += col;
    }


}