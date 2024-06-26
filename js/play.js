

// VAriables CONSTANTES


let levelDifficulty = 3;
let gameOver = false;
let paused = false;
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
let enemyCuadrado;
let enemiesCuadrado;
let enemies;
let blast;
let moneda;
let monedasList;
let bullet;
let bulletList;
let alarma;


let recargaMunicion;
let recargaMunicion2;
let recargaMunicion3;

let enemyBlast;
let enemyGranada;
let enemieBlastList;
let enemieGranadaList;

let municionActual;
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

let mejoraSuerteCompra;
let corazonList;
let corazon;
let puedeComprar = true;
let persecucion;
let alarmaSonido;

//JSON
let LevelData;
let jsonLvl;

let jsonPlayer;
let jsonEnemy;

let jsonBarr;
let jsonMuro;
let jsonTecho;

let jsonTextoFondo;
let jsonBulletHUD;
let jsonMonedaHUD;
let jsonRecarga;
let jsonDificultadHUD;

let jsonCorazon;
let jsonSprint;
let jsonSuerte;
let jsonEscudo;
let jsonPortal;

let enemyVelocity;


//CARGAR IMAGENES
function loadAssets() {
//Info nivel
    game.load.text('levelJSON','assets/levelData/levelData.json');

    game.load.spritesheet('playerAnimation', 'assets/NaveDestruccion.png', 50, 50);
    game.load.spritesheet('explosion', 'assets/explosion.png', 50, 50);
    game.load.spritesheet('granada', 'assets/granada.png', 10, 10);
    game.load.spritesheet('explosionEnemy', 'assets/explosionEnemigo.png', 50, 50);
    game.load.spritesheet('onda', 'assets/onda expansiva.png', 200, 200);
    game.load.spritesheet('barreraMapa', 'assets/barreraMapa.png', 1920, 30);
    game.load.spritesheet('enemigoAnimacion', 'assets/enemigoanimation.png', 50, 50);
    game.load.spritesheet('portal', 'assets/portal.png', 200, 200);
    game.load.spritesheet('estela', 'assets/EstelaFinal.png', 50, 50);

    game.load.image('player','assets/nave_inicial_0.png' );
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
    game.load.image('corazon', 'assets/corazon.png');
    game.load.image('recarga', 'assets/recargaMunicion.png');
    game.load.image('enemigoCuadrado', 'assets/enemigoCuadrado.png');
    game.load.image('alarma', 'assets/peligro.png');
    game.load.image('dificultad1', 'assets/dificultad1.png');
    game.load.image('dificultad2', 'assets/dificultad2.png');
    game.load.image('dificultad3', 'assets/dificultad3.png');

    game.load.audio('Muerte', 'assets/snds/Muerte.mp3');
    game.load.audio('Disparo', 'assets/snds/Disparo.mp3');
    game.load.audio('DisparoEnemigo', 'assets/snds/DisparoEnemigo.mp3');
    game.load.audio('RecogerMoneda', 'assets/snds/Moneda.mp3');
    game.load.audio('RecogerBala', 'assets/snds/BalasCaidas.mp3');
    game.load.audio('MusicaJuego', 'assets/snds/MusicaJuego.mp3');
    game.load.audio('Alarma', 'assets/snds/Alarma.mp3');
}


//INICIO DEL JUEGO

function initialiseGame() {

    levelData = JSON.parse(game.cache.getText('levelJSON'));
    jsonLvl = levelData.LevelData[levelDifficulty-1];
    
    jsonPlayer = jsonLvl.PLAYER;
    jsonEnemy = jsonLvl.ENEMY;


    enemyVelocity = jsonEnemy.velocity;

    musicaFondo = game.sound.add('MusicaJuego');
    musicaFondo.volume = jsonLvl.CONFIG.MUSIC_VOL;
    musicaFondo.loop = true;
    musicaFondo.play();



    game.physics.startSystem(Phaser.Physics.ARCADE);
    //CARGAMOS Y CONFIGURAMOS EL MUNDO
    game.world.setBounds(0, 0, jsonLvl.CONFIG.GAME_WORLD.w,  jsonLvl.CONFIG.GAME_WORLD.h);
    let bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'fondoGrande');
    bg.scrollFactorX = jsonLvl.CONFIG.SCROLL_FACTOR;
    bg.scrollFactorY = jsonLvl.CONFIG.SCROLL_FACTOR;

    //CARGAMOS LOS ASSETS EN EL JUEGO
    jsonTextoFondo = jsonLvl.TEXTO_FONDO;
    jsonBulletHUD = jsonLvl.BULLET_HUD;
    jsonMonedaHUD = jsonLvl.MONEDA_HUD;

    textoFondo = game.add.text(jsonTextoFondo.x, jsonTextoFondo.y, killCount, { font: jsonTextoFondo.font, fontSize: jsonTextoFondo.fontSize, fill: jsonTextoFondo.color });
    textoFondo.alpha = jsonTextoFondo.alpha;
    textoFondo.anchor.setTo(jsonTextoFondo.anchor);

    bulletHUD = game.add.sprite(jsonBulletHUD.sprite.x,jsonBulletHUD.sprite.y, 'bulletHUD');
    bulletHUD.scale.setTo(jsonBulletHUD.sprite.scale);

    monedaHUD = game.add.sprite(jsonMonedaHUD.sprite.x,jsonMonedaHUD.sprite.y, 'monedaHUD');
    monedaHUD.scale.setTo(jsonMonedaHUD.sprite.scale);



    //RECARGA MUNICIÓN
    jsonRecarga = jsonLvl.RECARGA_MUNICION;
    recargaMunicion = game.add.sprite(jsonRecarga.x0, jsonRecarga.y0 , 'recarga');
    recargaMunicion.anchor.setTo(jsonRecarga.anchor);
    recargaMunicion.scale.setTo(jsonRecarga.scale);
    game.physics.arcade.enable(recargaMunicion);

    recargaMunicion2 = game.add.sprite(jsonRecarga.x1, jsonRecarga.y1 , 'recarga');
    recargaMunicion2.anchor.setTo(jsonRecarga.anchor);
    recargaMunicion2.scale.setTo(jsonRecarga.scale);
    game.physics.arcade.enable(recargaMunicion2);

    recargaMunicion3 = game.add.sprite(jsonRecarga.x2, jsonRecarga.y2 , 'recarga');
    recargaMunicion3.anchor.setTo(jsonRecarga.anchor);
    recargaMunicion3.scale.setTo(jsonRecarga.scale);
    game.physics.arcade.enable(recargaMunicion3);

    //ALARMA
    alarma = game.add.image(0, 0, 'alarma');
    alarma.fixedToCamera = true;
    alarma.alpha = 0;
    
    //DIFICULTAD
    jsonDificultadHUD = jsonLvl.DIFICULTAD_HUD;

    let dificultadHUD = game.add.sprite(jsonDificultadHUD.x, jsonDificultadHUD.y, jsonDificultadHUD.sprite);
    dificultadHUD.anchor.setTo(jsonDificultadHUD.anchor);
    dificultadHUD.scale.setTo(jsonDificultadHUD.scale);
    dificultadHUD.fixedToCamera = true;
    

    //MEJORAS

    jsonCorazon = jsonLvl.MEJORAS.CORAZON;
    jsonSprint = jsonLvl.MEJORAS.SPRINT;
    jsonSuerte = jsonLvl.MEJORAS.SUERTE;
    jsonEscudo = jsonLvl.MEJORAS.ESCUDO;

    mejoraCorazonTexto = game.add.text(jsonCorazon.texto.x, jsonCorazon.texto.y, jsonCorazon.precio , { font: '04B_19', fontSize: '30px', fill: '#ffffff' });
    mejoraCorazon = game.add.sprite(jsonCorazon.x, jsonCorazon.y,'corazon');
    mejoraCorazon.anchor.setTo(jsonCorazon.anchor);
    mejoraCorazon.scale.setTo(jsonCorazon.scale);
    game.physics.arcade.enable(mejoraCorazon);

    /*
    mejoraEscudo = game.add.sprite(jsonEscudo.x, jsonEscudo.y, 'mejoraEscudo');
    mejoraEscudo.anchor.setTo(jsonEscudo.anchor);
    mejoraEscudo.scale.setTo(jsonEscudo.scale);
    game.physics.arcade.enable(mejoraEscudo);
    */

    mejoraSprintTexto = game.add.text(jsonSprint.texto.x, jsonSprint.texto.y, jsonSprint.precio, { font: '04B_19', fontSize: '30px', fill: '#ffffff' });
    mejoraSprint = game.add.sprite(jsonSprint.x, jsonSprint.y, 'mejoraSprint');
    mejoraSprint.anchor.setTo(jsonSprint.anchor);
    mejoraSprint.scale.setTo(jsonSprint.scale);
    game.physics.arcade.enable(mejoraSprint);

    mejoraSuerteTexto = game.add.text(jsonSuerte.texto.x, jsonSuerte.texto.y, jsonSuerte.precio, { font: '04B_19', fontSize: '30px', fill: '#ffffff' });
    mejoraSuerte = game.add.sprite(jsonSuerte.x, jsonSuerte.y, 'mejoraSuerte');
    mejoraSuerte.anchor.setTo(jsonSuerte.anchor);
    mejoraSuerte.scale.setTo(jsonSuerte.scale);
    game.physics.arcade.enable(mejoraSuerte);

    //MAPA
    jsonPortal = jsonLvl.PORTAL;

    portal = game.add.sprite(jsonPortal.x, jsonPortal.y, 'portal');
    portal.animations.add('portal');
    portal.anchor.setTo(jsonPortal.anchor);
    portal.scale.setTo(jsonPortal.scale);
    portal.animations.play('portal', jsonPortal.fps, true, false);

    game.physics.arcade.enable(portal);
    portal.body.immovable = true;

    jsonBarr = jsonLvl.BARRERA;
    barreraMapa = game.add.sprite(jsonBarr.x, jsonBarr.y0, 'barreraMapa');  //1240
    barreraMapa.animations.add('laser');
    barreraMapa.animations.play('laser', 4, true, false );
    game.physics.arcade.enable(barreraMapa);
    barreraMapa.body.immovable = true;

    barreraMapa2 = game.add.sprite(jsonBarr.x, jsonBarr.y1, 'barreraMapa'); //565
    barreraMapa2.animations.add('laser');
    barreraMapa2.animations.play('laser', 4, true, false );
    game.physics.arcade.enable(barreraMapa2);
    barreraMapa2.body.immovable = true;

    jsonMuro = jsonLvl.ZONA_SEGURA;
    muroSeguro = game.add.sprite(jsonMuro.x0,jsonMuro.y, 'muroZonaSegura');
    muroSeguro.anchor.setTo(jsonMuro.anchor);
    game.physics.arcade.enable(muroSeguro);
    muroSeguro.body.immovable = true;

    muroSeguro2 = game.add.sprite(jsonMuro.x1,jsonMuro.y, 'muroZonaSegura');
    muroSeguro2.anchor.setTo(jsonMuro.anchor);
    game.physics.arcade.enable(muroSeguro2);
    muroSeguro2.body.immovable = true;


    jsonTecho = jsonLvl.TECHO_SEGURO;
    techoSeguro = game.add.sprite(jsonTecho.x,jsonTecho.y, 'techoZonaSegura');
    techoSeguro.anchor.setTo(jsonTecho.anchor);
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
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, jsonLvl.CONFIG.CAMERA.CAMERA_LERP, jsonLvl.CONFIG.CAMERA.CAMERA_LERP);

    setTimeout(function(){game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, jsonLvl.CONFIG.CAMERA.CAMERA_LERP_TIMEOUT, jsonLvl.CONFIG.CAMERA.CAMERA_LERP_TIMEOUT);}, 500);

    //DAMOS LOS VALORES
    playerHealth = jsonPlayer.maxHealth;
    click = game.input.mousePointer;

    //LISTAS
    monedasList = [];
    bulletList = [];
    enemieBlastList = [];
    enemieGranadaList = [];
    enemies = [];
    enemiesCuadrado = [];
    corazonList = [];

    //INICIALIZACION VALORES NUMERICOS
    municionActual = jsonPlayer.municionInicial;

    //VARIABLES NUMERICAS
    contador = 0;
    contador2 = 0;
    dineroTotal = 0;
    killCount = 0;
    score = 0;
    mejoraSuerteCompra = 0;

    //BOOL
    control = false;

    //CREACION DE ENEMIGOS
    timeEnemy(jsonLvl.CONFIG.ENEMY_CREATION_TIME);
    timeEnemyCuadrado(jsonLvl.CONFIG.ENEMY_CUADRADO_CREATION_TIME);
    corazonesRespawn();

    //HUD---------------------------------------------------------------
    dineroTotalText = game.add.text(jsonMonedaHUD.texto.x, GAME_STAGE_HEIGHT - jsonMonedaHUD.texto.yOffset,
        dineroTotal, {
            font: jsonMonedaHUD.texto.font,
            fontSize: jsonMonedaHUD.texto.fontSize,
            fill: jsonMonedaHUD.texto.color
        });

    dineroTotalText.fixedToCamera = true;

    bulletTotalText = game.add.text(jsonBulletHUD.texto.x, GAME_STAGE_HEIGHT - jsonBulletHUD.texto.yOffset,
        municionActual, {
            font: jsonBulletHUD.texto.font,
            fontSize: jsonBulletHUD.texto.fontSize,
            fill: jsonBulletHUD.texto.color
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
    else if(paused){
        updateText();
        wallsCollision();
    }
    else{

        if(buttonShift.isDown && compraVelocidad == true){
            velocidadExtra = jsonSprint.aumento;
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
        wallsCollision();//    Colisiones que no se pausan para evitar bugs
        updateText();//                 Actualiza los valores de municion y dinero.

        abrirBarrera();
        abrirBarrera2();
        endPortal();




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
        if(contador == jsonLvl.CONFIG.TIMER_CONTADOR_RESPAWN){
            timeEnemy(jsonEnemy.normalReappearTimer);//          Tiempo de reaparición de enemigo
            timeEnemyCuadrado(jsonEnemy.cuadradoReappearTimer);
            contador = 0;
        };

        if(levelDifficulty >= 2){

            contador2++;
            if(contador == jsonLvl.CONFIG.TIMER_CONTADOR_DISPARAR){
                timeEnemyShoot(jsonEnemy.normalShootingDelay);//    Tiempo para que disparen los enemigos
                timeEnemyShootCuadrado(jsonEnemy.cuadradoShootingDelay);
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

}



function wallsCollision(){
    if(enemy){
        for(let i = 0; i <= enemies.length; i++){
            game.physics.arcade.collide(techoSeguro, enemies[i]);
            game.physics.arcade.collide(muroSeguro, enemies[i]);
            game.physics.arcade.collide(muroSeguro2, enemies[i]);
        }
    }

    if(enemyCuadrado){
        for(let i = 0; i <= enemiesCuadrado.length; i++){
            game.physics.arcade.collide(techoSeguro, enemiesCuadrado[i]);
            game.physics.arcade.collide(muroSeguro, enemiesCuadrado[i]);
            game.physics.arcade.collide(muroSeguro2, enemiesCuadrado[i]);
        }
    }

    if(enemyBlast){
        for(let i = 0; i <= enemieBlastList.length; i++){
            if(!gameOver && !paused) {game.physics.arcade.collide(player,enemieBlastList[i], ataqueRecibido, null, game);}
            game.physics.arcade.collide(techoSeguro, enemieBlastList[i], function() {destroyEnemyBlast(enemieBlastList[i]); }, null, game);
            game.physics.arcade.collide(muroSeguro, enemieBlastList[i], function() {destroyEnemyBlast(enemieBlastList[i]); }, null, game);
            game.physics.arcade.collide(muroSeguro2, enemieBlastList[i], function() {destroyEnemyBlast(enemieBlastList[i]); }, null, game);
        }
    }

    if(enemyGranada){
        for(let i = 0; i <= enemieGranadaList.length; i++){
            if(!gameOver && !paused){game.physics.arcade.collide(player,enemieGranadaList[i], ataqueRecibido, null, game);}
            game.physics.arcade.collide(techoSeguro, enemieGranadaList[i], function() {destroyEnemyBlast(enemieGranadaList[i]); }, null, game);
            game.physics.arcade.collide(muroSeguro, enemieGranadaList[i], function() {destroyEnemyBlast(enemieGranadaList[i]); }, null, game);
            game.physics.arcade.collide(muroSeguro2, enemieGranadaList[i], function() {destroyEnemyBlast(enemieGranadaList[i]); }, null, game);
        }
    }

}

function enemiesMovement() {
    enemies.forEach(function(enemy) {
        if(!gameOver && !paused){
            // Calcula la distancia entre el enemigo y el jugador
            distanciaJugador = Phaser.Math.distance(player.x, player.y, enemy.x, enemy.y);

            // Comprueba si el jugador está dentro del rango de visión
            if (distanciaJugador <= jsonEnemy.rango) {
                // Mueve el enemigo hacia el jugador
                enemy.animations.play('enemigoAnimacion', 14, true, true);
                moveTo(enemy, player.x, player.y, enemyVelocity);
                persecucion = true;
                /*
                enemy.animations.add('enemigoAnimacion');
                enemy.animations.play('enemigoAnimacion', 14, false, true);
                */
            }
            else{
                persecucion = false;
            }
        }
        else{
            persecucion = false;
        }

        // Si el jugador está fuera del rango de visión, el enemigo no se mueve
        if (!persecucion) {
            enemy.body.velocity.setTo(0);
            enemy.animations.stop(true, true);
            enemy.frame = 0;

        }
    });

}

function inSafeZone(){
    if( jsonMuro.x0 <= player.x && player.x <= jsonMuro.x1 && player.y >= jsonTecho.y){
        estar = true;
        console.log('Esta dentro de la ZS');

        if (!contadorZS) {

            contadorZS = game.time.events.add(Phaser.Timer.SECOND * jsonLvl.CONFIG.TIMER_ZONA_SEGURA, function() {
                clearGameAll();
                endGame();
            }, game);

            alarmaEvent = game.time.events.add(Phaser.Timer.SECOND * jsonLvl.CONFIG.TIMER_ALARMA, function() {
                alarma = game.add.image(0, 0, 'alarma');
                alarma.fixedToCamera = true;
                alarma.alpha = 0;
                alarmaSonido = game.add.sound('Alarma');
                alarmaSonido.volume = 0.5;
                alarmaSonido.loop = true;
                alarmaSonido.play();

                var tween = game.add.tween(alarma).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, -1, true);
            }, game);
        }



    }
    else{
        estar = false;
        
        puedeComprar = true;
        console.log('NO ESTA DENTRO DE ZS y');

        if (alarma) {
            alarma.kill();
            alarma = null;
            if(alarmaSonido){
                alarmaSonido.stop();
            }
        }

        if (contadorZS) {
            game.time.events.remove(contadorZS);
            contadorZS = null; // Reiniciar el contador
        }
        
        if (alarmaEvent) {
            game.time.events.remove(alarmaEvent);
            alarmaEvent = null;
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
    if(enemy && !gameOver&&!paused){
        enemies.forEach(function(enemy) {
            tiempo = Phaser.Math.random(jsonEnemy.shortShootCadency, jsonEnemy.shootCadency);
            if(enemy){
                game.time.events.add(tiempo, function() {

                    rotateEnemy(enemy);
                    createEnemyBlast(enemy.x, enemy.y, enemy.angle);
                    posx = player.x;
                    posy = player.y;

                    disparoEnemigo = game.sound.add('DisparoEnemigo');
                    disparoEnemigo.volume = jsonLvl.BLAST.volume;
                    disparoEnemigo.play();

                    moveTo(enemyBlast, posx, posy, jsonEnemy.blastVelocity);
                    destroyBlast(jsonLvl.BLAST.longTimer, enemyBlast);
                }, game);
            }


        });
    }
}

function enemiesShootCuadrado(){//                                                          El enemigo dispara en dirección del jugador
    if(enemyCuadrado && !gameOver && !paused){
        enemiesCuadrado.forEach(function(enemyCuadrado) {
            tiempo = Phaser.Math.random(jsonEnemy.shortCuadradoShootCadency, jsonEnemy.shootCadency);
            if(enemyCuadrado){
                game.time.events.add(tiempo, function() {

                    rotateEnemy(enemyCuadrado);
                    createEnemyBlastCuadrado(enemyCuadrado.x, enemyCuadrado.y, enemyCuadrado.angle);
                    posx = player.x;
                    posy = player.y;

                    disparoEnemigo = game.sound.add('DisparoEnemigo');
                    disparoEnemigo.volume = jsonLvl.BLAST.volume;
                    disparoEnemigo.play();

                    moveTo(enemyGranada, posx, posy, jsonEnemy.blastVelocity);
                    destroyGranada(jsonLvl.GRANADA.timer, enemyGranada, player);
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
            destroyBlast(jsonPlayer.blastDuration);
        })
    }
}

function manageColision(){//                                                        Maneja las colisiones
    for (let i = 0; i <= enemies.length; i++){
        if(blast){game.physics.arcade.overlap(blast, enemies[i], enemyBlastCollide, null, game);}
        game.physics.arcade.overlap(player, enemies[i], playerEnemyCollide, null, game);
    }

    for (let i = 0; i <= enemiesCuadrado.length; i++){
        if(blast){game.physics.arcade.overlap(blast, enemiesCuadrado[i], enemyBlastCollideCuadrado, null, game);}
        game.physics.arcade.overlap(player, enemiesCuadrado[i], playerEnemyCollideCuadrado, null, game);
    }

    if(moneda){
        for (let i = 0; i <= monedasList.length; i++){
            game.physics.arcade.overlap(player,monedasList[i], recogerMonedas, null, game);
        }
    }

    if(corazon){
        if(playerHealth < jsonPlayer.maxHealth){
            for (let i = 0; i <= corazonList.length; i++){
                game.physics.arcade.overlap(player,corazonList[i], recogerVida, null, game);
            }
        }
    }

    if(bullet){
        for(let i = 0; i <= bulletList.length; i++){
            game.physics.arcade.overlap(player,bulletList[i], recogerBullets, null, game);
        }
    }



    if(game.physics.arcade.overlap(player, recargaMunicion)){
        if(municionActual < jsonPlayer.municionInicial){            
            paused = true;

            player.body.velocity.x = player.body.velocity.y = 0;
            let recargandoTween = game.add.tween(player.scale).to({
                x: 2,
                y: 2
            }, 500,
            Phaser.Easing.Cubic.Out, true, 0, 2, true);
    
        recargandoTween.onComplete.add(function(){
                paused = false;
            }, game)
        
            municionActual = jsonPlayer.municionInicial;
            recargaMunicion.scale.setTo(jsonRecarga.scaleUsing);
        }
    }
    else{
        recargaMunicion.scale.setTo(jsonRecarga.scale);
    }

    if(game.physics.arcade.overlap(player, recargaMunicion2)){
        if(municionActual < jsonPlayer.municionInicial){            
            paused = true;

            player.body.velocity.x = player.body.velocity.y = 0;
            let recargandoTween = game.add.tween(player.scale).to({
                x: 2,
                y: 2
            }, 500,
            Phaser.Easing.Cubic.Out, true, 0, 2, true);
    
        recargandoTween.onComplete.add(function(){
                paused = false;
            }, game)
        
            municionActual = jsonPlayer.municionInicial;
            recargaMunicion2.scale.setTo(jsonRecarga.scaleUsing);
        }
    }
    else{
        recargaMunicion2.scale.setTo(jsonRecarga.scale);
    }

    
    if(game.physics.arcade.overlap(player, recargaMunicion3)){
        if(municionActual < jsonPlayer.municionInicial){            
            paused = true;

            player.body.velocity.x = player.body.velocity.y = 0;
            let recargandoTween = game.add.tween(player.scale).to({
                x: 2,
                y: 2
            }, 500,
            Phaser.Easing.Cubic.Out, true, 0, 2, true);
    
        recargandoTween.onComplete.add(function(){
                paused = false;
            }, game)
        
            municionActual = jsonPlayer.municionInicial;
            recargaMunicion3.scale.setTo(jsonRecarga.scaleUsing);
        }
    }
    else{
        recargaMunicion3.scale.setTo(jsonRecarga.scale);
    }


    if(game.physics.arcade.overlap(player, mejoraCorazon)){

        if(dineroTotal >= jsonCorazon.precio && puedeComprar == true){
            mejoraCorazon.kill();
            mejoraCorazonTexto.kill();
            dineroTotal -= jsonCorazon.precio;
            puedeComprar = false;

            playerHealth += jsonCorazon.aumento;
            actualizarVida()
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

        if(dineroTotal >= jsonSprint.precio && puedeComprar == true){
            mejoraSprint.kill();
            mejoraSprintTexto.kill();
            dineroTotal -= jsonSprint.precio;
            compraVelocidad = true;
            puedeComprar = false;
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

    if(game.physics.arcade.overlap(player, mejoraSuerte )){

        if(dineroTotal >= jsonSuerte.precio && puedeComprar == true){
            mejoraSuerte.kill();
            mejoraSuerteTexto.kill();
            dineroTotal -= jsonSuerte.precio;
            mejoraSuerteCompra = jsonSuerte.aumento;
            puedeComprar = false;
        }

        /*
        game.time.events.add(Phaser.Timer.SECOND * 3, function() {
            console.log('Mejora de Suerte');
            mejoraSuerte.kill();
            mejoraSuerteTexto.kill()
        }, this);
        */
    }


    game.physics.arcade.collide(player, barreraMapa);
    if(game.physics.arcade.collide(blast, barreraMapa)){
        blast.kill()
    }

    game.physics.arcade.collide(player, barreraMapa2);
    if(game.physics.arcade.collide(blast, barreraMapa2)){
        blast.kill()
    }

    




}

function playerMovement() {//                                                       Controla el movimiento del jugador
    // Reset player's velocity
    player.body.velocity.setTo(0);

    // Check input for movement
    if (cursors.left.isDown || buttonA.isDown) {
        // Move left
        player.body.velocity.x = -jsonPlayer.velocity - velocidadExtra;
    }
    if (cursors.right.isDown || buttonD.isDown) {
        // Move right
        player.body.velocity.x = jsonPlayer.velocity + velocidadExtra;
    }
    if (cursors.up.isDown || buttonW.isDown) {
        // Move up
        player.body.velocity.y = -jsonPlayer.velocity - velocidadExtra;
    }
    if (cursors.down.isDown || buttonS.isDown) {
        // Move down
        player.body.velocity.y = jsonPlayer.velocity + velocidadExtra;
    }
}

function endGame() {//                                                              Termina el juego

    muerte = game.sound.add('Muerte');
    muerte.volume = jsonLvl.CONFIG.MUERTE_VOL;
    muerte.play();

    // Game Over
    paused = true;
    gameOver = true;

    // Stop and reset input
    game.input.enabled = true;
    cursors.left.reset(true);
    cursors.right.reset(true);
    cursors.up.reset(true);
    cursors.down.reset(true);

    // Stop player

    player.body.velocity.x = player.body.velocity.y = 0;


    // Cleaning...
    clearGameAll();



    // Final animation (a tween)
    let finalTween = game.add.tween(player.scale).to({
            x: 2,
            y: 2
        }, 1000,
        Phaser.Easing.Cubic.Out, true, 0, 2, true);

    finalTween.onComplete.add(function () {
        player.destroy();
        if (victoryAtEnd) {

            game.state.start('comic');
       } else {

            game.state.start('gameOver');
       }

    });



}

function createPlayer(){//                                                          Crea al jugador principal
    let x = game.world.centerX + jsonPlayer.x;
    let y = jsonPlayer.y;

    player = game.add.sprite(x, y, 'playerAnimation', 0);
    player.anchor.setTo(jsonPlayer.anchor);
    player.scale.setTo(jsonPlayer.scale);

    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

}

function createBlast(){//                                                           Crea el blast del juagdor
    let x = player.x;
    let y = player.y;

    blast = game.add.sprite(x, y, 'blast');
    blast.anchor.setTo(jsonLvl.BLAST.anchor);
    game.physics.arcade.enable(blast);
    blast.body.collideWorldBounds = false;

    blast.angle = player.angle;

    disparo = game.sound.add('Disparo');
    disparo.volume = 0.75;
    disparo.play();


}

function createEnemyBlast(posx, posy, enemyAngle){//                                Crea el blast del enemigo

    enemyBlast = game.add.sprite(posx, posy, 'enemyBlast');
    enemyBlast.scale.setTo(jsonLvl.BLAST.scale);
    enemyBlast.anchor.setTo(jsonLvl.BLAST.anchor);
    game.physics.arcade.enable(enemyBlast);
    enemyBlast.body.collideWorldBounds = false;

    enemyBlast.angle = enemyAngle;

    enemieBlastList.push(enemyBlast);


}

function createEnemyBlastCuadrado(posx, posy, enemyAngle){//                                Crea el blast del enemigo Cuadrado

    enemyGranada = game.add.sprite(posx, posy, 'granada');
    enemyGranada.scale.setTo(jsonLvl.GRANADA.scale);
    enemyGranada.anchor.setTo(jsonLvl.GRANADA.anchor);
    game.physics.arcade.enable(enemyGranada);
    enemyGranada.body.collideWorldBounds = false;

    enemyGranada.animations.add('lanzar');
    enemyGranada.animations.play('lanzar', 4, false, true);

    enemyGranada.angle = enemyAngle;

    enemieGranadaList.push(enemyGranada);


}

function spawnMoneda(xSpawn,ySpawn){//                                              Hace aparecer una moneda donde muere un enemigo
    moneda = game.add.sprite(xSpawn, ySpawn, 'moneda');
    moneda.anchor.setTo(jsonLvl.CONFIG.MONEDA.anchor);
    moneda.scale.setTo(jsonLvl.CONFIG.MONEDA.scale)
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

    if(!gameOver && !paused && enemies.length < jsonLvl.CONFIG.ENEMY_LIMIT){ //para que no se creen enemigos adicionales mientras se hace la animación de final de partida
        console.log("Normales " + enemies.length);
        
        let x = 0;
        let y = 0;

        if(killCount < jsonLvl.BARRIER_1_KILLS){
            console.log("estoy generando en 1");
            x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
            y = Phaser.Math.random(jsonBarr.y0 + jsonBarr.offset, jsonTecho.y - jsonTecho.offset);
        }
        else if(killCount < jsonLvl.BARRIER_2_KILLS){
            console.log("estoy generando en 2");
            x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
            y = Phaser.Math.random(jsonBarr.y1 +  jsonBarr.offset, jsonTecho.y - jsonTecho.offset);
        }
        else{
            console.log("estoy generando en 3");
            x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
            y = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset, jsonTecho.y);
        }
        
        while((x > jsonMuro.x0 && x < jsonMuro.x1) && y > jsonTecho.y){
            if(killCount < jsonLvl.BARRIER_1_KILLS){
                console.log("estoy generando en 1");
                x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
                y = Phaser.Math.random(jsonBarr.y0 +  jsonBarr.offset, jsonTecho.y - jsonTecho.offset);
            }
            else if(killCount < jsonLvl.BARRIER_2_KILLS){
                console.log("estoy generando en 2");
                x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
                y = Phaser.Math.random(jsonBarr.y1 + jsonBarr.offset, jsonTecho.y - jsonTecho.offset);
            }
            else{
                console.log("estoy generando en 3");
                x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
                y = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset, jsonTecho.y - jsonTecho.offset);
            }
        }
        
        enemy = game.add.sprite(x, y, 'enemigoAnimacion');
        enemy.animations.add('enemigoAnimacion');
        enemy.anchor.setTo(jsonEnemy.anchor);

        enemy.enableBody = true;
        game.physics.arcade.enable(enemy);
        enemy.body.collideWorldBounds = true;

        rotateEnemy(enemy);
        enemies.push(enemy);
    }
}


function createEnemyCuadrado(){//                                                           Genera un enemigo en una posicion aleatoria del canvas inicial

    if(!gameOver && !paused && enemies.length < jsonLvl.CONFIG.ENEMY_LIMIT){ //para que no se creen enemigos adicionales mientras se hace la animación de final de partida
        console.log("Normales " + enemies.length);
        
        let x = 0;
        let y = 0;

        if(killCount < jsonLvl.BARRIER_1_KILLS){
            console.log("estoy generando en 1");
            x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset, jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
            y = Phaser.Math.random(jsonBarr.y0 + jsonBarr.offset, jsonTecho.y - jsonTecho.offset);
        }
        else if(killCount < jsonLvl.BARRIER_2_KILLS){
            console.log("estoy generando en 2");
            x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
            y = Phaser.Math.random(jsonBarr.y1 +  jsonBarr.offset, jsonTecho.y - jsonTecho.offset);
        }
        else{
            console.log("estoy generando en 3");
            x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
            y = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset, jsonTecho.y);
        }
        
        while((x > jsonMuro.x0 && x < jsonMuro.x1) && y > jsonTecho.y){
            if(killCount < jsonLvl.BARRIER_1_KILLS){
                console.log("estoy generando en 1");
                x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
                y = Phaser.Math.random(jsonBarr.y0 +  jsonBarr.offset, jsonTecho.y - jsonTecho.offset);
            }
            else if(killCount < jsonLvl.BARRIER_2_KILLS){
                console.log("estoy generando en 2");
                x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
                y = Phaser.Math.random(jsonBarr.y1 + jsonBarr.offset, jsonTecho.y - jsonTecho.offset);
            }
            else{
                console.log("estoy generando en 3");
                x = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.w - jsonLvl.CONFIG.GAME_WORLD.generalOffset);
                y = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset, jsonTecho.y - jsonTecho.offset);
            }
        }
        

        enemyCuadrado = game.add.sprite(x, y, 'enemigoCuadrado');
        enemyCuadrado.anchor.setTo(jsonEnemy.anchor);
        enemyCuadrado.enableBody = true;
        game.physics.arcade.enable(enemyCuadrado);
        enemyCuadrado.body.collideWorldBounds = true;

        rotateEnemy(enemyCuadrado);
        enemiesCuadrado.push(enemyCuadrado);
    }
}

 

function rotateEnemy(enemigo) {//                                                     Rota el enemigo donde se encuentra el jugador
    var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
        enemigo.x, enemigo.y,
        player.x, player.y);

    if (targetAngle < 0)
        targetAngle += 360;

    enemigo.angle = targetAngle;
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

function timeEnemyCuadrado(tiempo){//                                                       Tiempo de creación de enemigos
    game.time.events.add(tiempo, function() {
        createEnemyCuadrado();
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

function timeEnemyShootCuadrado(tiempo){//                                                  Tiempo de creación del disparo de los enemigos
    game.time.events.add(tiempo, function() {
        enemiesShootCuadrado();
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
        game.camera.shake(jsonLvl.CONFIG.CAMERA.SHOOT_SHAKE);
        createBlast();
        moveTo(blast, game.input.mousePointer.worldX, game.input.mousePointer.worldY, jsonLvl.BLAST.speed);
        control = true;
        cooldownDisparo(jsonPlayer.shootCooldown);
        destroyBlast(jsonLvl.BLAST.shortTimer, blast);

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

function destroyGranada(tiempo, enemyGranada, player){//                                             Destruye el proyectil del jugador
    game.time.events.add(tiempo, function() {

        areaDamageRadius = jsonEnemy.granadaArea;

        detectarObjeto(areaDamageRadius, player, enemyGranada);
        enemyGranada.kill();
        ondaExpansiva = game.add.sprite(enemyGranada.x, enemyGranada.y,  'onda');
        ondaExpansiva.anchor.setTo(jsonEnemy.ondaAnchor);

        ondaExpansiva.animations.add('onda');
        ondaExpansiva.animations.play('onda', 15, false, true);

    }, game);
}

function detectarObjeto(area, player, enemyGranada){

    jugadorX = player.x;
    jugadorY = player.y;

    var areaX = enemyGranada.x - (area / 2);
    var areaY = enemyGranada.y - (area / 2);
    var areaWidth = area;
    var areaHeight = area;

    if(jugadorX >= areaX && jugadorX <= areaX + areaWidth && jugadorY >= areaY && jugadorY <= areaY + areaHeight){
        console.log('Le ha dado al jugador');
        playerHit();
    }
    else{
        console.log('NO le dio');
    }
}

function recogerMonedas(player,moneda){//                                           Permite recoger las monedas

    pickMoneda = game.sound.add('RecogerMoneda');
    pickMoneda.volume = 0.5;
    pickMoneda.play();

    moneda.kill();
    monedasList.splice(monedasList.indexOf(moneda),1);
    dineroTotal += 1;
}

function recogerVida(player,corazon){//                                           Permite recoger las monedas
    corazon.kill();
    corazonList.splice(corazonList.indexOf(corazon),1);
    playerHealth += 1;
    actualizarVida();
}

function recogerBullets(player,bullet){//                                           Permite recoger la munición

    pickBala = game.sound.add('RecogerBala');
    pickBala.volume = jsonLvl.CONFIG.BULLET.volume;
    pickBala.play();

    bullet.kill();
    municionActual += 1;
}

function bulletRandom(xSpawn,ySpawn){//                                             Probabilidad de que aparezca munición extra
    numeroRandom = Phaser.Math.between(0, jsonPlayer.suerteInicial + mejoraSuerteCompra);

    spawnBullet(xSpawn, ySpawn);

    if(numeroRandom >= 7){
        spawnBullet(xSpawn - jsonLvl.CONFIG.BULLET.offset2, ySpawn - jsonLvl.CONFIG.BULLET.offset2);
    }
}

function monedaRandom(xSpawn,ySpawn){//                                             Probabilidad de que aparezca munición extra
    numeroRandom = Phaser.Math.between(0, jsonPlayer.suerteInicial + mejoraSuerteCompra);

    if(numeroRandom >= 3){
        spawnMoneda(xSpawn,ySpawn);
    }
    if(numeroRandom >= 7){
        spawnMoneda(xSpawn - jsonLvl.CONFIG.MONEDA.offset,ySpawn + jsonLvl.CONFIG.MONEDA.offset);
    }
}

function spawnBullet(xSpawn, ySpawn){//                                             Aparece muniución cuando matas a un enemigo
    bullet = game.add.sprite(xSpawn + jsonLvl.CONFIG.BULLET.offset, ySpawn + jsonLvl.CONFIG.BULLET.offset, 'bullet');
    bullet.anchor.setTo(jsonLvl.CONFIG.BULLET.anchor);
    bullet.scale.setTo(jsonLvl.CONFIG.BULLET.scale);
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

function enemyBlastCollideCuadrado(blast, enemyCuadrado) {//                                        Tiene en cuenta el chocar del proyectil con el enemigo

    let xSpawn = enemyCuadrado.x;
    let ySpawn = enemyCuadrado.y;

    blast.kill();
    enemyCuadrado.destroy();
    explosionEnemy(enemyCuadrado);

    enemiesCuadrado.splice(enemiesCuadrado.indexOf(enemyCuadrado),1);


    monedaRandom(xSpawn,ySpawn);
    bulletRandom(xSpawn,ySpawn);



    killCount += 1;
    //AQUI SE PONE LA PUNTUACION Y LO QUE OCURRA AL MATAR

    score = killCount*200;

}

function explosionEnemy(enemy){
    explosionEnemigo = game.add.sprite(enemy.x, enemy.y, 'explosionEnemy');
    explosionEnemigo.anchor.setTo(0.5);
    explosionEnemigo.scale.setTo(2, 2);

    explosionEnemigo.animations.add('daño');
    explosionEnemigo.animations.play('daño', 15, false, true);

    enemy = game.add.sprite(enemy.x, enemy.y, 'estela');
    enemy.anchor.setTo(0.5, 0.5);
    enemy.scale.setTo(1, 1);

    enemy.animations.add('estela');
    enemy.animations.play('estela', 12, true, false);

    timerEstela = game.time.events.add(Phaser.Timer.SECOND * jsonLvl.CONFIG.TIMER_ESTELA, function() {
        enemy.kill();
    }, game);

}

function explosionPlayer(){
    explosion = game.add.sprite(player.x, player.y, 'explosion');
    explosion.anchor.setTo(jsonLvl.EXPLOSION.anchor);
    explosion.scale.setTo(jsonLvl.EXPLOSION.scale)

    explosion.animations.add('daño');
    explosion.animations.play('daño', 15, false, true);
}

function playerEnemyCollide(player, enemy){//                                       Tiene en cuenta la colision del enemigo y el jugador

    playerHit();
    enemy.destroy();
    explosionEnemy(enemy);
    enemies.splice(enemies.indexOf(enemy),1);

}

function playerEnemyCollideCuadrado(player, enemyCuadrado){//                                       Tiene en cuenta la colision del enemigo y el jugador

    playerHit();
    enemyCuadrado.destroy();
    explosionEnemy(enemyCuadrado);
    enemiesCuadrado.splice(enemiesCuadrado.indexOf(enemyCuadrado),1);

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


    camera = Phaser.camera;

    game.camera.shake(jsonLvl.CONFIG.CAMERA.SHAKE);
    playerHealth -= 1;

    explosionPlayer();

    actualizarVida();
}

function abrirBarrera(){
    if(killCount == jsonLvl.BARRIER_1_KILLS){
        barreraMapa.kill();
    }
}

function abrirBarrera2(){
    if(killCount == jsonLvl.BARRIER_2_KILLS){
        barreraMapa2.kill();
    }
}

function endPortal(){
    if(killCount >= jsonLvl.END_PORTAL_KILLS && game.physics.arcade.collide(player, portal)){
        portal.kill();
        victoryAtEnd = true;
        endGame()

    }
}

function corazonesRespawn(){

    let limite = 0;

    while(limite < jsonLvl.CORAZONES_MAPA_LIMITE){

        let randomx = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset, jsonLvl.CONFIG.GAME_WORLD.w);
        let randomy = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset, jsonLvl.CONFIG.GAME_WORLD.h - jsonLvl.CONFIG.GAME_WORLD.xOffset);

        while(( jsonMuro.x0 <= randomx && randomx <= jsonMuro.x1) && randomy >= jsonTecho.y){
            randomx = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset, jsonLvl.CONFIG.GAME_WORLD.w);
            randomy = Phaser.Math.random(jsonLvl.CONFIG.GAME_WORLD.generalOffset,  jsonLvl.CONFIG.GAME_WORLD.h - jsonLvl.CONFIG.GAME_WORLD.xOffset);
        }

        corazon = game.add.sprite(randomx, randomy, 'corazon');
        corazon.anchor.setTo(jsonCorazon.anchor);
        game.physics.arcade.enable(corazon);
        corazonList.push(corazon);

        limite++;
        console.log(limite);
    }
    console.log("todos generados");
}

function actualizarVida(){
    if(playerHealth<=0){
        endGame();
    }
    else if(playerHealth > jsonLvl.PLAYER_HEALTH/2){
        //Herido
        player.frame = 0;

    }
    else if(playerHealth == 3){
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

