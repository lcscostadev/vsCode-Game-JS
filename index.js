// Get the canvas element
let canvas = document.getElementById('canvas');

// Load the player image
var playerImg = new Image();
playerImg.src = 'player.svg';

// Get the canvas context
let ctx = canvas.getContext('2d');

// Set the player's starting position
let playerX = 1000;
let playerY = 100;

// Set the enemy's starting position
let enemyX = 200;
let enemyY = 200;

// Set the distance the player and enemy will move each time a key is pressed
let moveDistance = 10;

// Set the size of the viewport (the visible area of the canvas)
let viewportWidth = canvas.width;
let viewportHeight = canvas.height;

// Set the player's health
let playerHealth = 100;

// Set the enemy's damage
let enemyDamage = 10;

// Set the enemy's speed
let enemySpeed = 5;

document.addEventListener('keydown', function (event) {
    // Determine which key was pressed
    let keyPressed = event.key;

    // Move the player based on the key pressed
    if (keyPressed === 'ArrowUp') {
        playerY -= moveDistance;
    } else if (keyPressed === 'ArrowDown') {
        playerY += moveDistance;
    } else if (keyPressed === 'ArrowLeft') {
        // Check if the player is at the left edge of the canvas
        if (playerX - moveDistance >= 0) {
            playerX -= moveDistance;
        }
    } else if (keyPressed === 'ArrowRight') {
        // Check if the player is at the right edge of the canvas
        if (playerX + moveDistance <= canvas.width) {
            playerX += moveDistance;
        }
    }

    // Check if the player has collided with the enemy
    if (checkCollision(playerX, playerY, 20, 20, enemyX, enemyY, 20, 20)) {
        // Subtract the enemy's damage from the player's health
        playerHealth -= enemyDamage;

        // Check if the player has no more health
        if (playerHealth <= 0) {
            // Reset the player's position and health
            playerX = 50;
            playerY = 50;
            playerHealth = 100;
        }
    }
});

// Update the enemy's position to follow the player continuously
setInterval(function () {
    // Update the enemy's position to follow the player, but slower
    if (playerX > enemyX) {
        enemyX += enemySpeed;
    } else if (playerX < enemyX) {
        enemyX -= enemySpeed;
    }

    if (playerY > enemyY) {
        enemyY += enemySpeed;
    } else if (playerY < enemyY) {
        enemyY -= enemySpeed;
    }

    // Redraw the canvas
    drawCanvas();
}, 50); // Set the interval time in milliseconds (in this case, 50 milliseconds)

// Function to check if two rectangles have collided
function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

// Function to draw the canvas
function drawCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player
    ctx.drawImage(playerImg, playerX, playerY);

    // Draw the enemy
    ctx.font = "12px Arial";
    ctx.fillText("let enemy: Zombie", enemyX, enemyY);

    // Draw the player's health above their head
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("100", playerX + (playerSize / 2), playerY - 10);
}
// Initial draw of the canvas
drawCanvas();
