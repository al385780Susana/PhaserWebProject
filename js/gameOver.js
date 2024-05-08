let gameOverState = {
    preload: preloadgameOver,
    create: creategameOver,
    update: updategameOver
};

function preloadgameOver() {

}

function creategameOver() {

    let defeatText = game.add.text(GAME_STAGE_HEIGHT/2 + 55, GAME_STAGE_HEIGHT/2 - 100,
        "DEFEAT", {
            fontSize: '50px',
            fill: '#0bf'
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
