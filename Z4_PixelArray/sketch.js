let img;
let posX=0;
let posY=0;

function preload(){
	img=loadImage("assets/IMG_2126.jpeg");
}

function setup() {
	img.resize(100,0);
	pixelDensity(1);
	createCanvas(img.width*3, img.height);
	background(255);
	image(img,0,0);
}

function draw() {
	img.loadPixels();
	let colors = []
	//Erklärung zum Pixel Array: https://www.michelleenos.com/notes/sort-colors/
	//https://docs.google.com/presentation/d/104VbNZyDklRJWsJmG86VUrvtpTb2S4PbhuwkliPYxVI/edit#slide=id.g1175de9062b_0_29
	
	posX=0;
	posY=0;
	
	let counter=0;
	noStroke();
	for (let i = 0; i < img.pixels.length-4; i=i+4) {
		let r=img.pixels[i];// rot
		let g=img.pixels[i+1];// gruen
		let b=img.pixels[i+2];//blau
		let a=img.pixels[i+3];//alpha kanal
		
		//console.log(r,g,b,a)
		
		//falsch anordnen -- von oben nach unten und links nach rechts
	  fill(r,g,b);
		posY=counter % img.height;
		posX=(counter - posY ) / img.height;
		rect(posX+img.width, posY, 2,2);



    //richtig anordnen -- von links nach rechts und oben nach unten
	  fill(r,g,b);
		posX=counter % img.width;
		posY=(counter - posX ) / img.width;
		rect(posX+img.width*2, posY, 2,2);
	
		counter++;
		
		
		
		
	}
	
	noLoop();
}