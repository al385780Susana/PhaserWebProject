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
}

function createInit() {

    let posX = game.world.width-800;
    let posY = game.world.height-600;
    game.add.image(posX, posY, 'mainMenu');

    //let button1 = game.add.image(700, 500, 'playButton');
    //button1.scale.setTo(1.5);

    //background.anchor.setTo(0.5, 0.5);
    //background.scale.setTo(1.0);
    /*
    textI = 'Despres de posar el fons\n';
    styleI = {font:'20px Arial', fill:'#FFFFFF'};
    instructions = game.add.text(40, 80, textI, styleI);
    */
    btnStart = game.add.button(700, 500, 'playButton', clickStart);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(1.5);
}

function clickStart() {
    btnStart.inputEnabled = false;
    game.state.start('play');

}

function updateInit(){}