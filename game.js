const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Der einzelne Spieler
const player = {
  x: 400, y: 300, dx: 2, dy: 0, color: 'orange', trail: []
};

const directions = {
  'ArrowLeft': [0, -2], // nach links
  'ArrowRight': [0, 2]  // nach rechts
};

let gameInterval;

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, 10, 10);
  player.trail.push({ x: player.x, y: player.y });

  // Zeichnen der hinterlassenen Spur
  for (let i = 0; i < player.trail.length; i++) {
    ctx.fillRect(player.trail[i].x, player.trail[i].y, 10, 10);
  }
}

function movePlayer() {
  player.x += player.dx;
  player.y += player.dy;

  // Kollision mit den Wänden
  if (player.x < 0 || player.x >= canvas.width || player.y < 0 || player.y >= canvas.height) {
    endGame();
  }

  // Kollision mit der eigenen Spur
  for (let i = 0; i < player.trail.length; i++) {
    if (player.x === player.trail[i].x && player.y === player.trail[i].y) {
      endGame();
    }
  }
}

function endGame() {
  alert('Du hast verloren!');
  clearInterval(gameInterval);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Spieler bewegen und zeichnen
  movePlayer();
  drawPlayer();
}

function changeDirection(event) {
  const key = event.key;
  if (directions[key]) {
    const [dx, dy] = directions[key];

    // Verhindern, dass der Spieler 180 Grad dreht
    if (player.dx === -dx && player.dy === -dy) {
      return;
    }

    player.dx = dx;
    player.dy = dy;
  }
}

// Spiel starten
document.addEventListener('keydown', changeDirection);
gameInterval = setInterval(update, 1000 / 30);  // 30 FPS
