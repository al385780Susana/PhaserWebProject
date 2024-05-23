
let winState = {
    preload: preloadWin,
    create: createWin,
    update: updateWin
};

function preloadWin() {
    game.load.image('background', 'assets/mainMenu.png');
    game.load.image('flecha', 'assets/flechaDer.png');

}

function createWin() {
    game.add.image(0, 0, 'background');


    let showHealth = 0
    if(playerHealth>0) {showHealth = playerHealth};

    let winText = game.add.text(250, 100,
    "WIN\n"+killCount+" KILLS\n& "+showHealth+" HP",  {
        font: '04B_19',
        fontSize: '100px',
        fill: '#fff'
    });

    let timerEvent = game.time.events.add(5000, function() {
        restartGameWin();
    }, game);

    flecha = game.add.button(720, 540, 'flecha', restartGameWin);
    flecha.anchor.setTo(0.5, 0.5);
    flecha.scale.setTo(0.5);

}
function updateWin(){

}


function restartGameWin() {
    flecha.inputEnabled = false;
    window.location.reload();
}
