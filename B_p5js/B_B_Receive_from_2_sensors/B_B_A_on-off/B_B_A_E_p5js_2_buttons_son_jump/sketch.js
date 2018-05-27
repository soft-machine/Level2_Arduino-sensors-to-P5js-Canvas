//code by Julien Drochon
//www.julien-drochon.net
//for Soft Machine Lesson at ESA Pyrenees : www.esapyrenees.fr
// License Creative Commons BY-NC

//Téléverser préalablement le code A_F_2_Buttons.ino
// sur votre carte Arduino

var serial; // déclaration variable pour le port série
var song;
var toggle = false;

function preload() {
  song = loadSound("assets/lucky_dragons_-_power_melody.mp3");
}

function setup() {
  createCanvas(400,400); // création de l'élément canvas, largeur = 400, hauteur = 400

  serial = new p5.SerialPort();

  colorMode(HSB, 100);//on change de mode colorimétrique : Hue, Saturation, Brightness seront compris entre 0 et 100

  serial.open("/dev/cu.usbmodemFA131"); //changer /dev/cu.usbmodemFD121 par le nom du port série de votre carte Arduino
  serial.on('open', gotOpen); // si le port série de la carte Arduino est ouvert, je lance la fonction gotOpen
  serial.on('data', serialEvent); // si des valeurs arrivent du port série de la carte Arduino, je lance la fonction serialEvent
}

function draw() {
  background(127); // arrière-plan de couleur gris moyen
}
// ---------------------------------------------------------- //
// Fonctions pour récupérer les données envoyées par Arduino //
// ---------------------------------------------------------- //
// Fonction appelé à l'ouverture du port série dans le navigateur
function gotOpen() {
  console.log("Serial Port is Open"); // imprimer Serial Port is Open dans la console du navigateur
}

function serialEvent() {
  //Lire les valeurs provenant du port Série
  var inString = serial.readLine();

  trim(inString);  // on nettoie les données venant d'arduino
  if (!inString) return; // on nettoie les données venant d'arduino

  var sensors = split(inString, ','); // sépare les différentes

  console.log("valeur capteur 1 :" + sensors[0]) ; //imprime les valeurs du capteur 1 dans la console du navigateur
  console.log("valeur capteur 2 :" + sensors[1]) ; //imprime les valeurs du capteur 2 dans la console du navigateur
  if(sensors[0]==1 && toggle == false){
    toggle = true;
    song.jump(song.duration()/2);
  }
  if(sensors[1]==1 && toggle == false){
    toggle = true;
    song.jump(song.duration()/4);
  }
  if(sensors[0]==0 && sensors[1]==0){
    toggle = false;
  }
}
