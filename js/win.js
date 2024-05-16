
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

    btnStart = game.add.button(400, 550, 'playButton', restartGameWin);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(0.7);
    addButtonHoverEffect(btnStart);

    let winText = game.add.text(250, 100,
    "WIN\n"+killCount+" KILLS\n& "+playerHealth+" HP",  {
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


function restartGameWin() {
    game.state.start('init');
}
