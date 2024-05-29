let comicState = {
    preload: preloadComic,
    create: createComic,
    update: createComic
};

function preloadComic() {
    game.load.image('background', 'assets/fondoGrande.png');
}

function createComic() {
    game.add.image(0, 0, 'background');
}

function updateComic(){

}
