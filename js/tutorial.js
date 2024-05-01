let numTutorial = 0;

let tutorialState = {
    preload: loadAssets,
    create: createTutorial,
    update: updateTutorial
};

function loadAssets() {
    game.load.image('tuto1', 'assets/tuto1.png');
    game.load.image('tuto2', 'assets/tuto2.png');
    game.load.image('tuto3', 'assets/tuto3.png');
    game.load.image('flechaDer', 'assets/flechaDer.png');
    game.load.image('flechaIzq', 'assets/flechaIzq.png');
}

function createTutorial() {
    if (numTutorial == 0){
        game.add.image(0, 0, 'tuto1');
        btnDer = game.add.button(725, 550, 'flechaDer', clickDer);
        btnDer.anchor.setTo(0.5, 0.5);
        btnDer.scale.setTo(0.5);
    }
    else if(numTutorial == 1){
        game.add.image(0, 0, 'tuto2');
        btnDer = game.add.button(725, 550, 'flechaDer', clickDer);
        btnDer.anchor.setTo(0.5, 0.5);
        btnDer.scale.setTo(0.5);
        btnIzq = game.add.button(75, 550, 'flechaIzq', clickIzq);
        btnIzq.anchor.setTo(0.5, 0.5);
        btnIzq.scale.setTo(0.5);
    }
    else if(numTutorial == 2){
        game.add.image(0, 0, 'tuto3');
        btnIzq = game.add.button(75, 550, 'flechaIzq', clickIzq);
        btnIzq.anchor.setTo(0.5, 0.5);
        btnIzq.scale.setTo(0.5);
        btnFin = game.add.button(725, 550, 'flechaDer', clickFin);
        btnFin.anchor.setTo(0.5, 0.5);
        btnFin.scale.setTo(0.5);
    }
}
function clickDer() {
    btnDer.inputEnabled = false;
    numTutorial++;
    createTutorial();
}

function clickIzq() {
    btnIzq.inputEnabled = false;
    numTutorial--;
    createTutorial();
}

function clickFin() {
    btnIzq.inputEnabled = false;
    numTutorial = 0;
    game.state.start('init');
}

function updateTutorial(){

}