// Pixel-Copy example with GUI and local file upload.
// Workflow:
// 1) Load a start image.
// 2) Render it centered on the canvas.
// 3) In draw(), repeatedly copy vertical strips with random x-offset.
// 4) Control parameters and actions through dat.GUI.

let bild;
let gui;
let fileInput;

const controls = {
  fps: 10,
  stripWidth: 50,
  offsetRange: 100,
  loadImageFromDisk: () => {
    openFileDialog();
  },
  resetToOriginal: () => {
    drawCurrentImage();
  },
  saveCurrentCanvas: () => {
    saveCanvas("pixel-copy", "png");
  }
};

function preload() {
  // Default image shown when the sketch starts.
  bild = loadImage("assets/cindy-small.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Hidden HTML file input used by the GUI button.
  setupFileInput();

  // Build the control panel.
  setupGUI();

  frameRate(controls.fps);
  drawCurrentImage();
}

function draw() {
  // Random horizontal shift for the copied strip.
  const distanz = random(-controls.offsetRange, controls.offsetRange);
  const x = random(0, max(1, width - controls.stripWidth));

  // copy(srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH)
  // Take a vertical strip and place it at a shifted x-position.
  copy(
    x,
    0,
    controls.stripWidth,
    height,
    x + distanz,
    0,
    controls.stripWidth,
    height
  );
}

function setupGUI() {
  gui = new dat.GUI({ name: "Pixel Painter" });

  // Live speed control of the draw loop.
  gui.add(controls, "fps", 1, 60, 1).name("FPS").onChange((value) => frameRate(value));

  // Effect parameters.
  gui.add(controls, "stripWidth", 1, 300, 1).name("Streifenbreite");
  gui.add(controls, "offsetRange", 0, 300, 1).name("Offset Bereich");

  // Utility actions.
  gui.add(controls, "resetToOriginal").name("Bild neu zeichnen");
  gui.add(controls, "loadImageFromDisk").name("Bild von Festplatte");
  gui.add(controls, "saveCurrentCanvas").name("Canvas speichern");
}

function setupFileInput() {
  // createFileInput passes the selected file to handleFile().
  fileInput = createFileInput(handleFile);
  fileInput.attribute("accept", "image/*");
  fileInput.hide();
}

function openFileDialog() {
  // Reset value so selecting the same file twice still triggers change.
  fileInput.elt.value = "";
  fileInput.elt.click();
}

function handleFile(file) {
  // Only image files are allowed.
  if (file.type !== "image") {
    console.warn("Bitte nur Bilddateien laden.");
    return;
  }

  // file.data is a data URL that p5 can load as an image.
  loadImage(
    file.data,
    (loadedImage) => {
      bild = loadedImage;
      drawCurrentImage();
    },
    (err) => {
      console.error("Bild konnte nicht geladen werden:", err);
    }
  );
}

function drawCurrentImage() {
  background(0);

  if (!bild) {
    return;
  }

  // Keep image proportions and center it on the canvas.
  const scaleFactor = min(width / bild.width, height / bild.height);
  const w = bild.width * scaleFactor;
  const h = bild.height * scaleFactor;
  const x = (width - w) * 0.5;
  const y = (height - h) * 0.5;

  image(bild, x, y, w, h);
}

function windowResized() {
  // Redraw base image after resize so the effect has fresh source pixels.
  resizeCanvas(windowWidth, windowHeight);
  drawCurrentImage();
}

