let gameOverState = {
    preload: preloadgameOver,
    create: creategameOver,
    update: updategameOver
};

function preloadgameOver() {
    game.load.image('background', 'assets/mainMenu.png');
    game.load.image('playButton', 'assets/playButton.png');
}

function creategameOver() {
    game.add.image(0, 0, 'background');

    btnStart = game.add.button(400, 550, 'playButton', restartGameOver);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(0.7);
    addButtonHoverEffect(btnStart);

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

}
function updategameOver(){

}

function restartGameOver() {
    window.location.reload();
}
