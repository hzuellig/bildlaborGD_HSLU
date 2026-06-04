let bandLength = 800; // Gesamtlänge des Bandes
const pointCount = 10; // Anzahl der Punkte auf dem Band
const points = []; // Array, um die Punkte zu speichern
const origpoints = []; // Array, um die Punkte zu speichern
const influenceRadius = 100; // Einflussradius der Maus
const alpha = 0.3; // Steuerung der Gewichtsfunktion


function setup() {
  createCanvas(windowWidth, windowHeight);
  bandLength = windowWidth;

  initializeBand()
}

function draw() {
  background(255);
  calculateWeights();
 updateBand();
//rectMode(CENTER);
  
  for (let i = 0; i < points.length; i++) {
    let next = width;
    if(i<points.length-1){
      next=points[i+1].x;
    }
    let d=next-points[i].x;
    //ellipse(points[i].x, points[i].y, 3,3);
    //line(points[i].x, 0, points[i].x, height);
    rect(points[i].x, 10, d, height-20);
  } 
}


// Initialisiere das Band (gleichmäßig verteilte Punkte)
function initializeBand() {
  for (let i = 0; i <= pointCount; i++) {
      points.push({
          x: (i / pointCount) * bandLength,
          y: height / 2
      });
      origpoints.push({
        x: (i / pointCount) * bandLength,
        y: height / 2
    });
  }
}

// Berechne die Gewichtsfunktion basierend auf der Mausdistanz
function calculateWeights() {
  const weights = origpoints.map(point => {
      const distance = Math.hypot(point.x - mouseX, point.y - mouseY);
      return Math.exp(-alpha * Math.max(10, distance - influenceRadius) / influenceRadius);
      
  });

  //console.log(weights)

  // Normalisiere die Gewichte
  const weightSum = weights.reduce((sum, w) => sum + w, 0);
 //console.log(weightSum);
  return weights.map(w => w / weightSum);
}

// Aktualisiere die Punkte des Bandes basierend auf den Gewichten
function updateBand() {
  const weights = calculateWeights();
  //console.log(weights);
  const segmentLength = bandLength / pointCount;

  // Setze den Startpunkt
  points[0].x = 0;
  points[0].y = height / 2;

  for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const direction = {
          x: weights[i-1] * segmentLength*pointCount,
          y: 0 // Fixiere das Band vorerst horizontal
      };
      points[i].x = prev.x + direction.x;
      points[i].y = prev.y + direction.y;
  }
}