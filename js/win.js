let winState = {
    preload: preloadWin,
    create: createWin,
    update: updateWin
};

function preloadWin() {


}

function createWin() {
    let winText = game.add.text(GAME_STAGE_HEIGHT/2 + 55, GAME_STAGE_HEIGHT/2 - 100,
    "WIN", {
        fontSize: '50px',
        fill: '#0bf'
    });

    let timerEvent = game.time.events.add(5000, function() {
        restartGame();
    }, game);


}
function updateWin(){

}


function restartGame() {
    window.location.reload();
}
