let creditosState = {
    preload: preloadCreditos,
    create: createCreditos,
    update: updateCreditos
};

function preloadCreditos() {
    game.load.image('creditos', 'assets/creditos.png');
    game.load.image('background', 'assets/mainMenu.png');
    game.load.image('volver', 'assets/flechaDer.png');
    game.load.image('nombres', 'assets/nombres.png');
}

function createCreditos() {
    game.add.image(0, 0, 'background');
    game.add.image(0, 0, 'nombres');

    creditos = game.add.image(400, 80, 'creditos');
    creditos.anchor.setTo(0.5, 0.5);

    volver = game.add.button(725, 540, 'volver', clickMenu);
    volver.anchor.setTo(0.5, 0.5);
    volver.scale.setTo(0.5);
}

function updateCreditos(){

}

function clickMenu() {
    volver.inputEnabled = false;
    game.state.start('init');
}