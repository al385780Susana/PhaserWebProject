const GAME_STAGE_WIDTH = 800;
const GAME_STAGE_HEIGHT = 600;

let game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.AUTO, 'gamestage');

// Entry point
window.onload = startGame;

function startGame() {
    game.state.add('init', initState);
    game.state.add('play', playState);
    game.state.add('gameOver', gameOverState);
    game.state.add('win', winState);
    //game.state.start('play');
    game.state.start('init');
}
