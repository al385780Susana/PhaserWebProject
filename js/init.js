let initState = {
    preload: loadAssets,
    create: createInit,
    update: updateInit
};



/*
  Load the assets
*/

function loadAssets() {
    game.load.image('mainMenu', 'assets/mainMenu.png');
    game.load.image('playButton', 'assets/playButton.png');
    game.load.image('tutorialButton', 'assets/tutorialButton.png');
    game.load.image('Nave', 'assets/NaveInicio.png')
    game.load.image('NaveSombra', 'assets/NaveInicioSombra.png');
    game.load.image('titulo', 'assets/titulo.png');
}

function createInit() {

    game.add.image(0, 0, 'mainMenu');

    titulo = game.add.image(405, 50, 'titulo');
    titulo.anchor.setTo(0.5, 0.5);

    NaveSombra = game.add.image(550, 320, 'NaveSombra');
    NaveSombra.anchor.setTo(0.5, 0.5);

    Nave = game.add.image(550, 300, 'Nave');
    Nave.anchor.setTo(0.5, 0.5);

    startMovingAnimation();

    btnStart = game.add.button(130, 400, 'playButton', clickStart);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(0.7);

    btnTuto = game.add.button(150, 500, 'tutorialButton', clickTutorial);
    btnTuto.anchor.setTo(0.5, 0.5);
    btnTuto.scale.setTo(0.7);


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