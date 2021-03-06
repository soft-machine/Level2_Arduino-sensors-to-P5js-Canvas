//code by Julien Drochon
//www.julien-drochon.net
//for Soft Machine Lesson at ESA Pyrenees : www.esapyrenees.fr
// License Creative Commons BY-NC

//Téléverser préalablement le code A_F_2_Buttons.ino
// sur votre carte Arduino

var serial; // déclaration variable pour le port série
var fontRegular, fontBold, fontBlackItalic, fontItalic;
var maFont;
var switchFont=0;

function preload() {
  fontRegular = loadFont("assets/PlayfairDisplay-Regular.ttf");
  fontBold = loadFont("assets/PlayfairDisplay-Bold.ttf");
  fontBlackItalic = loadFont("assets/PlayfairDisplay-BlackItalic.ttf");
  fontItalic = loadFont ("assets/PlayfairDisplay-Italic.ttf");
}

function setup() {
  createCanvas(400,400); // création de l'élément canvas, largeur = 400, hauteur = 400

  serial = new p5.SerialPort();

  serial.open("/dev/cu.usbmodemFA131"); //changer /dev/cu.usbmodemFD121 par le nom du port série de votre carte Arduino
  serial.on('open', gotOpen); // si le port série de la carte Arduino est ouvert, je lance la fonction gotOpen
  serial.on('data', serialEvent); // si des valeurs arrivent du port série de la carte Arduino, je lance la fonction serialEvent

  maFont = fontItalic ;
}

function draw() {
  background(127); // arrière-plan de couleur gris moyen
  fill(0);
  textSize(20);
  if(switchFont==0){
    maFont=fontRegular;
  }
  if(switchFont==1){
    maFont=fontBold;
  }
  if(switchFont==2){
    maFont=fontBlackItalic;
  }
  if(switchFont==3){
    maFont=fontItalic;
  }
  textFont(maFont);
  text("Switch the font !", 10, height/2);
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
  if(sensors[0] == 0 && sensors[1] == 0){
    switchFont =0;
  }
  if(sensors[0] == 1 && sensors[1] == 0){
    switchFont =1;
  }
  if(sensors[0] == 0 && sensors[1] == 1){
    switchFont =2;
  }
  if(sensors[0] == 1 && sensors[1] == 1){
    switchFont =3;
  }
}
