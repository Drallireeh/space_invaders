const canvas = document.getElementById('invaders');
const context = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 540;

let timer;
let player;
let aliens;
const sounds = {
    invader1: document.getElementById('invader1'),
    invader2: document.getElementById('invader2'),
    invader3: document.getElementById('invader3'),
    invader4: document.getElementById('invader4'),
    invader_killed: document.getElementById('invader_killed'),
    shoot: document.getElementById('player_shoot'),
    player_death: document.getElementById('player_death'),
};

const MODE_PLAYING = 1;
const MODE_GAME_OVER = 2;
let game_mode = MODE_PLAYING;

// Chargement de l'image du sprite avant de démarrer le jeu
const spritesheet = new Image();
spritesheet.src = '../img/spritesheet.png';
spritesheet.onload = function () { // Fonction éxécutée lorsque le navigateur a finis de charger le PNG
    player = createPlayer();
    aliens = createAliens();

    // Démarrage de la boucle continue
    gameloop();
};

function update() {
    switch (game_mode) {
        case MODE_PLAYING:
            animatePlayer();
            animateAliens();
            break;
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    switch (game_mode) {
        case MODE_PLAYING:
            renderPlayer();
            renderAliens();
            break;
        case MODE_GAME_OVER:
            renderGameOver();
            break;
    }
    renderUI();
}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();

    timer = requestAnimationFrame(gameloop);
}

function renderGameOver() {
    context.textAlign = 'center';
    context.fillStyle = '#0f0';
    context.font = 'normal 24px "Press Start 2P", cursive';
    context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);

    context.fillStyle = 'rgb(255,255,255)';
    context.font = 'normal 20px "Press Start 2P", cursive';
    context.fillText('PRESS F5', canvas.width / 2, canvas.height / 2 + 40);
}