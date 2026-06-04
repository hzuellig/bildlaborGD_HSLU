let gui;
let fileInput;
let cvn;

const controls = {
  pinselRadius: 0.2,
  loadImageFromDisk: () => {
    openFileDialog();
  },
  saveCurrentCanvas: () => {
    saveCanvas("shader-painting", "png");
  }
};

let img;
let shaderProgram;
let buffer;

let w, h;

function preload() {
  // Load an image
  img = loadImage('IMG_9367.jpeg');

  // Load the shader files
  shaderProgram = loadShader('shader/shader.vert', 'shader/shader.frag');
}

function setup() {
  img.resize(windowWidth, 0);
  cvn=createCanvas(img.width, img.height);
  

  // Hidden HTML file input used by the GUI button.
  setupFileInput();

  // Build the control panel.
  setupGUI();

  pixelDensity(1);

  // Create a buffer to store the distorted image (same size as the canvas)
  buffer = createGraphics(width, height, WEBGL);
  buffer.pixelDensity(1);


  shaderProgram.setUniform('uTexture', img);


}

function draw() {
  if (mouseX > 0 && mouseY > 0) {
    // Set the mouse position in normalized coordinates (0 to 1)
    let mousePos = [mouseX / width, mouseY / height];


    //buffer.begin();
    // Render the distorted image onto the buffer
    buffer.shader(shaderProgram);

    // Send the buffer's texture to the shader for recursive feedback
    shaderProgram.setUniform('uTexture', img); // Use the buffer as input
    shaderProgram.setUniform('rotRadius', controls.pinselRadius); // Rotation Radius 
    shaderProgram.setUniform('uMouse', mousePos); // Pass the mouse position
    shaderProgram.setUniform('uResolution', [width, height]); // Pass resolution



    // Draw the distorted image on the buffer
    buffer.rect(0, 0, width, height);


    // Now draw the buffer onto the main canvas
    image(buffer, 0, 0, width, height);

    //Create Shapshot for the next buffer
    if (frameCount % 60 == 0) {
      img = get(0, 0, width, height);
    }
  }

}


function setupGUI() {
  gui = new dat.GUI({ name: "Shader Paint Pixels" });


  // Utility actions.
  gui.add(controls, "pinselRadius", 0.01, 0.5).name("Pinsel Radius");
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
      img = loadedImage;
      //img.resize(windowWidth, 0);
      //cvn.resize(img.width, img.height);
     // buffer = createGraphics(width, height, WEBGL);
      //buffer.pixelDensity(1);
      drawCurrentImage();
    },
    (err) => {
      console.error("Bild konnte nicht geladen werden:", err);
    }
  );
}

function drawCurrentImage() {
  background(0);

  if (!img) {
    return;
  }

  // Keep image proportions and center it on the canvas.
  const scaleFactor = min(width / img.width, height / img.height);
  const w = img.width * scaleFactor;
  const h = img.height * scaleFactor;



  image(img, 0, 0, w, h);


}