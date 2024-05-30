let danceRoomState = {
    preload: preloadDanceRoom,
    create: createDanceRoom,
    update: updateDanceRoom
};

let LevelDataDance;
let jsonLvlDance;
let jsonPlayerDance;
let jsonDance;

let playerDance;
let playerIdleAnimationDance;
let gameOverDance = false;
let velocidadExtraDance = 0;

//CONTROLES
let cursorsDance;
let buttonADance;
let buttonDDance;
let buttonSDance;
let buttonWDance;
let buttonSpace;
let anglePlayerDance = 0;
let cursorsShiftDance;
let buttonShiftDance;
let blastDance;
let disparoDance;
let huecoArma = 2;
let granada;
let granadaTween;

let controlDance = false;
let controlGranada = false;

function preloadDanceRoom() {
    game.load.image('background', 'assets/FondoDance.png');
    game.load.spritesheet('playerAnimation', 'assets/NaveDestruccion.png', 50, 50);
    game.load.image('blast', 'assets/proyectil.png');
    game.load.audio('Disparo', 'assets/snds/Disparo.mp3');
    game.load.image('DANCE', 'assets/DANCE.png');

    game.load.spritesheet('Granada', 'assets/granadaAliado.png', 10, 10);
    game.load.spritesheet('onda', 'assets/onda expansiva.png', 200, 200);
}

function createDanceRoom() {
    game.add.image(0, 0, 'background');

    levelDataDance = JSON.parse(game.cache.getText('levelJSON'));
    jsonLvlDance = levelDataDance.LevelData[levelDifficulty-1];
    
    jsonPlayerDance = jsonLvlDance.PLAYER;
    jsonDance = jsonLvlDance.DANCE;

    //CARGAMOS Y CONFIGURAMOS EL MUNDO
    game.world.setBounds(0, 0, 1920, 936);
    let bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
    bg.scrollFactorX = 0.7;
    bg.scrollFactorY = 0.7;

    dance = game.add.image(game.world.width/2, game.world.height/2, 'DANCE');
    game.physics.arcade.enable(dance);
    dance.anchor.setTo(0.5,0.5);

    clickDance = game.input.mousePointer;

    createPlayerDance();
    idleDance();

    game.camera.follow(playerDance, Phaser.Camera.FOLLOW_LOCKON, 1, 1);

    setTimeout(function(){game.camera.follow(playerDance, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);}, 200);


    //let soundDefeat =  game.sound.add('soundDefeat');

    cursorsDance = game.input.keyboard.createCursorKeys();
    buttonWDance = game.input.keyboard.addKey(Phaser.Keyboard.W);
    buttonADance = game.input.keyboard.addKey(Phaser.Keyboard.A);
    buttonSDance = game.input.keyboard.addKey(Phaser.Keyboard.S);
    buttonDDance = game.input.keyboard.addKey(Phaser.Keyboard.D);
    buttonSpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    buttonShiftDance = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

}

function updateDanceRoom(){


    if (gameOverDance) {
        return;
    }
    else if(paused){
        return;
    }
    else{

        if(buttonShiftDance.isDown){
            velocidadExtraDance = jsonDance.velocidadExtra;
        }
        else{
            velocidadExtraDance = 0;
        }

        if (buttonSpace.isDown && !espacioPresionado) {
            // Cambiar el arma
            if (huecoArma == 1) {
                huecoArma = 2;
            } else {
                huecoArma = 1;
            }
    
            // Marcar la acción como ejecutada
            espacioPresionado = true;
        }
    
        // Si el botón de espacio no está siendo presionado, restablecer la variable de estado
        if (buttonSpace.isUp) {
            espacioPresionado = false;
        }

        //EN CUALQUIER MOMENTO
        playerMovementDance(); //            Se nueve el jugador
        rotatePlayerDance();//               El jugador rota

        if(huecoArma == 1){
            dispararDance();//               Disparo del jugado
        }
        else{
            dispararGranada();
        }


        //manageColision();//             Tiene en cuenta la colisión del jugador




        /*
        //Si hay un enemigo
        if(enemy){
            enemies.forEach(function(enemy){
                rotateEnemy(enemy);
            });

        }

        if(enemyCuadrado){
            enemiesCuadrado.forEach(function(enemyCuadrado){
                rotateEnemy(enemyCuadrado);
            });

        }

        //APARICIÓN DE ENEMIGOS
        contador++;
        if(contador == 200){
            timeEnemy(2000);//          Tiempo de reaparición de enemigo
            timeEnemyCuadrado(4000);
            contador = 0;
        };

        if(levelDifficulty >= 2){

            contador2++;
            if(contador == 50){
                timeEnemyShoot(0);//    Tiempo para que disparen los enemigos
                timeEnemyShootCuadrado(100);
                contador2 = 0;
        };
        }

        //----------------------------------------------------------------------------------



        //NIVEL DE DIFICULTAD 1-------------------------------------------------------------
        if(levelDifficulty == 1 || levelDifficulty == 3){
            enemiesMovement();//        El enemigo se mueve hacia el jugador
        }
        //----------------------------------------------------------------------------------
        */
    }

}


function createPlayerDance(){//                                                          Crea al jugador principal
    let x = game.world.centerX;
    let y = jsonPlayerDance.yDance;

    playerDance = game.add.sprite(x, y, 'playerAnimation', 0);
    playerDance.anchor.setTo(0.5, 0.5);
    playerDance.scale.setTo(0.5, 0.5);

    game.physics.arcade.enable(playerDance);
    playerDance.body.collideWorldBounds = true;
    //player.enableBody = true;
}

function idleDance(){

    playerIdleAnimationDance = game.add.tween(playerDance.scale).to({
        x: 0.65,
        y: 0.65
        }, 2000,
        Phaser.Easing.Cubic.Out, true, 0, -1, true);

}

function playerMovementDance() {//                                                       Controla el movimiento del jugador
    // Reset player's velocity
    playerDance.body.velocity.setTo(0);

    // Check input for movement
    if (cursorsDance.left.isDown || buttonADance.isDown) {
        // Move left
        console.log('Izquierda');
        playerDance.body.velocity.x = -jsonPlayerDance.velocity - velocidadExtraDance;
    }
    if (cursorsDance.right.isDown || buttonDDance.isDown) {
        // Move right
        playerDance.body.velocity.x = jsonPlayerDance.velocity + velocidadExtraDance;
    }
    if (cursorsDance.up.isDown || buttonWDance.isDown) {
        // Move up
        playerDance.body.velocity.y = -jsonPlayerDance.velocity - velocidadExtraDance;
    }
    if (cursorsDance.down.isDown || buttonSDance.isDown) {
        // Move down
        playerDance.body.velocity.y = jsonPlayerDance.velocity + velocidadExtraDance;
    }
}

function rotatePlayerDance(){//                                                          Permite que lel jugador rote donde aputna el ratón
    var targetAngleDance = (360 / (2 * Math.PI)) * game.math.angleBetween(
        playerDance.x, playerDance.y,
        game.input.mousePointer.worldX, game.input.mousePointer.worldY);

      if(targetAngleDance < 0)
          targetAngleDance += 360;

    playerDance.angle = targetAngleDance;
}

function dispararDance(){//                                                              Permite el disparo del jugador
    if(clickDance.isDown && controlDance == false){
        game.camera.shake(0.0025);
        createBlastDance();
        moveTo(blastDance, game.input.mousePointer.worldX, game.input.mousePointer.worldY, 500);
        controlDance = true;
        cooldownDisparoDance(1000);
        destroyBlastDance(3000, blastDance);

    }

}

function createBlastDance(){//                                                           Crea el blast del juagdor
    let x = playerDance.x;
    let y = playerDance.y;

    blastDance = game.add.sprite(x, y, 'blast');
    blastDance.anchor.setTo(0.5, 0.5);
    blastDance.scale.setTo(0.5, 0.5);
    game.physics.arcade.enable(blastDance);
    blastDance.body.collideWorldBounds = false;

    blastDance.angle = playerDance.angle;

    disparoDance = game.sound.add('Disparo');
    disparoDance.volume = 0.75;
    disparoDance.play();
}

function cooldownDisparoDance(tiempo){//                                                 Tiempo de recarga entre disparos
    game.time.events.add(tiempo, function() {

        controlDance = false;

    }, game);
}

function cooldownGranada(tiempo){//                                                 Tiempo de recarga entre disparos
    game.time.events.add(tiempo, function() {
        controlGranada = false;

    }, game);
}

function destroyBlastDance(tiempo, blast){//                                             Destruye el proyectil del jugador
    game.time.events.add(tiempo, function() {
        blast.kill();
    }, game);
}


//function manageColision(){//         
    /*                                               Maneja las colisiones
    for (let i = 0; i <= enemies.length; i++){
        if(blast){game.physics.arcade.overlap(blast, enemies[i], enemyBlastCollide, null, game);}
        game.physics.arcade.overlap(player, enemies[i], playerEnemyCollide, null, game);
    }
    */

    /*
    if(moneda){
        for (let i = 0; i <= monedasList.length; i++){
            game.physics.arcade.overlap(player,monedasList[i], recogerMonedas, null, game);
        }
    }
    */
//}

function dispararGranada(){
    if(clickDance.isDown && controlGranada == false){

        posx = 250 * 1;
        posy = 250 * 1;

        game.camera.shake(0.0025);
        createGranada();
        moveTo(granada, game.input.mousePointer.worldX, game.input.mousePointer.worldY, 250);
        controlGranada = true;
        cooldownGranada(3500);
        destroyBlastDance(3000, granada);

        setTimeout(function() {
            granadaResiduo = createGranadaResiduo(granada.x, granada.y);
            setTimeout(function() {
                granadaResiduo.destroy();

                onda = game.add.sprite(granada.x, granada.y, 'onda');
                onda.anchor.setTo(0.5, 0.5);
                onda.scale.setTo(0.75, 0.75);

                onda.animations.add('onda');
                onda.animations.play('onda', 15, false, true);


            }, 2000);
        }, 1000);

    }
}

function createGranada(){//                                                           Crea el blast del juagdor
    let x = playerDance.x;
    let y = playerDance.y;

    granada = game.add.sprite(x, y, 'Granada');
    granada.anchor.setTo(0.5, 0.5);
    granada.scale.setTo(2, 2);
    granada.animations.add('Granada');
    granada.animations.play('Granada', 7, false, true);


    game.physics.arcade.enable(granada);
    granada.body.collideWorldBounds = false;

    granada.angle = playerDance.angle;

    disparoDance = game.sound.add('Disparo');
    disparoDance.volume = 0.75;
    disparoDance.play();
}

function createGranadaResiduo(x, y){//                                                           Crea el blast del juagdor

    granada = game.add.sprite(x, y, 'Granada', 1);
    granada.anchor.setTo(0.5, 0.5);
    granada.scale.setTo(2, 2);

    game.physics.arcade.enable(granada);
    granada.body.collideWorldBounds = false;

    return granada;
}