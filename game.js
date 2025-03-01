const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player1 = {
  x: 100, y: 100, dx: 2, dy: 0, color: 'green', trail: []
};
const player2 = {
  x: 700, y: 500, dx: -2, dy: 0, color: 'red', trail: []
};

const players = [player1, player2];
const directions = {
  'w': [-2, 0], // player 1 up
  's': [2, 0],  // player 1 down
  'a': [0, -2], // player 1 left
  'd': [0, 2],  // player 1 right
  'ArrowUp': [-2, 0], // player 2 up
  'ArrowDown': [2, 0], // player 2 down
  'ArrowLeft': [0, -2], // player 2 left
  'ArrowRight': [0, 2]  // player 2 right
};

let gameInterval;

function drawPlayer(player) {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, 10, 10);
  player.trail.push({ x: player.x, y: player.y });

  // Drawing the trail of the player
  for (let i = 0; i < player.trail.length; i++) {
    ctx.fillRect(player.trail[i].x, player.trail[i].y, 10, 10);
  }
}

function movePlayer(player) {
  player.x += player.dx;
  player.y += player.dy;

  // Check for collision with the walls
  if (player.x < 0 || player.x >= canvas.width || player.y < 0 || player.y >= canvas.height) {
    endGame(player);
  }

  // Check for collision with own trail
  for (let i = 0; i < player.trail.length; i++) {
    if (player.x === player.trail[i].x && player.y === player.trail[i].y) {
      endGame(player);
    }
  }
}

function endGame(player) {
  alert(`${player.color} hat verloren!`);
  clearInterval(gameInterval);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move and draw each player
  players.forEach(player => {
    movePlayer(player);
    drawPlayer(player);
  });
}

function changeDirection(event) {
  const key = event.key;
  if (directions[key]) {
    const [dx, dy] = directions[key];

    // Prevent players from turning 180 degrees
    if ((player1.dx === -dx && player1.dy === -dy) || (player2.dx === -dx && player2.dy === -dy)) {
      return;
    }

    if (player1.x === players[0].x && player1.y === players[0].y) {
      player1.dx = dx;
      player1.dy = dy;
    }
    else if (player2.x === players[1].x && player2.y === players[1].y) {
      player2.dx = dx;
      player2.dy = dy;
    }
  }
}

// Initialize game
document.addEventListener('keydown', changeDirection);
gameInterval = setInterval(update, 1000 / 30);  // 30 FPS
