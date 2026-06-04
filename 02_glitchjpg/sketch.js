// p5.glitch-image https://ffd8.github.io/p5.glitch
// cc teddavis.org 2020

// erganzt um GUI von Hanna Zuellig, Bildlabor 2026, HSLU

let glitch;
let gui;
let fileInput;

const controls = {
	randomBytes: 10,
	stripWidth: 50,
	offsetRange: 100,
	loadImageFromDisk: () => {
		openFileDialog();
	},
	saveCurrentCanvas: () => {
		saveCanvas("pixel-copy", "png");
	}
};

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	imageMode(CENTER);

	// Hidden HTML file input used by the GUI button.
	setupFileInput();

	// Build the control panel.
	setupGUI();

	glitch = new Glitch();
	loadImage('assets/cindy-small.jpg', function (im) {
		glitch.loadImage(im);
	});
}

function draw() {
	glitch.resetBytes();

	glitch.randomBytes(controls.randomBytes); // add one random byte for movement

	glitch.buildImage();
	image(glitch.image, width / 2, height / 2)
}


function setupGUI() {
	gui = new dat.GUI({ name: "Glitch Image" });




	// Utility actions.
	gui.add(controls, "randomBytes", 0, 100, 1).name("Random Bytes");
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
			glitch.loadImage(loadedImage);
		},
		(err) => {
			console.error("Bild konnte nicht geladen werden:", err);
		}
	);
}