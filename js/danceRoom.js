let danceRoomState = {
    preload: preloadDanceRoom,
    create: createDanceRoom,
    update: createDanceRoom
};

function preloadDanceRoom() {
    game.load.image('background', 'assets/FondoDance.png');
}

function createDanceRoom() {
    game.add.image(0, 0, 'background');
}

function updateDanceRoom(){

}
