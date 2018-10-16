const aliensMap = [
    40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40,

    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,

    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
];

const NB_ALIENS_PER_LINE = 11;
const ALIENS_SPACE_X = 35;
const ALIENS_SPACE_Y = 28;

const aliensSprites = {
    40: [
        { x: 6, y: 3, width: 16, height: 16 },
        { x: 6, y: 25, width: 16, height: 16 },
    ],
    20: [
        { x: 32, y: 3, width: 22, height: 16 },
        { x: 32, y: 25, width: 22, height: 16 },
    ],
    10: [
        { x: 60, y: 3, width: 24, height: 16 },
        { x: 60, y: 25, width: 24, height: 16 },
    ]
};

let aliensTimer = 1000;
let lastAlienMvt = 0; // instant 't' du dernier déplacement des aliens

function createAliens() {
    const aliens = [];

    for (let i = 0, line = 0; i < aliensMap.length; i++) {
        if (i % NB_ALIENS_PER_LINE === 0) line++;

        let alienWidth = aliensSprites[aliensMap[i]][0].width;
        let alienHeight = aliensSprites[aliensMap[i]][0].height;

        aliens.push({
            x: 12 + i % NB_ALIENS_PER_LINE * ALIENS_SPACE_X,
            y: 100 + line * ALIENS_SPACE_Y,
            width: alienWidth,
            height: alienHeight,
            points: aliensMap[i],
            direction: 1,
            spriteIndex: 0
        });
    }

    return aliens;
}

function animateAliens() {

    if (Date.now() - lastAlienMvt > aliensTimer) {
        lastAlienMvt = Date.now(); // mise a jour de l'instant du dernier mouvement du joueur à "maintenant" !

        //récupération du X de l'alien le plus à droite (et à gauche)
        let extremeRightAlien = Math.max(...aliens.map(a => a.x)) + ALIENS_SPACE_X; // pareil que Math.max(...aliens.map(function(a) { return a.x });
        let extremeLeftAlien = Math.min(...aliens.map(a => a.x)); // ""

        for (let i = 0; i < aliens.length; i++) {

            if (extremeRightAlien > canvas.width && aliens[i].direction === 1 ||
                extremeLeftAlien <= 0 && aliens[i].direction === -1) {
                aliens[i].direction *= -1;
                aliens[i].y += 22;
            }
            else aliens[i].x += 12 * aliens[i].direction;
        }
    } // fin du mouvement des aliens

    // Vérification si un alien se prend une cartouche
    if (player.bullet !== null) {
        for (let i = 0; i < aliens.length; i++) {
            if (player.bullet.x > aliens[i].x &&
                player.bullet.x <= aliens[i].x + aliens[i].width &&
                player.bullet.y > aliens[i].y &&
                player.bullet.y <= aliens[i].y + aliens[i].height) {
                // Collision !
                // Augmentation du score du joueur
                player.score += aliens[i].points;
                player.bullet = null;
                // Augmentation de la vitesse générale des aliens
                aliensTimer -= 15;
                if (aliensTimer < 75) aliensTimer = 75;
                // Suppression de l'alien du tableau
                aliens.splice(i, 1);
                break;
            }
        }
    }
}

function renderAliens() {
    for (let i = 0; i < aliens.length; i++) {
        let points = aliens[i].points;
        let spriteIndex = aliens[i].spriteIndex;

        context.drawImage(
            spritesheet,

            aliensSprites[points][spriteIndex].x,
            aliensSprites[points][spriteIndex].y,
            aliensSprites[points][spriteIndex].width,
            aliensSprites[points][spriteIndex].height,

            aliens[i].x,
            aliens[i].y,
            aliensSprites[points][spriteIndex].width,
            aliensSprites[points][spriteIndex].height,
        );
    }
}