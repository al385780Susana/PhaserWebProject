let danceRoomState = {
    preload: preloadDanceRoom,
    create: createDanceRoom,
    update: updateDanceRoom
};


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
let rotationSpeed = 50;
let danceVulnerable = false;
let protectoresVivos;
let orbe1Existe = false;
let orbe2Existe = false;
let orbe3Existe = false;
let orbe4Existe = false;

let controlDance = false;
let controlGranada = false;

function preloadDanceRoom() {
    game.load.image('background', 'assets/FondoDance.png');
    game.load.spritesheet('playerAnimation', 'assets/NaveDestruccion.png', 50, 50);
    game.load.image('blast', 'assets/proyectil.png');
    game.load.audio('Disparo', 'assets/snds/Disparo.mp3');
    game.load.image('DANCE', 'assets/DANCE.png');
    game.load.image('hitbox', 'assets/-portal.png');

    game.load.spritesheet('Granada', 'assets/granadaAliado.png', 10, 10);
    game.load.spritesheet('onda', 'assets/onda expansiva.png', 200, 200);
    game.load.image('laser', 'assets/laserImagenSola.png');
    game.load.spritesheet('laserAnimacion', 'assets/LaserEnemigo.png', 2200, 100);
}

function createDanceRoom() {
    game.add.image(0, 0, 'background');


    //CARGAMOS Y CONFIGURAMOS EL MUNDO
    game.world.setBounds(0, 0, 1920, 936);
    let bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
    bg.scrollFactorX = 0.7;
    bg.scrollFactorY = 0.7;


    orbe5 = game.add.sprite(game.world.width/2, game.world.height/2, 'hitbox');
    orbe5.anchor.setTo(0.5, 0.5);
    boss = game.add.sprite(game.world.width/2, game.world.height/2, 'DANCE');
    boss.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(orbe5);
    orbe5.body.collideWorldBounds = false;

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

    laserDance();
    spawnOrbes();

}

function updateDanceRoom(){


    if (gameOverDance) {
        return;
    }
    else{

        if(buttonShiftDance.isDown){
            velocidadExtraDance = 80;
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

        protectoresEstado();

        manageColisionDance();//             Tiene en cuenta la colisión del jugador




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
    let y = 900;

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
        playerDance.body.velocity.x = -150 - velocidadExtraDance;
    }
    if (cursorsDance.right.isDown || buttonDDance.isDown) {
        // Move right
        playerDance.body.velocity.x = 150 + velocidadExtraDance;
    }
    if (cursorsDance.up.isDown || buttonWDance.isDown) {
        // Move up
        playerDance.body.velocity.y = -150 - velocidadExtraDance;
    }
    if (cursorsDance.down.isDown || buttonSDance.isDown) {
        // Move down
        playerDance.body.velocity.y = 150 + velocidadExtraDance;
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


function manageColisionDance(){
    /*
    for (let i = 0; i <= enemies.length; i++){
        if(blast){game.physics.arcade.overlap(blast, enemies[i], enemyBlastCollide, null, game);}
        game.physics.arcade.overlap(player, enemies[i], playerEnemyCollide, null, game);
    }
    */

    if(orbe1){
        if(blastDance){game.physics.arcade.overlap(blastDance,orbe1, function(){orbe1.kill(); blastDance.kill(); orbe1Existe = false; console.log('Orbe1 fuera');}, null, game);
        }
        if(granada){game.physics.arcade.overlap(granada,orbe1, function(){orbe1.kill(); orbe1Existe = false;}, null, game);
        }

    }
    if(orbe2){
        if(blastDance){game.physics.arcade.overlap(blastDance,orbe2, function(){orbe2.kill(); blastDance.kill(); orbe2Existe = false;console.log('orbe2 fuera')}, null, game);
        }
        if(granada){game.physics.arcade.overlap(granada,orbe2, function(){orbe2.kill(); orbe2Existe = false;}, null, game);
        }
    }
    if(orbe3){
        if(blastDance){game.physics.arcade.overlap(blastDance,orbe3, function(){orbe3.kill(); blastDance.kill(); orbe3Existe = false; console.log('orbe3 fuera');}, null, game);
        }
        if(granada){game.physics.arcade.overlap(granada,orbe3, function(){orbe3.kill(); orbe3Existe = false;}, null, game);
        }
    }
    if(orbe4){
        if(blastDance){game.physics.arcade.overlap(blastDance,orbe4, function(){orbe4.kill(); blastDance.kill(); orbe4Existe = false; console.log('orbe4 fuera');}, null, game);
        }
        if(granada){game.physics.arcade.overlap(granada,orbe4, function(){orbe4.kill(); orbe4Existe = false;}, null, game);
        }
    }

    if (!orbe1Existe && !orbe2Existe && !orbe3Existe && !orbe4Existe) {
        console.log('Todos los orbes destrozados');
        protectoresVivos = false;
    }

    if(orbe5 && danceVulnerable){
        if(blastDance){game.physics.arcade.overlap(blastDance,orbe5, function(){orbe5.kill(); boss.kill(); blastDance.kill();}, null, game);
        }
        if(granada){game.physics.arcade.overlap(granada,orbe5, function(){orbe5.kill(); boss.kill();}, null, game);
        }
    }

}

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


function laserDance(){

    laser = game.add.sprite(game.world.width/2, game.world.height/2, 'laser');
    laser.anchor.setTo(0.5, 0.5);
    laser.angle = 45;
    laser.alpha = 0;
    var tween1 = game.add.tween(laser).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    
    //laser.scale.setTo(0.5,0.5);
    /*
    laser.animations.add('laserAnimacion');
    laser.animations.play('laserAnimacion', 12, true, false);
    */
    laser2 = game.add.sprite(game.world.width/2, game.world.height/2, 'laser');
    laser2.anchor.setTo(0.5, 0.5);
    laser2.angle = 135;
    laser2.alpha = 0;
    var tween2 = game.add.tween(laser2).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

    rotarLaser();
}

function rotarLaser(){

    game.time.events.loop(Phaser.Timer.SECOND / 60, function() {
        laser.angle += rotationSpeed / 60; // Actualizar el ángulo del láser
    }, this);

    game.time.events.loop(Phaser.Timer.SECOND / 60, function() {
        laser2.angle += rotationSpeed / 60; // Actualizar el ángulo del láser
    }, this);

    tiempoLaser = game.time.events.add(Phaser.Timer.SECOND * 5, function() {
        var tween1 = game.add.tween(laser).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        var tween2 = game.add.tween(laser2).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);

        tiempoLaser = game.time.events.add(Phaser.Timer.SECOND * 1, function() {
            laser.kill();
            laser2.kill();

        }, game);
    }, game);
}

function protectoresEstado(){

    if((!orbe1Existe && !orbe2Existe && !orbe3Existe && !orbe4Existe)){
        console.log('Protectores muertos, dance debil');
        danceVulnerable = true;
        //FALTA MANAGE COLLISION
        vulnerabilidad = game.time.events.add(Phaser.Timer.SECOND * 10, function() {
            //DANCE VULNERABLE
            if((!orbe1Existe && !orbe2Existe && !orbe3Existe && !orbe4Existe)){
                console.log('Dance vuelve a la carga');


                protectoresVivos = true;
                danceVulnerable = false;

                spawnOrbes();
            }


        }, game);
    }
    else{
        console.log('Protectores vivos');
    }
}

function spawnOrbes(){

    console.log('Protectores creados');

    orbe1Existe = true;
    orbe2Existe = true;
    orbe3Existe = true;
    orbe4Existe = true;

    orbe1 = game.add.sprite(100, 100, 'DANCE');
    orbe1.anchor.setTo(0.5, 0.5);
    orbe1.scale.setTo(0.25, 0.25);
    game.physics.arcade.enable(orbe1);
    orbe1.body.collideWorldBounds = false;

    orbe2 = game.add.sprite(game.world.width - 100, 100, 'DANCE');
    orbe2.anchor.setTo(0.5, 0.5);
    orbe2.scale.setTo(0.25, 0.25);
    game.physics.arcade.enable(orbe2);
    orbe2.body.collideWorldBounds = false;

    orbe3 = game.add.sprite(100, game.world.height - 100, 'DANCE');
    orbe3.anchor.setTo(0.5, 0.5);
    orbe3.scale.setTo(0.25, 0.25);
    game.physics.arcade.enable(orbe3);
    orbe3.body.collideWorldBounds = false;

    orbe4 = game.add.sprite(game.world.width - 100, game.world.height - 100, 'DANCE');
    orbe4.anchor.setTo(0.5, 0.5);
    orbe4.scale.setTo(0.25, 0.25);
    //orbe4.alpha = 0;
    //var tween4 = game.add.tween(orbe4).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    game.physics.arcade.enable(orbe4);
    orbe4.body.collideWorldBounds = false;
}





