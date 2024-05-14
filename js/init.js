let initState = {
    preload: loadAssets,
    create: createInit,
    update: updateInit
};



/*
  Load the assets
*/

let estaAnimando = false

function loadAssets() {
    game.load.image('mainMenu', 'assets/mainMenu.png');
    game.load.image('playButton', 'assets/playButton.png');
    game.load.image('tutorialButton', 'assets/tutorialButton.png');
    game.load.image('Nave', 'assets/NaveInicio.png')
    game.load.image('NaveSombra', 'assets/NaveInicioSombra.png');
    game.load.image('titulo', 'assets/titulo.png');
    game.load.image('creditos', 'assets/creditos.png');
    game.load.image('dificultad', 'assets/dificultad.png');
}

function createInit() {

    game.add.image(0, 0, 'mainMenu');

    titulo = game.add.image(405, 70, 'titulo');
    titulo.anchor.setTo(0.5, 0.5);

    NaveSombra = game.add.image(550, 360, 'NaveSombra');
    NaveSombra.anchor.setTo(0.5, 0.5);

    Nave = game.add.image(550, 350, 'Nave');
    Nave.anchor.setTo(0.5, 0.5);
    
    startMovingAnimation();

    creditos = game.add.button(160, 390, 'creditos', clickStart);
    creditos.anchor.setTo(0.5, 0.5);
    creditos.scale.setTo(1);
    addButtonHoverEffect(creditos);

    dificultad = game.add.button(175, 310, 'dificultad', clickStart);
    dificultad.anchor.setTo(0.5, 0.5);
    dificultad.scale.setTo(1);
    addButtonHoverEffect(dificultad);

    btnStart = game.add.button(130, 230, 'playButton', clickStart);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(0.7);
    addButtonHoverEffect(btnStart);

    btnTuto = game.add.button(150, 470, 'tutorialButton', clickTutorial);
    btnTuto.anchor.setTo(0.5, 0.5);
    btnTuto.scale.setTo(0.7);
    addButtonHoverEffect(btnTuto);


}

function clickStart() {
    btnStart.inputEnabled = false;
    game.state.start('play');

}
function clickTutorial() {
    btnStart.inputEnabled = false;
    game.state.start('tutorial');
}

function updateInit(){}

function startMovingAnimation() {
    var animNave = game.add.tween(Nave.position);
    animNave.to({
        y: Nave.y - 20
    }, 1000, Phaser.Easing.Cubic.Out, true, 0, -1, true);
}

var buttonTweens = {};

function addButtonHoverEffect(button) {
    var originalScale = { x: button.scale.x, y: button.scale.y };

    // Tween para escalar cuando el cursor está sobre el botón
    button.events.onInputOver.add(function() {
        game.add.tween(button.scale).to({x: originalScale.x * 1.1, y: originalScale.y * 1.1}, 200, Phaser.Easing.Linear.None, true);
    }, this);

    // Tween para volver al tamaño original cuando el cursor sale del botón
    button.events.onInputOut.add(function() {
        game.add.tween(button.scale).to({x: originalScale.x, y: originalScale.y}, 200, Phaser.Easing.Linear.None, true);
    }, this);
}