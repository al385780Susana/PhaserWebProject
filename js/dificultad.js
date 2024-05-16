let dificultad = 1;


let dificultadState = {
    preload: preloadDificultad,
    create: createDificultad,
    update: updateDificultad
};


function preloadDificultad() {
    game.load.image('background', 'assets/mainMenu.png');
    game.load.image('volver', 'assets/flechaDer.png');
    game.load.image('playButton', 'assets/playButton.png');
    game.load.image('flechaDer', 'assets/flechaDer.png');
    game.load.image('flechaIzq', 'assets/flechaIzq.png');
}

function createDificultad() {
    game.add.image(0, 0, 'background');


    if(dificultad > 3 || dificultad==0) {
        dificultad=0;
    }

    if(dificultad==2){
        console.log("dificultad 2");
        btnStart = game.add.button(400, 550, 'playButton', clickStartDif);
        btnStart.anchor.setTo(0.5, 0.5);
        btnStart.scale.setTo(0.7);
        addButtonHoverEffect(btnStart);
    
        btnDer = game.add.button(725, 550, 'flechaDer', clickDerDif);
        btnDer.anchor.setTo(0.5, 0.5);
        btnDer.scale.setTo(0.5);

        btnIzq = game.add.button(100, 550, 'flechaIzq', clickIzqDif);
        btnIzq.anchor.setTo(0.5, 0.5);
        btnIzq.scale.setTo(0.5);
    
    
    }
    else if(dificultad==3){
        console.log("dificultad 3");
        btnStart = game.add.button(400, 550,  'playButton',clickStartDif);
        btnStart.anchor.setTo(0.5, 0.5);
        btnStart.scale.setTo(0.7);
        addButtonHoverEffect(btnStart);
    
        btnIzq = game.add.button(100, 550, 'flechaIzq', clickIzqDif);
        btnIzq.anchor.setTo(0.5, 0.5);
        btnIzq.scale.setTo(0.5);
    
    }
    else{
        console.log("ELSE dificultad "+dificultad);
        dificultad = 1;
        btnStart = game.add.button(400, 550, 'playButton', clickStartDif);
        btnStart.anchor.setTo(0.5, 0.5);
        btnStart.scale.setTo(0.7);
        addButtonHoverEffect(btnStart);
    
        btnDer = game.add.button(725, 550, 'flechaDer', clickDerDif);
        btnDer.anchor.setTo(0.5, 0.5);
        btnDer.scale.setTo(0.5);
    }

    let levelText = game.add.text(350, 150,
    dificultad, {
        font: '04B_19',
        fontSize: '250px',
        fill: '#fff'
    });

}

function updateDificultad(){


}

function clickMenuDif() {
    volver.inputEnabled = false;
    game.state.start('init');
}

function clickStartDif() {
    btnStart.inputEnabled = false;
    game.state.start('play',levelDifficulty=dificultad);
}

function clickDerDif() {
    btnDer.inputEnabled = false;
    dificultad = dificultad+1;
    createDificultad();
}

function clickIzqDif() {
    btnIzq.inputEnabled = false;
    dificultad = dificultad-1;
    createDificultad();
}
