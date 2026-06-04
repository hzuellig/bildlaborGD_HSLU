/* 
Hanna Zuellig, HUB HSLU, 2024
Example of dithering an image using error diffusion
After Daniel Shiffman Processing Example https://www.youtube.com/watch?v=0L2n8Tg2FwI
*/

//@todo: it seems as if the original image is modified instead of the new image
// when we run another algorithm, the already dithered image is used as source, instead of the original one


let original;
let sourceImage;
let newImage;

//Create a GUI
let params = {
  scaleFactor: 2,
  steps: 1, //number of steps for the color reduction
  algorithm: "Floyd-Steinberg",
  triggerAction: exportPNG
};



let n = 4;

// Error Verteilung, randomError[0] Floyd-Steinberg
// -1 is meant to be the current pixel, so no error is added to it
let randomError = {
  0: {"name": "Floyd-Steinberg", "coefficients": [[0,-1, 7], [3, 5, 1]], "divisor": 16, "neighbors": 4},
  1: {"name": "Bill Atkinson", "coefficients": [[0, -1, 1, 1],[1,1,1,0],[1,0,0,0]], "divisor": 8, "neighbors": 6},
  3: {"name": "Jarvis-Judice-Ninke", "coefficients": [[0, 0, -1, 7, 5], [3,5,7,5,3], [1,3,5,4,1]], "divisor": 48, "neighbors": 12},
  4: {"name": "Your Weird", "coefficients": [[0,-1, 1], [1, 2, 4]], "divisor": 8, "neighbors": 4},
}

let rnd = 0;//random Error Schlüssel

function preload() {
  original = loadImage("assets/image.jpg");
}

function setup() {
  createCanvas(original.width * params.scaleFactor, original.height * params.scaleFactor);
  // Set pixel density to 1 so the resulting image is the same size as the original
  pixelDensity(1);
  // select a random error distribution
  const errorKeys = Object.keys(randomError);
  rnd = int(random(errorKeys.length));
  rnd = errorKeys[rnd];
  params.algorithm = randomError[rnd].name;

  // if you want to use a specific error distribution, set rnd to the desired key
  // rnd = 0; // Floyd-Steinberg

  //make the original image smaller to improve performance
  original.resize(round(original.width / params.scaleFactor), round(original.height / params.scaleFactor));
  // Keep an immutable source for repeated dithering runs.
  sourceImage = original.get();



  // Setup GUI
  const gui = new dat.GUI();
  gui.add(params, 'triggerAction').name("Export Image"); // ✅ This creates a button
  gui.add(params, 'algorithm', Object.values(randomError).map((entry) => entry.name)).name("Error Distribution").onChange((value) => {
    // Update rnd based on the selected algorithm
    for (const key in randomError) {
      if (randomError[key].name === value) {
        rnd = key;
        break;
      }
    }
    init(); // Re-run the dithering process with the new error distribution
  });

  init();
}

function init() {
  background(255);

  // Create a new image with the same size as the original, but scaled by the scale factor
  newImage = createGraphics(original.width * params.scaleFactor, original.height * params.scaleFactor);
  newImage.clear();
  newImage.background(255);
  newImage.noStroke();
  newImage.pixelDensity(1);

  // Apply the dithering effect, the second parameter is the number of steps regarding the color
  // The higher the number, the more colors will be used
  // 1 is actually two steps, either 0 or 255, this means full color or zero
  const workingImage = sourceImage.get();
  makeDithered(workingImage, params.steps);

  image(newImage, 0, 0, newImage.width, newImage.height);

}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function xyFromIndex(img, idx) {
  let x = idx / 4 % img.width;
  let y = (idx / 4 - x) / img.width;
  return { x: x, y: y };
}

//function does the same as get(x,y) but is faster
function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

//function does the same as set(x,y,clr) but is faster
function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;

  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}



// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();


  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      //faster than get()
      let clr = getColorAtindex(img, x, y);
      //let clr = img.get(x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);

      let brightness = (0.299 * oldR + 0.587 * oldG + 0.114 * oldB);
      let newBrightness = closestStep(steps, brightness);
      let newR = closestStep(steps, oldR);
      let newG = closestStep( steps, oldG);
      let newB = closestStep(steps, oldB);

      let newClr = color(newR, newG, newB);


      drawDot(x, y, newClr)



      //difference between old and new color
      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();

  //newImage.updatePixels();
}



function distributeError(img, x, y, errR, errG, errB) {
  const algorithm = randomError[rnd];
  const divisor = algorithm["divisor"];

  // Find the distribution matrix (first property that is not metadata).
  let kernel = algorithm["coefficients"];


  if (!kernel || !kernel.length || divisor === 0) {
    return;
  }

  // -1 marks the current pixel in the first row.
  const anchorX = kernel[0].findIndex((v) => v === -1);
  if (anchorX === -1) {
    return;
  }

  for (let row = 0; row < kernel.length; row++) {
    const values = kernel[row];
    for (let col = 0; col < values.length; col++) {
      const weight = values[col];

      // Skip current pixel marker and empty cells.
      if (weight <= 0) {
        continue;
      }

      const dx = col - anchorX;
      const dy = row;
      const factor = weight / divisor;

      addError(img, factor, x + dx, y + dy, errR, errG, errB);
    }
  }
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}

function drawDot(x, y, c) {
  newImage.fill(c);

  let brightness = (0.299 * red(c) + 0.587 * green(c) + 0.114 * blue(c));

  let pos = { x: x, y: y };



  if (brightness < 200) {
    let d = map(brightness, 0, 255, params.scaleFactor, 0);//the darker the color, the bigger the dot, white is to zero
    newImage.rect(pos.x * params.scaleFactor, pos.y * params.scaleFactor, d, d);

  }
}



function exportPNG() {
  let d = new Date();
  /* ~~~~~~~~~~~~ export PNG */
  save(d + ".png")
  noLoop();
}