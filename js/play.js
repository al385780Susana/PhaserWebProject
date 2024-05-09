

// VAriables CONSTANTES


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
let textoFondo;
let playerIdleAnimation;
let estar;
let contadorZS;
let compraVelocidad;
let valorEscudo;
let valorSprint;
let valorSuerte;
let mejoraSuerteCompra;


let LevelData;


//CARGAR IMAGENES
function loadAssets() {
//Info nivel
    game.load.text('levelJSON','assets/levelData/levelData.json');

    //game.load.image('sky', 'assets/sky.png');
    game.load.spritesheet('playerAnimation', 'assets/NaveDestruccion.png', 50, 50);
    game.load.spritesheet('explosion', 'assets/explosion.png', 50, 50);
    game.load.spritesheet('explosionEnemy', 'assets/explosionEnemigo.png', 50, 50);
    game.load.image('player','assets/nave_inicial_0.png' );
    game.load.image('barreraPrueba', 'assets/barreraPrueba.png');
    game.load.atlas('playerAtlas','assets/naveDestruccion.png');
    game.load.image('enemy', 'assets/enemigo.png');
    game.load.image('moneda','assets/moneda.png' );
    game.load.image('blast', 'assets/proyectil.png');
    game.load.image('bullet', 'assets/municion.png');
    game.load.image('bulletHUD', 'assets/municionHUD.png');
    game.load.image('monedaHUD', 'assets/monedaHUD.png');
    game.load.image('enemyBlast', 'assets/proyetilEnemigo.png');
    game.load.image('fondoGrande', 'assets/fondoGrande.png');
    game.load.image('muroZonaSegura', 'assets/muroSafeZone.png');
    game.load.image('techoZonaSegura', 'assets/techoSafeZone.png');
    game.load.image('mejoraEscudo', 'assets/escudo.png');
    game.load.image('mejoraSuerte', 'assets/trebol.png');
    game.load.image('mejoraSprint', 'assets/velocidad.png');
    game.load.audio('soundDefeat', 'assets/snds/wrong.mp3');
    game.load.audio('laser', 'assets/snds/laser.mp3');
    game.load.audio('menu', 'assets/snds/menu.mp3');
    game.load.audio('stage', 'assets/snds/stage.mp3');

}


//INICIO DEL JUEGO

function initialiseGame() {

    levelData = JSON.parse(game.cache.getText('levelJSON'));

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //CARGAMOS Y CONFIGURAMOS EL MUNDO
    game.world.setBounds(0, 0, 1920, 1080);
    let bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'fondoGrande');
    bg.scrollFactorX = 0.7;
    bg.scrollFactorY = 0.7;
    //CARGAMOS LOS ASSETS EN EL JUEGO

    //game.add.sprite(0,0,'sky');
    textoFondo = game.add.text(400, 300, killCount, { font: '04B_19', fontSize: '100px', fill: '#009099' });
    textoFondo.anchor.setTo(0.5);
    bulletHUD = game.add.sprite(725,525, 'bulletHUD');
    bulletHUD.scale.setTo(1.5);
    monedaHUD = game.add.sprite(0,525, 'monedaHUD');
    monedaHUD.scale.setTo(1.5);

    //MEJORAS
    mejoraEscudoTexto = game.add.text(1045, 1000, '5' , { font: '04B_19', fontSize: '30px', fill: '#ffffff' });
    mejoraEscudo = game.add.sprite(1053, 980, 'mejoraEscudo');
    mejoraEscudo.anchor.setTo(0.5, 0.5);
    mejoraEscudo.scale.setTo(0.75,0.75);
    game.physics.arcade.enable(mejoraEscudo);

    mejoraSprintTexto = game.add.text(1145, 1000, '10', { font: '04B_19', fontSize: '30px', fill: '#ffffff' });
    mejoraSprint = game.add.sprite(1159, 980, 'mejoraSprint');
    mejoraSprint.anchor.setTo(0.5, 0.5);
    mejoraSprint.scale.setTo(0.85,0.85);
    game.physics.arcade.enable(mejoraSprint);

    mejoraSuerteTexto = game.add.text(1245, 1000, '15', { font: '04B_19', fontSize: '30px', fill: '#ffffff' });
    mejoraSuerte = game.add.sprite(1259, 980, 'mejoraSuerte');
    mejoraSuerte.anchor.setTo(0.5, 0.5);
    mejoraSuerte.scale.setTo(0.75,0.75);
    game.physics.arcade.enable(mejoraSuerte);


    barreraPrueba = game.add.sprite(600, 200, 'barreraPrueba');
    game.physics.arcade.enable(barreraPrueba);
    barreraPrueba.body.immovable = true;

    muroSeguro = game.add.sprite(960,880, 'muroZonaSegura');
    muroSeguro.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(muroSeguro);
    muroSeguro.body.immovable = true;

    muroSeguro2 = game.add.sprite(1360,880, 'muroZonaSegura');
    muroSeguro2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(muroSeguro2);
    muroSeguro2.body.immovable = true;

    techoSeguro = game.add.sprite(1160,680, 'techoZonaSegura');
    techoSeguro.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(techoSeguro);
    techoSeguro.body.immovable = true;


    monedaHUD.fixedToCamera = true;
    bulletHUD.fixedToCamera = true;
    textoFondo.fixedToCamera = true;
    estar = false;
    compraVelocidad = false;

    let soundDefeat =  game.sound.add('soundDefeat');


    createPlayer();
    idle();

    //CAMERA
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.01, 0.01);

    //DAMOS LOS VALORES
    playerHealth = levelData.LevelData[levelDifficulty-1].PLAYER_HEALTH;
    click = game.input.mousePointer;

    //LISTAS
    monedasList = [];
    bulletList = [];
    enemieBlastList = [];
    enemies = [];

    //NUMERICO
    municionActual = levelData.LevelData[levelDifficulty-1].MUNICION_INICIAL;
    contador = 0;
    contador2 = 0;
    dineroTotal = 0;
    killCount = 0;
    score = 0;
    valorEscudo = 5;
    valorSprint = 10;
    valorSuerte = 2;
    mejoraSuerteCompra = 0;

    //BOOL
    control = false;

    //CREACION DE ENEMIGOS
    timeEnemy(3000);

    //HUD---------------------------------------------------------------
    dineroTotalText = game.add.text(65, GAME_STAGE_HEIGHT - 50,
        dineroTotal, {
            font: '04B_19',
            fontSize: '32px',
            fill: '#fff'
        });

    dineroTotalText.fixedToCamera = true;

    bulletTotalText = game.add.text(700, GAME_STAGE_HEIGHT - 50,
        municionActual, {
            font: '04B_19',
            fontSize: '32px',
            fill: '#fff'
        });

    bulletTotalText.fixedToCamera = true;
    //------------------------------------------------------------------


    //CONTROLES
    cursors = game.input.keyboard.createCursorKeys();
    buttonW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    buttonA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    buttonS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    buttonD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    buttonShift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);



}


// REFRESCO DE PANTALLA A CADA FRAME

function gameUpdate() {

    if (gameOver) {
        return;
    }
    else{

        if(buttonShift.isDown && compraVelocidad == true){
            velocidadExtra = 150;
        }
        else{
            velocidadExtra = 0;
        }

        //EN CUALQUIER MOMENTO
        playerMovement(); //            Se nueve el jugador
        rotatePlayer();//               El jugador rota
        inSafeZone();

        if(estar == false){
            disparar();//               Disparo del jugador

        }

        manageColision();//             Tiene en cuenta la colisión del jugador
        updateText();//                 Actualiza los valores de municion y dinero.

        abrirBarrera();




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
        textoFondo.setText(killCount);
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
            distanciaJugador = Phaser.Math.distance(player.x,player.y, enemy.x,enemy.y);
           if(distanciaJugador<=levelData.LevelData[levelDifficulty-1].RANGO_PERSECUCION){
                moveTo(enemy,player.x, player.y,levelData.LevelData[levelDifficulty-1].ENEMY_VELOCITY);
           }
        }
        else { moveTo(enemy,player.x, player.y,levelData.LevelData[levelDifficulty-1].ENEMY_VELOCITY);}

    });
}

function inSafeZone(){
    if( 957 <= player.x && player.x <= 1351 && player.y >= 681){
        estar = true;
        console.log('Esta dentro de la ZS');

        if (!contadorZS) {


            contadorZS = game.time.events.add(Phaser.Timer.SECOND * 10, function() {
                clearGameAll();
                endGame();
            }, this);

            game.time.events.add(Phaser.Timer.SECOND * 7, function() {
                console.log('Alarm');
            }, this);
        }



    }
    else{
        estar = false;
        console.log('NO ESTA DENTRO DE ZS');


        if (contadorZS) {
            game.time.events.remove(contadorZS);
            contadorZS = null; // Reiniciar el contador
        }

    }

}

function idle(){

    playerIdleAnimation = game.add.tween(player.scale).to({
        x: 1.25,
        y: 1.25
        }, 2000,
        Phaser.Easing.Cubic.Out, true, 0, -1, true);

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
                    moveTo(enemyBlast, posx, posy,levelData.LevelData[levelDifficulty-1].BLAST_VELOCITY);
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
            game.physics.arcade.collide(player,enemieBlastList[i], ataqueRecibido, null, this);
            game.physics.arcade.collide(techoSeguro, enemieBlastList[i], function() {destroyEnemyBlast(enemieBlastList[i]); }, null, this);
            game.physics.arcade.collide(muroSeguro, enemieBlastList[i], function() {destroyEnemyBlast(enemieBlastList[i]); }, null, this);
            game.physics.arcade.collide(muroSeguro2, enemieBlastList[i], function() {destroyEnemyBlast(enemieBlastList[i]); }, null, this);
        }
    }

    if(enemy){
        for(let i = 0; i <= enemies.length; i++){
            game.physics.arcade.collide(techoSeguro, enemies[i]);
            game.physics.arcade.collide(muroSeguro, enemies[i]);
            game.physics.arcade.collide(muroSeguro2, enemies[i]);
        }
    }

    if(game.physics.arcade.overlap(player, mejoraEscudo)){

        if(dineroTotal >= valorEscudo){
            mejoraEscudo.kill();
            mejoraEscudoTexto.kill();
            dineroTotal -= valorEscudo;
        }

        /*
        game.time.events.add(Phaser.Timer.SECOND * 3, function() {
            console.log('Mejora de escudo');
            mejoraEscudo.kill();
            mejoraEscudoTexto.kill();
        }, this);
        */
    }

    if(game.physics.arcade.overlap(player, mejoraSprint)){

        if(dineroTotal >= valorSprint){
            mejoraSprint.kill();
            mejoraSprintTexto.kill();
            dineroTotal -= valorSprint;
            compraVelocidad = true;
        }

        /*
        game.time.events.add(Phaser.Timer.SECOND * 3, function() {
            console.log('Mejora de Sprint');
            mejoraSprint.kill();
            mejoraSprintTexto.kill();
            compraVelocidad = true;
        }, this);
        */
    }

    if(game.physics.arcade.overlap(player, mejoraSuerte)){

        if(dineroTotal >= valorSuerte){
            mejoraSuerte.kill();
            mejoraSuerteTexto.kill();
            dineroTotal -= valorSuerte;
            mejoraSuerteCompra = 5;
        }

        /*
        game.time.events.add(Phaser.Timer.SECOND * 3, function() {
            console.log('Mejora de Suerte');
            mejoraSuerte.kill();
            mejoraSuerteTexto.kill()
        }, this);
        */
    }


    game.physics.arcade.collide(player, barreraPrueba);




}

function playerMovement() {//                                                       Controla el movimiento del jugador
    // Reset player's velocity
    player.body.velocity.setTo(0);

    // Check input for movement
    if (cursors.left.isDown || buttonA.isDown) {
        // Move left
        player.body.velocity.x = -levelData.LevelData[levelDifficulty-1].PLAYER_VELOCITY - velocidadExtra;
    }
    if (cursors.right.isDown || buttonD.isDown) {
        // Move right
        player.body.velocity.x = levelData.LevelData[levelDifficulty-1].PLAYER_VELOCITY + velocidadExtra;
    }
    if (cursors.up.isDown || buttonW.isDown) {
        // Move up
        player.body.velocity.y = -levelData.LevelData[levelDifficulty-1].PLAYER_VELOCITY - velocidadExtra;
    }
    if (cursors.down.isDown || buttonS.isDown) {
        // Move down
        player.body.velocity.y = levelData.LevelData[levelDifficulty-1].PLAYER_VELOCITY + velocidadExtra;
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

    victoryAtEnd = score>=levelData.LevelData[levelDifficulty-1].VICTORY_POINTS;

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

    player = game.add.sprite(x, y, 'playerAnimation', 0);
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(1, 1);

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

        let x = Phaser.Math.random(50, 1870);
        let y = Phaser.Math.random(50, 1030);

        while(957 <= x <= 1351 && y >= 681){
            x = Phaser.Math.random(50, 1870);
            y = Phaser.Math.random(50, 1030);
        }


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
    numeroRandom = Phaser.Math.between(0, levelData.LevelData[levelDifficulty-1].SUERTE + mejoraSuerteCompra);

    spawnBullet(xSpawn, ySpawn);

    if(numeroRandom >= 7){
        spawnBullet(xSpawn -100,ySpawn -100);
    }
}

function monedaRandom(xSpawn,ySpawn){//                                             Probabilidad de que aparezca munición extra
    numeroRandom = Phaser.Math.between(0, levelData.LevelData[levelDifficulty-1].SUERTE + mejoraSuerteCompra);

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
    explosionEnemy(enemy);

    enemies.splice(enemies.indexOf(enemy),1);


    monedaRandom(xSpawn,ySpawn);
    bulletRandom(xSpawn,ySpawn);



    killCount += 1;
    //AQUI SE PONE LA PUNTUACION Y LO QUE OCURRA AL MATAR

    score = killCount*100;

}

function explosionEnemy(enemy){
    explosionEnemigo = game.add.sprite(enemy.x, enemy.y, 'explosionEnemy');
    explosionEnemigo.anchor.setTo(0.5, 0.5);
    explosionEnemigo.scale.setTo(2, 2);

    explosionEnemigo.animations.add('daño');
    explosionEnemigo.animations.play('daño', 15, false, true);
}

function explosionPlayer(){
    explosion = game.add.sprite(player.x, player.y, 'explosion');
    explosion.anchor.setTo(0.5, 0.5);
    explosion.scale.setTo(2,2)

    explosion.animations.add('daño');
    explosion.animations.play('daño', 15, false, true);
}

function playerEnemyCollide(player, enemy){//                                       Tiene en cuenta la colision del enemigo y el jugador

    playerHit();
    enemy.destroy();
    explosionEnemy(enemy);
    enemies.splice(enemies.indexOf(enemy),1);

}

function ataqueRecibido(player,enemyBlast){//                                       Tiene en cuenta lo que ocurre al impactrar con el disparo enemigo

    playerHit();
    destroyEnemyBlast(enemyBlast);
}

function destroyEnemyBlast(enemyBlast){
    enemyBlast.kill()
    enemieBlastList.splice(enemieBlastList.indexOf(enemyBlast),1);
}

function playerHit(){//                                                             Daño provocado al jugador

    playerHealth -= 1;

    explosionPlayer();

    if(playerHealth<=0){
        endGame();
    }
    else if(playerHealth == levelData.LevelData[levelDifficulty-1].PLAYER_HEALTH/2){
        //Herido
        player.frame = 1;

    }
    else if(playerHealth == 2){
        //Muy herido
        player.frame = 2;

    }
    else if(playerHealth==1){
        player.frame = 3;
        //Moribundo
    }
}

function abrirBarrera(){
    if(killCount == 5){
        barreraPrueba.kill();
    }
}