
const VICTORY_POINTS = 500;
const PLAYER_VELOCITY = 150;
const ENEMY_VELOCITY = 100;

//CONTROLES
let cursors;
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
let blast;
let moneda;
let monedasList;
let bullet;
let bulletList;

let municionActual;
municionActual
let score = 0;
let dineroTotal = 0;
let killCount = 0;
let killText;
let dineroTotalText;
let bulletTotalText;
let scoreText;




// methods
/**
 * Load the assets
 */
function loadAssets() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('player','assets/nave_inicial_0.png' );
    game.load.image('enemy', 'assets/enemigo.png');
    game.load.image('moneda','assets/moneda.png' );
    game.load.image('blast', 'assets/proyectil.png');
    game.load.image('bullet', 'assets/municion.png');
    game.load.image('bulletHUD', 'assets/municionHUD.png');
}


/**
 * Initialise the stage
 */
function initialiseGame() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'sky');
    bulletHUD = game.add.sprite(725,525, 'bulletHUD');
    bulletHUD.scale.setTo(1.5);
    createPlayer();

    municionActual = 5;

    monedasList = [];
    bulletList = [];
    enemies = [];
    click = game.input.mousePointer;
    control = false;
    contador = 0;
    dineroTotal = 0;
    killCount = 0;
    score = 0;
    //createEnemy();
    timeEnemy(3000);

    dineroTotalText = game.add.text(65, GAME_STAGE_HEIGHT - 50,
        dineroTotal, {
            fontSize: '32px',
            fill: '#fff'
        });

    bulletTotalText = game.add.text(700, GAME_STAGE_HEIGHT - 50,
        municionActual, {
            fontSize: '32px',
            fill: '#fff'
        });


        /*TEXTO EN MEDIO, SERÍA CAMBIAR EL TIPO DE FUENTE Y COLOR */
    /*killText = game.add.text(GAME_STAGE_HEIGHT/2 + 55, GAME_STAGE_HEIGHT/2 - 100,
        killCount, {
            fontSize: '150px',
            fill: '#008080'
        });*/

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
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
    manageColision();
    enemiesMovement(); //aqui está lo de rotar los enemigos que estaba antes aquí

    updateText();

    //ESTA SOLUCION ES BASTANTE CUTRE, PERO DE MOMENTO LA TENEMOS AHI PARA QUE FUNCIONE.
    contador++;
    if(contador == 200){
        timeEnemy(2000);
        contador = 0;
    };
    //----------------------------------------------------------------------------------

}

function updateText(){
        dineroTotalText.setText(dineroTotal);
        bulletTotalText.setText(municionActual);
       // scoreText.setText(score);
}

function enemiesMovement(){
    if(enemy){
        enemies.forEach(function(enemy) {
            rotateEnemy(enemy);
            moveTo(enemy,player.x, player.y,ENEMY_VELOCITY);
        });
    }

}

function blastManagement(){
    if(blast){
        blastArray.forEach(function(blast){
            destroyBlast(3000);
        })
    }
}

function manageColision(){
    for (let i = 0; i <= enemies.length; i++){
        if(blast){game.physics.arcade.overlap(blast, enemies[i], enemyBlastCollide, null, this);}
        game.physics.arcade.overlap(player, enemies[i], playerEnemyCollide, null, this);
    }

    if(moneda){
        for (let i = 0; i <= monedasList.length; i++){
            game.physics.arcade.overlap(monedasList[i], player, recogerMonedas, null, this);
        }
    }

    if(bullet){
        for(let i = 0; i <= bulletList.length; i++){
            game.physics.arcade.overlap(bulletList[i], player, recogerBullets, null, this);
        }
    }


}


function playerMovement() {
    // Reset player's velocity
    player.body.velocity.setTo(0);

    // Check input for movement
    if (cursors.left.isDown || buttonA.isDown) {
        // Move left
        player.body.velocity.x = -PLAYER_VELOCITY;
    }
    if (cursors.right.isDown || buttonD.isDown) {
        // Move right
        player.body.velocity.x = PLAYER_VELOCITY;
    }
    if (cursors.up.isDown || buttonW.isDown) {
        // Move up
        player.body.velocity.y = -PLAYER_VELOCITY;
    }
    if (cursors.down.isDown || buttonS.isDown) {
        // Move down
        player.body.velocity.y = PLAYER_VELOCITY;
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

    blast.angle = player.angle;

    console.log("Proyectil creado");

}

function spawnMoneda(xSpawn,ySpawn){
    moneda = game.add.sprite(xSpawn, ySpawn, 'moneda');
    game.physics.arcade.enable(moneda);

    monedasList.push(moneda);
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
    enemy.enableBody = true;
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;

    //game.physics.arcade.collide(enemy, player, collisionHandler, null, game);

    rotateEnemy(enemy);
    enemies.push(enemy);

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
    if(click.isDown && control == false && municionActual>0){
        createBlast();
        moveTo(blast, game.input.mousePointer.x, game.input.mousePointer.y, 500);
        control = true;
        cooldownDisparo(1000);
        destroyBlast(3000, blast);

        municionActual -= 1;

    }

}

function cooldownDisparo(tiempo){
    game.time.events.add(tiempo, function() {
        control = false;
    }, game);
}
function destroyBlast(tiempo, blast){
    game.time.events.add(tiempo, function() {
        blast.destroy();
    }, game);
}

function recogerMonedas(moneda, player){
    moneda.kill();
    dineroTotal += 1;
}

function recogerBullets(bullet, player){
    bullet.kill();
    municionActual += 1;
}

function enemyBlastCollide(blast, enemy) {

    let xSpawn = enemy.x;
    let ySpawn = enemy.y;

    console.log("Colisión detectada: proyectil y enemigo");
    blast.kill();
    enemy.kill();

    spawnMoneda(xSpawn,ySpawn);
    bulletRandom(xSpawn,ySpawn);



    killCount += 1;
    //AQUI SE PONE LA PUNTUACION Y LO QUE OCURRA AL MATAR

}

function bulletRandom(xSpawn,ySpawn){
    numeroRandom = Phaser.Math.between(0, 10);

    if(numeroRandom >= 5){
        spawnBullet(xSpawn,ySpawn);
    }
    if(numeroRandom == 9){
        spawnBullet(xSpawn -100,ySpawn -100);
    }
}

function spawnBullet(xSpawn, ySpawn){
    bullet = game.add.sprite(xSpawn +50, ySpawn +50, 'bullet');
    game.physics.arcade.enable(bullet);

    bulletList.push(bullet);
}

function playerEnemyCollide(player, enemy){
    console.log("Colisión detectada: jugador y enemigo");
    enemy.kill();

}