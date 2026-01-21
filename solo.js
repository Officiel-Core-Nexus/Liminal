// =========================
// LIMINAL – MODE SOLO
// =========================

// CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// JOUEUR
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 18,
    speed: 3,
    color: "#f5f5f5",
    vx: 0,
    vy: 0
};

// INPUT
const keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// MOUVEMENT
function updatePlayer() {
    let vx = 0, vy = 0;

    if (keys["ArrowUp"] || keys["z"]) vy -= 1;
    if (keys["ArrowDown"] || keys["s"]) vy += 1;
    if (keys["ArrowLeft"] || keys["q"]) vx -= 1;
    if (keys["ArrowRight"] || keys["d"]) vx += 1;

    // diagonale
    if (vx !== 0 && vy !== 0) {
        vx *= Math.SQRT1_2;
        vy *= Math.SQRT1_2;
    }

    player.x += vx * player.speed;
    player.y += vy * player.speed;

    // limites
    if (player.x < player.size) player.x = player.size;
    if (player.x > canvas.width - player.size) player.x = canvas.width - player.size;
    if (player.y < player.size) player.y = player.size;
    if (player.y > canvas.height - player.size) player.y = canvas.height - player.size;
}

// FOND LIMINAL
let time = 0;

function drawBackground() {
    time += 0.01;

    const pulse = 20 + Math.sin(time) * 10;

    ctx.fillStyle = "#0d0d0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 2;

    for (let x = 0; x < canvas.width; x += pulse) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
}

// DESSIN JOUEUR
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
}

// LOOP
function loop() {
    drawBackground();
    updatePlayer();
    drawPlayer();
    requestAnimationFrame(loop);
}

loop();
