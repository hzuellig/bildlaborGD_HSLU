let img;
let scale = 6;

//video that explains the use of dat.gui in p5: https://www.youtube.com/watch?v=B75-PmXzUBE
let gui;

const params = {
  method: 'WEST',
  method: 'EAST',
  method: 'SOUTH',
  method: 'NORTH',
  method: 'NORTHWEST',
  method: 'NORTHEAST',
  method: 'SOUTHEAST',
  method: 'SOUTHWEST'
};

let options = ['WEST', 'EAST', 'SOUTH', 'NORTH', 'NORTHWEST', 'NORTHEAST', 'SOUTHEAST', 'SOUTHWEST'];


function preload() {
  img = loadImage("assets/plakatwand.jpg");
}

function setup() {
  createCanvas(img.width / scale * 2, img.height / scale * 2);

  //make the image smaller to speed up the sorting
  img.resize(img.width / scale, img.height / scale);

  //make sure the pixel Density is set to 1
  pixelDensity(1);

  noSmooth();

  //create a gui with dat.gui to select the sorting direction
  gui = new dat.GUI();

  // Create a folder for organization
  let folder = gui.addFolder('Settings');

  // Add a radio button selection
  folder.add(params, 'method', options).name('Select Sorting Direction');

  // Open the folder by default
  folder.open();
}

function draw() {

  //pixel manipulation requires a lot of performance, so we only sort 1000 pixels per frame
  for (let i = 0; i < 1000; i++) {
    sortPixels();
  }

  //we need to call updatePixels() to see the changes we made with set()
  img.updatePixels();

  //draw the updated image at double size
  image(img, 0, 0, img.width * 2, img.height * 2);
}



function sortPixels() {
  // Get a random pixel 
  let x = floor(random(img.width - 1));
  let y = floor(random(img.height - 1));

  // Get the color of the pixel.
  let colorOne = img.get(x, y);

  // Get the color of the pixel below the first one.

  let colorTwo;


  // Call the selected method
  if (params.method === 'NORTH') {
    colorTwo = img.get(x, y - 1);
  } else if (params.method === 'SOUTH') {
    colorTwo = img.get(x, y + 1);
  } else if (params.method === 'EAST') {
    colorTwo = img.get(x-1, y );
  } else if (params.method === 'NORTHWEST') {
    colorTwo = img.get(x-1, y - 1);
  } else if (params.method === 'SOUTHEAST') {
    colorTwo = img.get(x+1, y + 1);
  } else if (params.method === 'SOUTHWEST') {
    colorTwo = img.get(x-1, y + 1);
  } else if (params.method === 'NORTHEAST') {
    colorTwo = img.get(x+1, y - 1);
  }else if (params.method === 'WEST') {
    colorTwo = img.get(x-1, y );
  }

 

  // Get the total R+G+B of both colors.
  let totalOne = red(colorOne) + green(colorOne) + blue(colorTwo);
  let totalTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);

  // If the first total is less than the second total, swap the pixels.
  // This causes darker colors to fall to the bottom,
  // and light pixels to rise to the top.
  if (totalOne < totalTwo) {
    img.set(x, y, colorTwo);
    img.set(x + 1, y + 1, colorOne);

  }
}


function keyPressed() {
  if (key == 's') {
    saveCanvas('pixelsorter', 'png');
  }
}