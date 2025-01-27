import Player from "./Player.js";
import Obstacle from "./Obstacle.js";

import { initListeners } from "./ecouteurs.js";
export default class Game {
    objetsGraphiques = [];

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {};
    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(100, 100);
        this.objetsGraphiques.push(this.player);

        // On cree deux obstacles
        let obstacle1 = new Obstacle(300, 300, 100, 100, "red");
        this.objetsGraphiques.push(obstacle1);
        let obstacle2 = new Obstacle(500, 500, 100, 100, "blue");
        this.objetsGraphiques.push(obstacle2);

        // On initialise les écouteurs de touches, souris, etc.
        initListeners(this.inputStates);

        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.drawAllObjects();

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    update() {
        this.player.vitesseX = 0;
        
        if(this.inputStates.ArrowRight) {
            this.player.vitesseX = 3;
        } 

        if(this.inputStates.ArrowLeft) {
            this.player.vitesseX = -3;
        } 

        this.player.move();
    }


    /* 
    drawCircleImmediat(x, y, r, color) {
        // BONNE PRATIQUE : on sauvegarde le contexte
        // des qu'une fonction ou un bout de code le modifie
        // couleur, épaisseur du trait, systeme de coordonnées etc.
        this.ctx.save();

        // AUTRE BONNE PRATIQUE : on dessine toujours
        // en 0, 0 !!!! et on utilise les transformations
        // géométriques pour placer le dessin, le tourner, le rescaler
        // etc.
        this.ctx.fillStyle = color;
        this.ctx.beginPath();

        // on translate le systeme de coordonnées pour placer le cercle
        // en x, y
        this.ctx.translate(x, y);     
        this.ctx.arc(0, 0, r, 0, Math.PI * 2);
        this.ctx.fill();

        // on restore le contexte à la fin
        this.ctx.restore();
    }

    drawDemiCircleImmediat(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI, true); // Demi-cercle
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    


    drawGrid(nbLignes, nbColonnes, couleur, largeurLignes) {
        // dessine une grille de lignes verticales et horizontales
        // de couleur couleur
        this.ctx.save();

        this.ctx.strokeStyle = couleur;
        this.ctx.lineWidth = largeurLignes;

        let largeurColonnes = this.canvas.width / nbColonnes;
        let hauteurLignes = this.canvas.height / nbLignes;

        this.ctx.beginPath();

        // on dessine les lignes verticales
        for (let i = 1; i < nbColonnes; i++) {
            this.ctx.moveTo(i * largeurColonnes, 0);
            this.ctx.lineTo(i * largeurColonnes, this.canvas.height);
        }

        // on dessine les lignes horizontales
        for (let i = 1; i < nbLignes; i++) {
            this.ctx.moveTo(0, i * hauteurLignes);
            this.ctx.lineTo(this.canvas.width, i * hauteurLignes);
        }

        // gpu call pour dessiner d'un coup toutes les lignes
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawMonstre(x, y) {
        // Ici on dessine un monstre
        this.ctx.save();

        // on déplace le systeme de coordonnées pour placer
        // le monstre en x, y.Tous les ordres de dessin
        // dans cette fonction seront par rapport à ce repère
        // translaté
        this.ctx.translate(x, y);
        //this.ctx.rotate(0.3);
        //this.ctx.scale(0.5, 0.5);

        // tete du monstre
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 100, 100);
        this.drawDemiCircleImmediat(50, 0, 55, "#FF6666");
        this.drawCasquette();
        // yeux
        this.drawCircleImmediat(20, 20, 10, "#FFFFFF");
        this.drawCircleImmediat(20, 20, 7, "#6699FF");
        this.drawCircleImmediat(20, 20, 3, "#333333");
        this.drawCircleImmediat(60, 20, 10, "#FFFFFF");
        this.drawCircleImmediat(60, 20, 7, "#6699FF");
        this.drawCircleImmediat(60, 20, 3, "#333333");


        
        this.drawBouche();
        this.drawDent();
        // Les bras
        //this.drawBrasGauche();

        // restore
        this.ctx.restore();
    }

    drawBrasGauche() {
        this.ctx.save();

        this.ctx.translate(-50, 50);
        //this.ctx.rotate(0.7);

        // on dessine le bras gauche
        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(-50, 0, 50, 10);

        // on dessine l'avant bras gauche
       this.drawAvantBrasGauche();

        this.ctx.restore();
    }

    drawAvantBrasGauche() {
        this.ctx.save();

    this.ctx.translate(0, 0);

        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 0, 50, 10);

        this.ctx.restore();
    }

    drawDent(){
        this.ctx.save();

        this.ctx.translate(-55, -10);

        this.ctx.beginPath();
        this.ctx.moveTo(100, 80);
        this.ctx.lineTo(100, 70 );
        this.ctx.moveTo(90, 80);
        this.ctx.lineTo(90, 70);
        this.ctx.strokeStyle = "#FFFFFF"; // Noir un peu clair
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.restore();
    }

    drawCasquette() {
        this.ctx.save();

        this.ctx.translate(-55, -10);
        this.ctx.fillStyle = "#FF6666";

        this.ctx.fillRect(0, 0, 100, 10);


        this.ctx.restore();

    }

    drawBouche() {
        this.ctx.save();

        this.ctx.translate(0, 0);
        this.ctx.scale(1, -1);

        this.drawDemiCircleImmediat(40, -60, 25, "brown");
        this.ctx.closePath();

        this.ctx.restore();
    }

    */
    
}