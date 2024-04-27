const VICTORY_POINTS = 500;
const PLAYER_VELOCITY = 150;

let fireButton;

let playState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let player;
let cursors;
let score = 0;
let scoreText;


// methods
/**
 * Load the assets
 */
function loadAssets() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('player','assets/nave_inicial_0.png' );
}


/**
 * Initialise the stage
 */
function initialiseGame() {
    createPlayer();
    
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(
        Phaser.Keyboard.SPACEBAR);
}

/**
 * Game loop: update elements and check events
 */
function gameUpdate() {
    //  If game is already over do nothing
   /* if (gameOver) {
        return;
    }*/
   
    playerMovement();
   

}

function playerMovement(){
     //  Reset the players velocity (movement)
     player.body.velocity.x = 0;
     player.body.velocity.y = 0;
 
     if (cursors.left.isDown) {
         //  Move to the left
         player.body.velocity.x = -PLAYER_VELOCITY;
         console.log("left, pos "+ player.body.x);
 
     } else if (cursors.right.isDown) {
         //  Move to the right
         player.body.velocity.x = PLAYER_VELOCITY;
         console.log("right, pos "+ player.body.x);
     } else if(cursors.up.isDown){
         player.body.velocity.y = -PLAYER_VELOCITY;
         console.log("up, pos "+ player.body.y);
     }
     else if(cursors.down.isDown){
         player.body.velocity.y = PLAYER_VELOCITY;
         console.log("down, pos "+ player.body.y);
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
        game.state.start('win');
    });

   // if (victoryAtEnd) {
        //soundVictory.play();
    //} else {
        //soundDefeat.play();
    //}
}

function createPlayer(){
    let x = game.world.centerX;
    let y = game.world.height;
    
    player = game.add.sprite(x, y, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    //player.enableBody = true;

   
}