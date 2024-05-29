let comicState = {
    preload: preloadComic,
    create: createComic,
    update: updateComic
};

let positions = [
    { x: 0, y: 0 },     // Primera viñeta
    { x: 0, y: 500 },   // Segunda viñeta
    { x: 0, y: 0 },  // Tercera viñeta
    { x: 0, y: 500 },   // Cuarta viñeta
    // Agrega más posiciones según sea necesario
];

let contador;
let currentIndex = 0;
let comic;

function preloadComic() {
    // Cargar la imagen del cómic
    game.load.image('comic', 'assets/comic.jpg');
}

function createComic() {
    // Agregar la imagen del cómic al juego
    comic = game.add.image(0, 0, 'comic');
    comic.scale.setTo(2.2)
    
    // Iniciar el movimiento de la imagen de fondo
    moveToNextPanel();
}

function updateComic() {
    // No es necesario hacer nada en update para este caso
}

function moveToNextPanel() {

    currentIndex++;
    
    if (currentIndex >= positions.length) {
        currentIndex = 0;
    }



    let target = positions[currentIndex];
    

    let tween = game.add.tween(comic).to({ x: -target.x, y: -target.y }, 2000, Phaser.Easing.Quadratic.InOut, true);
    if (currentIndex == 2) {
        let escalaFondo1 = game.add.tween(comic.scale).to({x: 1.35, y: 1.35 }, 2000, Phaser.Easing.Cubic.Out, true);
    }

    tween.onComplete.addOnce(function() {
        game.time.events.add(Phaser.Timer.SECOND * 2, moveToNextPanel, this);
    });


    if (currentIndex == 3) {
        contador = game.time.events.add(Phaser.Timer.SECOND * 3, function() {
            game.state.start('danceRoom');
        }, game);

    }

}
