
// VAriables CONSTANTES

const VICTORY_POINTS = 500;
const PLAYER_VELOCITY = 150;
const ENEMY_VELOCITY = 100;
const BLAST_VELOCITY = 200;
const ENEMY_SHOOT_CADENCY = 3000;
const PLAYER_HEALTH = 10;
const RANGO_PERSECUCION = 100000;


let levelDifficulty = 3;
let gameOver = false;
let victoryAtEnd = false;


//CONTROLES
let cursors;
let buttonA;
let buttonD;
let buttonS;
let buttonW;
let anglePlayer = 0;
let cursorsShift;

//SALUD DEL JUGADOR
let playerHealth;

//PLAYSTATE
let playState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};


//VARIABLES
let player;
let enemy;
let enemies;
let blast;
let moneda;
let monedasList;
let bullet;
let bulletList;

let enemyBlast;
let enemieBlastList;

let municionActual;
municionActual
let score = 0;
let dineroTotal = 0;
let killCount = 0;
let killText;
let dineroTotalText;
let bulletTotalText;
let scoreText;
let velocidadExtra;




//CARGAR IMAGENES
function loadAssets() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('player','assets/nave_inicial_0.png' );
    game.load.image('enemy', 'assets/enemigo.png');
    game.load.image('moneda','assets/moneda.png' );
    game.load.image('blast', 'assets/proyectil.png');
    game.load.image('bullet', 'assets/municion.png');
    game.load.image('bulletHUD', 'assets/municionHUD.png');
    game.load.image('monedaHUD', 'assets/monedaHUD.png');
    game.load.image('enemyBlast', 'assets/proyetilEnemigo.png');
    game.load.image('fondoGrande', 'assets/fondoGrande.jpg');
    game.load.audio('soundDefeat', 'assets/snds/wrong.mp3');
    game.load.audio('laser', 'assets/snds/laser.mp3');
    game.load.audio('menu', 'assets/snds/menu.mp3');
    game.load.audio('stage', 'assets/snds/stage.mp3');
    //fuente
    //game.load.setPath('assets/04B_19_.TTF');
    //game.load.bitmapFont('textoFondo', 'assets/04B_19_.png', 'assets/04B_19_.xm1');

}


//INICIO DEL JUEGO

function initialiseGame() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //CARGAMOS Y CONFIGURAMOS EL MUNDO
    game.world.setBounds(0, 0, 1920, 1080);
    let bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'fondoGrande');
    bg.scrollFactorX = 0.7;
    bg.scrollFactorY = 0.7;
    //CARGAMOS LOS ASSETS EN LE JUEGO

    game.add.sprite(0,0,'sky');
    //textoFondo = game.add.bitmapText(400, 300, 'textoFondo', '0', { fontSize: '100px', fill: '#ffffff' });
    //textoFondo.anchor.setTo(0.5);
    bulletHUD = game.add.sprite(725,525, 'bulletHUD');
    bulletHUD.scale.setTo(1.5);
    monedaHUD = game.add.sprite(0,525, 'monedaHUD');
    monedaHUD.scale.setTo(1.5);

    bulletHUD.fixedToCamera = true;

    const soundDefeat =  game.sound.add('soundDefeat');
    //const soundVictory;

    createPlayer();

    //DAMOS LOS VALORES
    playerHealth = PLAYER_HEALTH;
    click = game.input.mousePointer;

    //LISTAS
    monedasList = [];
    bulletList = [];
    enemieBlastList = [];
    enemies = [];

    //NUMERICO
    municionActual = 5;
    contador = 0;
    contador2 = 0;
    dineroTotal = 0;
    killCount = 0;
    score = 0;

    //BOOL
    control = false;

    //CREACION DE ENEMIGOS
    timeEnemy(3000);

    //HUD---------------------------------------------------------------
    dineroTotalText = game.add.text(65, GAME_STAGE_HEIGHT - 50,
        dineroTotal, {
            fontSize: '32px',
            fill: '#fff'
        });
  
    dineroTotalText.fixedToCamera = true;

    bulletTotalText = game.add.text(700, GAME_STAGE_HEIGHT - 50,
        municionActual, {
            fontSize: '32px',
            fill: '#fff'
        });
        
    bulletTotalText.fixedToCamera = true;
    //------------------------------------------------------------------

        /*TEXTO EN MEDIO, SERÍA CAMBIAR EL TIPO DE FUENTE Y COLOR */
        /*killText = game.add.text(GAME_STAGE_HEIGHT/2 + 55, GAME_STAGE_HEIGHT/2 - 100,
        killCount, {
            fontSize: '150px',
            fill: '#008080'
        });*/


    //CONTROLES
    cursors = game.input.keyboard.createCursorKeys();
    buttonW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    buttonA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    buttonS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    buttonD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    buttonShift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    //CAMERA
    game.camera.follow(player);
}

// REFRESCO DE PANTALLA A CADA FRAME

function gameUpdate() {

    if (gameOver) {
        return;
    }
    else{

        if(buttonShift.isDown){
            velocidadExtra = 150;
        }
        else{
            velocidadExtra = 0;
        }

        //EN CUALQUIER MOMENTO
        playerMovement(); //            Se nueve el jugador
        rotatePlayer();//               El jugador rota
        disparar();//                   Disparo del jugador
        manageColision();//             Tiene en cuenta la colisión del jugador
        updateText();//                 Actualiza los valores de municion y dinero.


        //Si hay un enemigo
        if(enemy){
            enemies.forEach(function(enemy){
                rotateEnemy(enemy);
            });

        }

        //APARICIÓN DE ENEMIGOS
        //ESTA SOLUCION ES BASTANTE CUTRE, PERO DE MOMENTO LA TENEMOS AHI PARA QUE FUNCIONE.
        contador++;
        if(contador == 200){
            timeEnemy(2000);//          Tiempo de reaparición de enemigo
            contador = 0;
        };

        if(levelDifficulty >= 2){

            contador2++;
            if(contador == 50){
                timeEnemyShoot(0);//    Tiempo para que disparen los enemigos
                contador2 = 0;
        };
        }

        //----------------------------------------------------------------------------------



        //NIVEL DE DIFICULTAD 1-------------------------------------------------------------
        if(levelDifficulty == 1 || levelDifficulty == 3){
            enemiesMovement();//        El enemigo se mueve hacia el jugador
        }
        //----------------------------------------------------------------------------------

    }

}

//FUNCIONES******************************************************************************************************************************************

function updateText(){//                                                            Se actualiza el texto del dinero y munición
        dineroTotalText.setText(dineroTotal);
        bulletTotalText.setText(municionActual);
       // scoreText.setText(score);
}

/*function enemiesMovement(){//                                                       El enemigo se mueve hacia el jugador (sin rango de persecucion)
    if(enemy){
            enemies.forEach(function(enemy) {
                    moveTo(enemy,player.x, player.y,ENEMY_VELOCITY);

            });
    }

}*/
function enemiesMovement(){// El enemigo se mueve hacia el jugador si el jugador está en el rango de persecucion del enemigo o el nivel es 1
    enemies.forEach(function(enemy) {
        if(levelDifficulty>1){
            distanciaJugador = Phaser.Math.distanceSq(player.x,player.y, enemy.x,enemy.y);
           if(distanciaJugador<=RANGO_PERSECUCION){
                moveTo(enemy,player.x, player.y,ENEMY_VELOCITY);
           }
        }
        else { moveTo(enemy,player.x, player.y,ENEMY_VELOCITY);}
    });
}

function enemiesShoot(){//                                                          El enemigo dispara en dirección del jugador
    if(enemy && !gameOver){
        enemies.forEach(function(enemy) {
            tiempo = Phaser.Math.random(500, 3000);
            if(enemy){
                game.time.events.add(tiempo, function() {

                    rotateEnemy(enemy);
                    createEnemyBlast(enemy.x, enemy.y, enemy.angle);
                    posx = player.x;
                    posy = player.y;
                    moveTo(enemyBlast, posx, posy,BLAST_VELOCITY);
                    destroyBlast(5000,enemyBlast);
                }, game);
            }


        });
    }
}

function clearGameAll(){//                                                          Elimina todo lo que hay en pantalla
    if(enemy){
        enemies.forEach(function(enemy) {

            enemy.kill();
           
        });
    }

    if(enemyBlast){
        enemieBlastList.forEach(function(enemyBlast){
            enemyBlast.kill();
        })
    }


}

function blastManagement(){//                                                       Maneja todos los disparos realizados por el jugador
    if(blast){
        blastArray.forEach(function(blast){
            destroyBlast(3000);
        })
    }
}

function manageColision(){//                                                        Maneja las colisiones
    for (let i = 0; i <= enemies.length; i++){
        if(blast){game.physics.arcade.overlap(blast, enemies[i], enemyBlastCollide, null, this);}
        game.physics.arcade.overlap(player, enemies[i], playerEnemyCollide, null, this);
    }

    if(moneda){
        for (let i = 0; i <= monedasList.length; i++){
            game.physics.arcade.overlap(player,monedasList[i], recogerMonedas, null, this);
        }
    }

    if(bullet){
        for(let i = 0; i <= bulletList.length; i++){
            game.physics.arcade.overlap(player,bulletList[i], recogerBullets, null, this);
        }
    }

    if(enemyBlast){
        for(let i = 0; i <= enemieBlastList.length; i++){
            game.physics.arcade.overlap(player,enemieBlastList[i], ataqueRecibido, null, this);
        }
    }


}



function playerMovement() {//                                                       Controla el movimiento del jugador
    // Reset player's velocity
    player.body.velocity.setTo(0);

    // Check input for movement
    if (cursors.left.isDown || buttonA.isDown) {
        // Move left
        player.body.velocity.x = -PLAYER_VELOCITY - velocidadExtra;
    }
    if (cursors.right.isDown || buttonD.isDown) {
        // Move right
        player.body.velocity.x = PLAYER_VELOCITY + velocidadExtra;
    }
    if (cursors.up.isDown || buttonW.isDown) {
        // Move up
        player.body.velocity.y = -PLAYER_VELOCITY - velocidadExtra;
    }
    if (cursors.down.isDown || buttonS.isDown) {
        // Move down
        player.body.velocity.y = PLAYER_VELOCITY + velocidadExtra;
    }
}

function endGame() {//                                                              Termina el juego
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
    clearGameAll();

    victoryAtEnd = score>=VICTORY_POINTS;

    // Final animation (a tween)
    let finalTween = game.add.tween(player.scale).to({
            x: 2,
            y: 2
        }, 1000,
        Phaser.Easing.Cubic.Out, true, 0, 2, true);

    finalTween.onComplete.add(function () {
        player.destroy();
        if (victoryAtEnd) {
            //soundVictory.play();
            game.state.start('win');
       } else {
            //soundDefeat.play();
            game.state.start('gameOver');
       }

    });



}

function createPlayer(){//                                                          Crea al jugador principal
    let x = game.world.centerX;
    let y = game.world.centerY;

    player = game.add.sprite(x, y, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    //player.enableBody = true;
}

function createBlast(){//                                                           Crea el blast del juagdor
    let x = player.x;
    let y = player.y;

    blast = game.add.sprite(x, y, 'blast');
    blast.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(blast);
    blast.body.collideWorldBounds = false;

    blast.angle = player.angle;


}

function createEnemyBlast(posx, posy, enemyAngle){//                                Crea el blast del enemigo

    enemyBlast = game.add.sprite(posx, posy, 'enemyBlast');
    enemyBlast.scale.setTo(0.75, 0.75);
    enemyBlast.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(enemyBlast);
    enemyBlast.body.collideWorldBounds = false;

    enemyBlast.angle = enemyAngle;

    enemieBlastList.push(enemyBlast);


}

function spawnMoneda(xSpawn,ySpawn){//                                              Hace aparecer una moneda donde muere un enemigo
    moneda = game.add.sprite(xSpawn, ySpawn, 'moneda');
    moneda.anchor.setTo(0.5, 0.5);
    moneda.scale.setTo(0.5, 0.5)
    game.physics.arcade.enable(moneda);
    let monedaanimation = game.add.tween(moneda.scale).to({
        x: 0.75,
        y: 0.75
    }, 1000,
    Phaser.Easing.Cubic.Out, true, 0, -1, true);

    monedasList.push(moneda);
}

function rotatePlayer(){//                                                          Permite que lel jugador rote donde aputna el ratón
    var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
        player.x, player.y,
        game.input.mousePointer.worldX, game.input.mousePointer.worldY);

      if(targetAngle < 0)
          targetAngle += 360;

    player.angle = targetAngle;
}

function createEnemy(){//                                                           Genera un enemigo en una posicion aleatoria del canvas inicial

    if(!gameOver){ //para que no se creen enemigos adicionales mientras se hace la animación de final de partida
        let x = Phaser.Math.random(50, 751);
        let y = Phaser.Math.random(50, 550);

        enemy = game.add.sprite(x, y, 'enemy');
        enemy.anchor.setTo(0.5, 0.5);
        enemy.enableBody = true;
        game.physics.arcade.enable(enemy);
        enemy.body.collideWorldBounds = true;

        rotateEnemy(enemy);
        enemies.push(enemy);
    }


}

function rotateEnemy(enemy) {//                                                     Rota el enemigo donde se encuentra el jugador
    var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
        enemy.x, enemy.y,
        player.x, player.y);

    if (targetAngle < 0)
        targetAngle += 360;

    enemy.angle = targetAngle;
}

function timeEnemy(tiempo){//                                                       Tiempo de creación de enemigos
    game.time.events.add(tiempo, function() {
        createEnemy();
        /*
        tiempoDisparo = Phaser.Math.random(1000, 5000);
        if(levelDifficulty==2){timeEnemyShoot(tiempoDisparo);}
        */
    }, game);
}

function timeEnemyShoot(tiempo){//                                                  Tiempo de creación del disparo de los enemigos
    game.time.events.add(tiempo, function() {
        enemiesShoot();
    }, game);
}

function moveTo(object, targetX, targetY, speed) {//                                Mueve el objeto seleccionado a otro indicaddo
    // Calcular el ángulo entre la posición actual del objeto y la posición objetivo
    let angle = Phaser.Math.angleBetween(object.x, object.y, targetX, targetY);

    // Calcular las componentes x e y del vector de dirección utilizando el ángulo
    let velocityX = Math.cos(angle) * speed;
    let velocityY = Math.sin(angle) * speed;

    // Asignar la velocidad al objeto para que se desplace hacia la posición objetivo
    object.body.velocity.setTo(velocityX, velocityY);
}

function disparar(){//                                                              Permite el disparo del jugador
    if(click.isDown && control == false && municionActual>0){
        createBlast();
        moveTo(blast, game.input.mousePointer.worldX, game.input.mousePointer.worldY, 500);
        control = true;
        cooldownDisparo(1000);
        destroyBlast(3000, blast);

        municionActual -= 1;

    }

}

function cooldownDisparo(tiempo){//                                                 Tiempo de recarga entre disparos
    game.time.events.add(tiempo, function() {
        control = false;
    }, game);
}

function destroyBlast(tiempo, blast){//                                             Destruye el proyectil del jugador
    game.time.events.add(tiempo, function() {
        blast.kill();
    }, game);
}

function recogerMonedas(player,moneda){//                                           Permite recoger las monedas
    moneda.kill();
    monedasList.splice(monedasList.indexOf(moneda),1);
    dineroTotal += 1;
}

function recogerBullets(player,bullet){//                                           Permite recoger la munición
    bullet.kill();
    municionActual += 1;
}

function bulletRandom(xSpawn,ySpawn){//                                             Probabilidad de que aparezca munición extra
    numeroRandom = Phaser.Math.between(0, 10);

    spawnBullet(xSpawn, ySpawn);

    if(numeroRandom >= 7){
        spawnBullet(xSpawn -100,ySpawn -100);
    }
}

function monedaRandom(xSpawn,ySpawn){//                                             Probabilidad de que aparezca munición extra
    numeroRandom = Phaser.Math.between(0, 10);

    if(numeroRandom >= 3){
        spawnMoneda(xSpawn,ySpawn);
    }
    if(numeroRandom >= 7){
        spawnMoneda(xSpawn-50,ySpawn +50);
    }
}

function spawnBullet(xSpawn, ySpawn){//                                             Aparece muniución cuando matas a un enemigo
    bullet = game.add.sprite(xSpawn +50, ySpawn +50, 'bullet');
    bullet.anchor.setTo(0.5, 0.5);
    bullet.scale.setTo(0.5, 0.5);
    game.physics.arcade.enable(bullet);
    let bulletanimation = game.add.tween(bullet.scale).to({
        x: 0.75,
        y: 0.75
    }, 1000,
    Phaser.Easing.Cubic.Out, true, 0, -1, true);

    bulletList.push(bullet);
}

function enemyBlastCollide(blast, enemy) {//                                        Tiene en cuenta el chocar del proyectil con el enemigo

    let xSpawn = enemy.x;
    let ySpawn = enemy.y;

    blast.kill();
    enemy.destroy();

    enemies.splice(enemies.indexOf(enemy),1);


    monedaRandom(xSpawn,ySpawn);
    bulletRandom(xSpawn,ySpawn);



    killCount += 1;
    //AQUI SE PONE LA PUNTUACION Y LO QUE OCURRA AL MATAR

    score = killCount*100;

}

function playerEnemyCollide(player, enemy){//                                       Tiene en cuenta la colision del enemigo y el jugador

    playerHit();
    enemy.destroy();
    enemies.splice(enemies.indexOf(enemy),1);

}

function ataqueRecibido(player,enemyBlast){//                                       Tiene en cuenta lo que ocurre al impactrar con el disparo enemigo

    playerHit();
    enemyBlast.destroy()
    enemieBlastList.splice(enemieBlastList.indexOf(enemyBlast),1);
}

function playerHit(){//                                                             Daño provocado al jugador

    playerHealth -= 1;
    if(playerHealth<=0){
        endGame();
    }
}