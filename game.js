const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const players = [
    { x: 100, y: 100, angle: 0, speed: 2, color: "blue", trail: [], left: "a", right: "d" },
    { x: 700, y: 100, angle: Math.PI, speed: 2, color: "red", trail: [], left: "j", right: "l" },
    { x: 100, y: 500, angle: 0, speed: 2, color: "green", trail: [], left: "v", right: "n" },
    { x: 700, y: 500, angle: Math.PI, speed: 2, color: "yellow", trail: [], left: "4", right: "6" },
    { x: 400, y: 300, angle: Math.PI / 2, speed: 2, color: "purple", trail: [], left: "ArrowLeft", right: "ArrowRight" }
];

function update() {
    players.forEach(player => {
        player.trail.push({ x: player.x, y: player.y });
        player.x += Math.cos(player.angle) * player.speed;
        player.y += Math.sin(player.angle) * player.speed;
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    players.forEach(player => {
        ctx.fillStyle = player.color;
        player.trail.forEach(point => {
            ctx.fillRect(point.x, point.y, 2, 2);
        });
    });
}

document.addEventListener("keydown", (event) => {
    players.forEach(player => {
        if (event.key === player.left) {
            player.angle -= 0.1;
        } else if (event.key === player.right) {
            player.angle += 0.1;
        }
    });
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
