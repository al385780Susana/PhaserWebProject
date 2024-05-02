
const VICTORY_POINTS = 500;
const PLAYER_VELOCITY = 150;

let fireButton;
let buttonA;
let buttonD;
let buttonS;
let buttonW;
let anglePlayer = 0;

let playState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let player;
let enemy;
let enemies;
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
    game.load.image('bullet','assets/pixil-frame-0.png');
    game.load.image('enemy', 'assets/enemigo.png');
    game.load.image('moneda','assets/moneda.png' );
    game.load.image('blast', 'assets/pixil-frame-0.png')
}


/**
 * Initialise the stage
 */
function initialiseGame() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'sky');
    createPlayer();
    enemies = [];
    click = game.input.mousePointer;
    control = false;
    contador = 0;
    //createEnemy();
    timeEnemy(3000);




    /*
    onmousemove=(pointer) =>{
        anglePlayer = Phaser.Math.angleBetween(player.x, player.y, pointer.x, pointer.y);
        player.rotation = anglePlayer;
       // console.log("angle deg"+anglePlayer);
     }
    */
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR);
    buttonW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    buttonA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    buttonS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    buttonD = game.input.keyboard.addKey(Phaser.Keyboard.D);

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
    rotatePlayer();


    disparar();


    if(enemy){
        enemies.forEach(function(enemy) {
            rotateEnemy(enemy);

        });
    }

    /*
    if(enemy){
        rotateEnemy();
    }
*/


    //ESTA SOLUCION ES BASTANTE CUTRE, PERO DE MOMENTO LA TENEMOS AHI PARA QUE FUNCIONE.
    contador++;
    if(contador == 500){
        timeEnemy(2000);
        contador = 0;
    };
    //----------------------------------------------------------------------------------

}

function playerMovement(){
     //  Reset the players velocity (movement)
     player.body.velocity.x = 0;
     player.body.velocity.y = 0;
     anglePlayer = 0;
    
 
     if (cursors.left.isDown||buttonA.isDown) {
         //  Move to the left
         player.body.velocity.x = -PLAYER_VELOCITY;

 
     } else if (cursors.right.isDown||buttonD.isDown) {
         //  Move to the right
         player.body.velocity.x = PLAYER_VELOCITY;

     } else if(cursors.up.isDown||buttonW.isDown){
         player.body.velocity.y = -PLAYER_VELOCITY;

     }
     else if(cursors.down.isDown||buttonS.isDown){
         player.body.velocity.y = PLAYER_VELOCITY;

     }
     if(fireButton.justDown){
        console.log("FIRE");
        let bullet = game.add.sprite(player.x,player.y,'bullet');
        game.physics.arcade.enable(bullet);
        
   
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
    let y = game.world.centerY;

    player = game.add.sprite(x, y, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    //player.enableBody = true;
}

function createBlast(){
    let x = player.x;
    let y = player.y;

    blast = game.add.sprite(x, y, 'blast');
    blast.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(blast);
    blast.body.collideWorldBounds = false;

    console.log("Proyectil creado");

    //game.physics.arcade.overlap(blast, enemies, collisionHandler, null, game);
}

function rotatePlayer(){
    var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
        player.x, player.y,
        game.input.activePointer.x, game.input.activePointer.y);

      if(targetAngle < 0)
          targetAngle += 360;

    player.angle = targetAngle;
}

function createEnemy(){

    let x = Phaser.Math.random(50, 751);
    let y = Phaser.Math.random(50, 550);

    enemy = game.add.sprite(x, y, 'enemy');
    enemy.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;

    //game.physics.arcade.collide(enemy, player, collisionHandler, null, game);

    rotateEnemy(enemy);
    enemies.push(enemy);
    //player.enableBody = true;
}

function rotateEnemy(enemy) {
    var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
        enemy.x, enemy.y,
        player.x, player.y);

    if (targetAngle < 0)
        targetAngle += 360;

    enemy.angle = targetAngle;
}

function timeEnemy(tiempo){
    game.time.events.add(tiempo, function() {
        createEnemy();
    }, game);
}


function moveTo(object, targetX, targetY, speed) {
    // Calcular el ángulo entre la posición actual del objeto y la posición objetivo
    let angle = Phaser.Math.angleBetween(object.x, object.y, targetX, targetY);

    // Calcular las componentes x e y del vector de dirección utilizando el ángulo
    let velocityX = Math.cos(angle) * speed;
    let velocityY = Math.sin(angle) * speed;

    // Asignar la velocidad al objeto para que se desplace hacia la posición objetivo
    object.body.velocity.setTo(velocityX, velocityY);
}

function disparar(){
    if(click.isDown && control == false){
        createBlast();
        moveTo(blast, game.input.mousePointer.x, game.input.mousePointer.y, 500);
        control = true;
        cooldownDisparo(1000);
        destroyBlast(1000);
    }

}

function cooldownDisparo(tiempo){
    game.time.events.add(tiempo, function() {
        control = false;
    }, game);
}


function destroyBlast(tiempo){
    game.time.events.add(tiempo, function() {
        blast.destroy();
    }, game);
}

function collisionHandler(blast, enemy) {


    console.log("Colisión detectada: proyectil y enemigo");
    blast.kill();
    enemy.kill();

    //AQUI SE PONE LA PUNTUACION Y LO QUE OCURRA AL MATAR
    moneda = game.physics.add.sprite(enemy.x, enemy.y, 'moneda');
}