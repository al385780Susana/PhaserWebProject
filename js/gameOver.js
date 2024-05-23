let gameOverState = {
    preload: preloadgameOver,
    create: creategameOver,
    update: updategameOver
};

function preloadgameOver() {
    game.load.image('background', 'assets/mainMenu.png');
    game.load.image('flecha', 'assets/flechaDer.png');
}

function creategameOver() {
    game.add.image(0, 0, 'background');



    let showHealth = 0
    let defeatText = game.add.text(250, 100,
        "DEFEAT\n"+killCount+" KILLS\n& 0 HP", {
            font: '04B_19',
            fontSize: '100px',
            fill: '#fff'
        });

    let timerEvent = game.time.events.add(5000, function() {
        restartGameOver();
    }, game);

    flecha = game.add.button(720, 540, 'flecha', restartGameOver);
    flecha.anchor.setTo(0.5, 0.5);
    flecha.scale.setTo(0.5);

}

function updategameOver(){

}

function restartGameOver() {
    flecha.inputEnabled = false;
    window.location.reload();
}
