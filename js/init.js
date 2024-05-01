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
}

function createInit() {
    
    game.add.image(0, 0, 'mainMenu');


    /*
    textI = 'prueba texto\n';
    styleI = {font:'20px Arial', fill:'#FFFFFF'};
    instructions = game.add.text(40, 80, textI, styleI);
    */

    btnStart = game.add.button(200, 500, 'playButton', clickStart);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(1.0);

    btnTuto = game.add.button(600, 500, 'tutorialButton', clickTutorial);
    btnTuto.anchor.setTo(0.5, 0.5);
    btnTuto.scale.setTo(1.0);
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