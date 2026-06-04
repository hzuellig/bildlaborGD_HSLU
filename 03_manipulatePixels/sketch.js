let img;
let canvas;
let startX, startY, endX, endY;
let dragging=false;
let croppedImg;

let gui;
let fileInput;

const controls = {
	loadImageFromDisk: () => {
		openFileDialog();
	},
	saveCurrentCanvas: () => {
		saveCanvas("pixel-copy", "png");
	},
  invertColors: {"red": true, "green": true, "blue": true}
};



function preload() {
  img=loadImage('assets/IMG_9367.jpeg');
 
}
function setup() {

  // Hidden HTML file input used by the GUI button.
	setupFileInput();

	// Build the control panel.
	setupGUI();

  img.resize(0, windowHeight);
  canvas=createCanvas(img.width, img.height);
	canvas.parent('sketch_holder');
  drawCurrentImage();
}

function draw() {
 

}


function mousePressed() {
  startX=mouseX;
  startY=mouseY;
  dragging=true;
}

function mouseReleased() {
  endX=mouseX;
  endY=mouseY;
  dragging=false;

  let w=endX-startX;
  let h=endY-startY;

	//bei release der maus wird der markierte aussschnitt kopiert
  croppedImg=img.get(startX, startY, w, h);

	manipulatePixels();
 
}

function manipulatePixels(){
	 // for each column of pixels
    for (let x = 0; x < croppedImg.width; x++) {
      // for each row of pixels
      for (let y = 0; y < croppedImg.height; y++) {
				// Get the color of the pixel at coordinates (i,k)
     	 let c = croppedImg.get(x, y);
      
      	// Extract the red, green, and blue components from the color
      	let r = red(c);
      	let g = green(c);
      	let b = blue(c);

				// Invert channels only when the corresponding GUI toggle is active.
				const newR = controls.invertColors.red ? 255 - r : r;
				const newG = controls.invertColors.green ? 255 - g : g;
				const newB = controls.invertColors.blue ? 255 - b : b;
				let newColor=color(newR, newG, newB);
				
				croppedImg.set(x, y, newColor);
			}
			
		}
	
	// Update the img!!
  croppedImg.updatePixels();
	
	//display the img
 image(croppedImg, startX, startY);
}


function setupGUI() {
	gui = new dat.GUI({ name: "Manipulate Pixels" });
	const invertFolder = gui.addFolder("Invert Channels");
	invertFolder.add(controls.invertColors, "red").name("Rot invertieren");
	invertFolder.add(controls.invertColors, "green").name("Gruen invertieren");
	invertFolder.add(controls.invertColors, "blue").name("Blau invertieren");
  invertFolder.open();




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
			img = loadedImage;
      img.resize(0, windowHeight);
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