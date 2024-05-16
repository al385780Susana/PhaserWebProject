const GAME_STAGE_WIDTH = 800;
const GAME_STAGE_HEIGHT = 600;

let game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.AUTO, 'gamestage');

let wfConfig = {
    active: function(){startGame();}
,   custom: {
        families:['04B_19'],
    }
};


WebFont.load(wfConfig);

// Entry point
window.onload = startGame;

function startGame() {
    game.state.add('init', initState);
    game.state.add('seleccionDificultad', dificultadState);
    game.state.add('play', playState);
    game.state.add('gameOver', gameOverState);
    game.state.add('win', winState);
    game.state.add('tutorial', tutorialState);
    game.state.add('creditos', creditosState);
    game.state.start('init');
}
