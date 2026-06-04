// Image Brush example with GUI and local file upload.
// Workflow:
// 1) Load a start image.
// 2) Render it on mouse position, mirrored on x and y axis and diagonal.
// 3) Control parameters and actions through dat.GUI.

//Variablen erstellen 
let brush;
let gui;
let fileInput;

const controls = {
  loadImageFromDisk: () => {
    openFileDialog();
  },
  saveCurrentCanvas: () => {
    saveCanvas("pixel-copy", "png");
  }
};

//2. Die Funktion preload wird vor dem setup aufgerufen.
// So wird sicher gestellt, dass Ressourcen geladen sind, wenn man sie braucht
function preload(){
//3. Die Funktion loadImage lädt ein Bild. Der Verweis auf das Bild ist in der Variable 'brush'
  brush=loadImage("assets/brush.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Hidden HTML file input used by the GUI button.
  setupFileInput();

  // Build the control panel.
  setupGUI();


 
}

function draw() {
//4. Mit der Funktion 'image' wird ein Bild auf den Sketch platziert
  image(brush, mouseX, mouseY);
  
  //gespiegelt x-achse
  image(brush, width-mouseX, mouseY);

  //gespiegelt y-achse
  image(brush, mouseX, height-mouseY );

  //gespiegelt diagonal
  image(brush, width-mouseX, height-mouseY);
  
}


function setupGUI() {
  gui = new dat.GUI({ name: "Pixel Painter" });

  


  // Utility actions.
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
      brush = loadedImage;
    
    },
    (err) => {
      console.error("Bild konnte nicht geladen werden:", err);
    }
  );
}