
let newImg;

let gui;
let fileInput;

const controls = {
  steps: 5,
  threshold: 50,
  scaleFact: 5,
  loadImageFromDisk: () => {
    openFileDialog();
  },
  saveCurrentCanvas: () => {
    saveCanvas("edge-detection", "png");
  }
};


function preload() {
  img = loadImage("assets/image.jpg");
}

function setup() {
  createCanvas(img.width, img.height);

   // Hidden HTML file input used by the GUI button.
  setupFileInput();

  // Build the control panel.
  setupGUI();

  pixelDensity(1);
  image(img, 0, 0);
  img.resize(img.width / controls.scaleFact, 0);


  createEdgeImage()




  frameRate(10);


}
function draw() {
  
  image(newImg, 0, 0, width, height);



  //noLoop();
}

function detectEdge() {
  img.loadPixels();
  newImg.loadPixels();



  for (let i = 0; i < img.pixels.length; i += 4) {

    let neigbourRange = 4;
    for (let n = -neigbourRange; n <= neigbourRange; n++) {
      let neighbours = new Array(
        i - n * 4,
        i + n * 4,
        i - img.width * n * 4,
        i + img.width * n * 4
      );

      compareColorDiff(i, neighbours);
    }

  }
}




function compareColorDiff(me, neighbours) {
  let diffR = 0;
  let diffG = 0;
  let diffB = 0;
  for (let n = 0; n < neighbours.length; n++) {
    if (neighbours[n] > 0 && neighbours[n] < img.pixels.length - 1) {
      let i = neighbours[n];


      let nr = img.pixels[i];
      let ng = img.pixels[i + 1];
      let nb = img.pixels[i + 2];

      let mr = img.pixels[me];
      let mg = img.pixels[me + 1];
      let mb = img.pixels[me + 2];
      diffR += abs(mr - nr);
      diffG += abs(mg - ng);
      diffB += abs(mb - nb);
    }
  }
  if (diffR > controls.threshold || diffG > controls.threshold || diffB > controls.threshold) {
    let newR = closestStep(diffR);
    let newG = closestStep(diffG);
    let newB = closestStep(diffB);
    //console.log(newR)

    let newClr = color(newR, newG, newB);
    plotPoint(me, newClr);
  }
}

function plotPoint(index, c) {
  let x = (index / 4) % img.width;
  let y = (index / 4 - x) / img.width;

  newImg.noStroke();
  newImg.fill(c);
  //push();
  //translate(width / 2, 0);
  //point(x*scalFact, y*scalFact);
  newImg.rect(x * controls.scaleFact, y * controls.scaleFact, controls.scaleFact, controls.scaleFact);
  //pop();
}


// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(value) {
  return round((controls.steps * value) / 255) * floor(255 / controls.steps);
}



function createEdgeImage() {
  newImg = createGraphics(width, height);
  newImg.pixelDensity(1);
  // Start with white background, then write darker edge steps into it.
  newImg.background(255);

  detectEdge();
}


function setupGUI() {
  gui = new dat.GUI({ name: "Edge Detection" });

  
  // Effect parameters.
  gui.add(controls, "steps", 5, 255, 1).name("Farbabstufung").onChange(() => {
    createEdgeImage();
  });
  gui.add(controls, "scaleFact", 1, 10, 1).name("Rastergrösse").onChange(() => {
    img.resize(width / controls.scaleFact, 0);
    createEdgeImage();
  });
  gui.add(controls, "threshold", 0, 255, 1).name("Schwellenwert").onChange(() => {
    createEdgeImage();
  });

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
      img.resize(img.width / controls.scaleFact, 0);
      createEdgeImage();
    },
    (err) => {
      console.error("Bild konnte nicht geladen werden:", err);
    }
  );
}
