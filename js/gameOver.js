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

    btnStart = game.add.button(400, 550, 'playButton', restartGame);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(0.7);
    addButtonHoverEffect(btnStart);
    
    let defeatText = game.add.text(250, GAME_STAGE_HEIGHT/2 - 100,
        "DEFEAT\n"+killCount+" KILLS", {
            font: '04B_19',
            fontSize: '100px',
            fill: '#fff'
        });

    let timerEvent = game.time.events.add(5000, function() {
        restartGame();
    }, game);

}
function updategameOver(){

}

function restartGame() {
    window.location.reload();
}
