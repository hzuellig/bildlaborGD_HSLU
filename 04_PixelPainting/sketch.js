//Explanation sort color algorithmus https://www.michelleenos.com/notes/sort-colors/

let img;
let canvas;
let startX, startY, endX, endY;
let dragging = false;
let croppedImg;
let croppedImgX = 0;
let croppedImgY = 0;
let sorted = false;
let isSelect = true;

//video that explains the use of dat.gui in p5: https://www.youtube.com/watch?v=B75-PmXzUBE
let gui;
let fileInput;
let options = ['hue', 'red', 'green', 'blue', 'saturation', 'brightness', 'lightness'];

const params = {
  sortmethod: 'hue',
  sortmethod: 'red',
  sortmethod: 'green',
  sortmethod: 'blue',
  sortmethod: 'saturation',
  sortmethod: 'brightness',
  sortmethod: 'lightness'
};

const controls = {
	loadImageFromDisk: () => {
		openFileDialog();
	},
	saveCurrentCanvas: () => {
		saveCanvas("pixel-sort", "png");
	}
};

const directions = {
  sortdirection: 'vertical',
  sortdirection: 'horizontal'
};
let sortoptions = ['vertikal', 'horizontal'];

function preload() {
  img = loadImage('assets/IMG_9367.jpeg');

}
function setup() {
  pixelDensity(1);
  img.resize(0, windowHeight);
  canvas = createCanvas(img.width, img.height);
  canvas.parent('sketch_holder');
  image(img, 0, 0);


  // Hidden HTML file input used by the GUI button.
	setupFileInput();
  // Build the control panel.
	setupGUI();
  
}

function draw() {



  if (croppedImg !== undefined && croppedImgY < height - croppedImg.height && sorted == false) {
    //console.log('sort')
    sortImage(croppedImg);

  }

  
}


function mousePressed(e) {
  isSelect = true;

  if (e.target.tagName !== 'SELECT' && e.target.tagName !== 'OPTION' && e.target.tagName !== 'INPUT' && mouseX > 0 && mouseY > 0 && mouseX < img.width && mouseY < img.height) {
    startX = mouseX;
    startY = mouseY;
    dragging = true;
    isSelect = false;
  }

}

function mouseReleased() {
  if (!isSelect) {
    endX = mouseX;
    endY = mouseY;
    dragging = false;

    let w = endX - startX;
    let h = endY - startY;

    croppedImg = canvas.get(startX, startY, w, h);
    croppedImgX = startX;
    croppedImgY = startY;

    sorted = false;
  }
}


function sortImage(img) {
  img.loadPixels();
  let colors = []
  let lines = [];
  let step = 1;//je höher der step wert, desto gröber die pixelierung
  let grenzwert = 0;//je höher der grenzwert, desto mehr farben werden ignoriert. 0 bedeutet alle farben werden gezeichnet, 255 bedeutet nur reine weisse farben werden gezeichnet
  if (directions.sortdirection == 'horizontal') {
    for (let x = 0; x < img.width; x += step) {
      lines = [];
      for (let y = 0; y < img.height; y += step) {
        let i = (y * img.width + x) * 4;
        let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3])

        lines.push(c);
      }
      colors.push(lines);
    }
  } else {
    for (let y = 0; y < img.height; y += step) {
      lines = [];
      for (let x = 0; x < img.width; x += step) {
        let i = (y * img.width + x) * 4;
        let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3])

        lines.push(c);
      }
      colors.push(lines);
    }
  }


  for (let l = 0; l < colors.length; l++) {
    //console.log(params.sortmethod)
    colors[l] = sortColors(colors[l], params.sortmethod)
    //colors[l].sort((a, b) => hue(a) - hue(b));
  }

  push();
  translate(startX, startY);
  let i = 0;
  strokeWeight(1)
  if (directions.sortdirection == 'horizontal') {
    for (let x = 0; x < img.width; x += step) {
      i = 0;
      for (let y = 0; y < img.height; y += step) {
        stroke(colors[x / step][y / step])
        fill(colors[x / step][y / step])
        let c = colors[x / step][y / step];
        let h = getGrenzwert(c, params.sortmethod);

        if (h > grenzwert) {
          rect(x, y, step, step)
        }

        i++


      }
    }
  } else {
    for (let y = 0; y < img.height; y += step) {
      i = 0;
      for (let x = 0; x < img.width; x += step) {
        stroke(colors[y / step][x / step])
        fill(colors[y / step][x / step])
        let c = colors[y / step][x / step];
        let h = getGrenzwert(c, params.sortmethod);

        if (h > grenzwert) {
          rect(x, y, step, step)
        }

        i++
      }
    }
  }

  pop();
  sorted = true;
}


function sortColors(colors, mode) {
  switch (mode) {
    case 'hue':
      colors.sort((a, b) => hue(a) - hue(b))
      break
    case 'red':
      colors.sort((a, b) => red(a) - red(b))
      break
    case 'green':
      colors.sort((a, b) => green(a) - green(b))
      break
    case 'blue':
      colors.sort((a, b) => blue(a) - blue(b))
      break
    case 'saturation':
      colors.sort((a, b) => saturation(a) - saturation(b))
      break
    case 'brightness':
      colors.sort((a, b) => brightness(a) - brightness(b))
      break
    case 'lightness':
      colors.sort((a, b) => lightness(a) - lightness(b))
      break
    default:
      break
  }
  return colors;
}

function getGrenzwert(c, mode) {
  let wert = 0;
  switch (mode) {
    case 'hue':
      wert = hue(c);
      break
    case 'red':
      wert = red(c);
      break
    case 'green':
      wert = green(c);
      break
    case 'blue':
      wert = blue(c);
      break
    case 'saturation':
      wert = saturation(c);
      break
    case 'brightness':
      wert = brightness(c);
      break
    case 'lightness':
      wert = lightness(c);
      break
    default:
      break
  }
  return wert;
}


function setupFileInput() {
	// createFileInput passes the selected file to handleFile().
	fileInput = createFileInput(handleFile);
	fileInput.attribute("accept", "image/*");
	//fileInput.hide();
}

function openFileDialog() {
	// Reset value so selecting the same file twice still triggers change.
	fileInput.elt.value = "";
	fileInput.elt.click();
  sorted = true;
}

function handleFile(file) {
  sorted = true;
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

  sorted = true;
}

function setupGUI() {
  //create a gui with dat.gui to select the sorting direction
  gui = new dat.GUI();

  // Create a folder for organization
  let folder = gui.addFolder('Sorting Settings');

  // Add a radio button selection
  folder.add(params, 'sortmethod', options).name('Select Sorting Method');
  folder.open();

  folder = gui.addFolder('Richtung');
  folder.add(directions, 'sortdirection', sortoptions).name('Select Sorting Direction');

  // Open the folder by default
  folder.open();


  // Utility actions.
 
	gui.add(controls, "loadImageFromDisk").name("Bild von Festplatte");
	gui.add(controls, "saveCurrentCanvas").name("Canvas speichern");
}