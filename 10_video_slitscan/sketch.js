//Inspiriert vom Tutorial von Daniel Shiffman
//https://timrodenbroeker.de/shiffman-copy/

let video;
let pos = 0;
let loaded = false;
let h = 3;
let history = new Array();
let historyIndex = 0;
let offset = 0;
let scaleFactor = 2;

let frameHistory = 4; //export every nth frame into history, to avoid memory issues. Adjust as needed.


let gui;
let fileInput;


const controls = {
  stripHeight: 2,
  frameHistory: 4,
  loadImageFromDisk: () => {
    openFileDialog();
  },
  saveCurrentCanvas: () => {
    saveCanvas("slit-scan", "jpg");
  }
};

function setup() {
  createCanvas(480 * scaleFactor, 270 * scaleFactor);
  pixelDensity(1);

  // Hidden HTML file input used by the GUI button.
  setupFileInput();

  // Build the control panel.
  setupGUI();


  video = createVideo('assets/IMG_1740.MOV', () => {
    loaded = true;
  });

  video.size(480, 270);
  video.hide();
  video.volume(0);
  video.loop();
  // Show the default video controls.
  //video.showControls();
  background(255);
  noStroke();

  for (let n = 0; n < height / h; n++) {
    history[n] = createImage(width / scaleFactor, height / scaleFactor);
  }

  //frameRate(30);


 


  
}

function draw() {
  if(frameCount % controls.frameHistory ===0){
    slitTimeline();
  }
 
}

function slitTimeline() {
  if (!video || !video.elt) {
    return;
  }

  const videoReady = loaded && video.elt.readyState >= 2;
  const srcW = video.width || 480;
  const srcH = video.height || 270;

  if (videoReady && history[historyIndex]) {
    history[historyIndex].copy(
      video,
      0,
      0,
      srcW,
      srcH,
      0,
      0,
      srcW,
      srcH
    );
    historyIndex = (historyIndex + 1) % history.length;
  }

  h = controls.stripHeight;
  
  for (let n = 0; n < history.length; n++) {
    const y = n * h;
    let currentIndex = (n + offset) % history.length;
    if (!history[currentIndex]) {
      continue;
    }
    copy(history[currentIndex], 0, y, srcW, h , 0, y * scaleFactor, width, h * scaleFactor);
  }
  offset++;
}



function setupGUI() {
  gui = new dat.GUI({ name: "Shader Paint Pixels" });


  // Utility actions.
  gui.add(controls, "stripHeight", 1, 6, 1).name("Streifenbreite");
  gui.add(controls, "frameHistory", 1, 10, 1).name("Jeder n-te Frame in History");
  gui.add(controls, "loadImageFromDisk").name("Video von Festplatte");
  gui.add(controls, "saveCurrentCanvas").name("Canvas speichern");
}

function setupFileInput() {
  // createFileInput passes the selected file to handleFile().
  fileInput = createFileInput(handleFile);
  fileInput.attribute("accept", "video/*");
  fileInput.hide();
}

function openFileDialog() {
  // Reset value so selecting the same file twice still triggers change.
  fileInput.elt.value = "";
  fileInput.elt.click();
}

function handleFile(file) {
  // Only video files are allowed.
  if (file.type !== "video") {
    console.warn("Bitte nur Videodateien laden.");
    return;
  }

  // Use a native object URL for local files, then hand it to p5 createVideo.
  const objectUrl = URL.createObjectURL(file.file);

  if (video) {
    video.stop();
    video.remove();
  }

  loaded = false;

  video = createVideo([objectUrl], () => {
    video.size(480, 270);
    video.hide();
    video.volume(0);
    video.loop();
    loaded = true;
    URL.revokeObjectURL(objectUrl);

    //console.log("Video geladen.");
  });

  video.elt.onerror = () => {
    console.error("Video konnte nicht geladen werden.");
    URL.revokeObjectURL(objectUrl);
  };
}

