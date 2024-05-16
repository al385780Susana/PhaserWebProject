
let winState = {
    preload: preloadWin,
    create: createWin,
    update: updateWin
};

function preloadWin() {
    game.load.image('background', 'assets/mainMenu.png');
    game.load.image('playButton', 'assets/playButton.png');

}

function createWin() {
    game.add.image(0, 0, 'background');

    btnStart = game.add.button(400, 550, 'playButton', restartGame);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(0.7);
    addButtonHoverEffect(btnStart);

    let winText = game.add.text(250, GAME_STAGE_HEIGHT/2 - 100,
    "WIN\nSCORE: "+killCount,  {
        font: '04B_19',
        fontSize: '100px',
        fill: '#fff'
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
