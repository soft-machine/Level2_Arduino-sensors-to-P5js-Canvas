//https://p5js.org/reference/#/p5/windowHeight
//https://p5js.org/reference/#/p5/windowWidth

var moncanvas; // déclaration d la variable moncanvas

//fonction personnalisée qui va permettre de centrer
function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    moncanvas.position(x, y);
}

function setup() {
    moncanvas = createCanvas(300, 200); // détermination de la taille du canvas, c'est à dire la surface de travail : largeur 300 px, hauteur 200 px
    centerCanvas(); // appel de la fonction créée par nos soins pour centrer le canvas dans la page
}

function draw() {
    centerCanvas();
    background(0,255,0); // couleur d'arrière-plan vert. la fonction background a les paramètres suivants : background(rouge, vert, bleu). rouge : une valeur entre 0 et 255, bleu : une valeur entre 0 et 255, vert : une valeur entre 0 et 255
}

//fonction pour adapter la dimension du canvas à chaque redimmensionnement de fenêtre du navigateur
function windowResized() {
  centerCanvas();
}

//Nous allons devoir utiliser cette fonction, mousepressed, qui 'écoute' quand un usager clique sur les boutons de la souris ou du trackpad. Les navigateurs web empechent les programme javascript de se mettre en plein écran au chargment de la page.
function mousePressed() {
    fullscreen(true);//activation du mode plein écran
}
