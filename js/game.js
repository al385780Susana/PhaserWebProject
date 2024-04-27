const VICTORY_POINTS = 500;
const WORLD_WIDTH = 800;
const WORLD_HEIGHT = 600;


let game = new Phaser.Game(WORLD_WIDTH, WORLD_HEIGHT, Phaser.AUTO, 'game');

let mainState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let player;
let cursors;
let score = 0;
let scoreText;



game.state.add('main', mainState);
game.state.add('final', finalState);

game.state.start('main');

// methods
/**
 * Load the assets
 */
function loadAssets() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('player','assets/nave_inicial.png' );
}

/**
 * Initialise the stage
 */
function initialiseGame() {

    game.world.setBounds(0,0,WORLD_WIDTH, WORLD_HEIGHT);

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    //game.add.sprite(0, 0, 'sky');


    // The player and its settings
    player = game.add.sprite(0, 0, 'player');


    //player.enableBody = true;

   
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
}

/**
 * Game loop: update elements and check events
 */
function gameUpdate() {
    //  If game is already over do nothing
   /* if (gameOver) {
        return;
    }*/
   
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        print("hola");

    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;

    } else if(cursors.up.isDown){
        player.body.velocity.y = -150;

    }
    else if(cursors.down.isDown){
        player.body.velocity.y = 150;
    }
    else{
         //  Stand still
         player.body.velocity.x = 0;
         player.body.velocity.y = 0;
    }

}



function endGame() {
    // Game Over
    gameOver = true;

    // Stop and reset input
    game.input.enabled = false;
    cursors.left.reset(true);
    cursors.right.reset(true);
    cursors.up.reset(true);
    cursors.down.reset(true);

    // Stop player
  
    player.body.velocity.x = player.body.velocity.y = 0;


    // Cleaning...


    // Final animation (a tween)
    let finalTween = game.add.tween(player.scale).to({
            x: 2,
            y: 2
        }, 1000,
        Phaser.Easing.Cubic.Out, true, 0, 2, true);

    finalTween.onComplete.add(function () {
        player.destroy();
        game.state.start('final');
    });

   // if (victoryAtEnd) {
        //soundVictory.play();
    //} else {
        //soundDefeat.play();
    //}
}