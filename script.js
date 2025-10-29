// --- CONFETI ---
const canvas = document.getElementById("confeti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetis = [];

function crearConfeti() {
    confetis = [];
    for (let i = 0; i < 200; i++) {
        confetis.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 0.02 + 0.01,
            color: Math.random() > 0.5 ? "#00ff88" : "#ffd700",
        });
    }
}

function dibujarConfeti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let c of confetis) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
    }
    actualizarConfeti();
}

function actualizarConfeti() {
    for (let c of confetis) {
        c.y += 3;
        c.x += Math.sin(c.d * 50);
        if (c.y > canvas.height) {
            c.y = -10;
            c.x = Math.random() * canvas.width;
        }
    }
}

function animarConfeti() {
    dibujarConfeti();
    requestAnimationFrame(animarConfeti);
}

document.getElementById("botonConfeti").addEventListener("click", () => {
    crearConfeti();
    animarConfeti();
});

// --- MÚSICA ---
const botonMusica = document.getElementById("botonMusica");
const musica = document.getElementById("musica");

botonMusica.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        botonMusica.textContent = "⏸️ Pausar música";
    } else {
        musica.pause();
        botonMusica.textContent = "🎵 Música Épica";
    }
});

// --- CARRUSEL ---
const slides = document.querySelector(".slides");
const imgs = document.querySelectorAll(".slides img");
let index = 0;

function cambiarSlide(n) {
    index += n;
    if (index < 0) index = imgs.length - 1;
    if (index >= imgs.length) index = 0;
    slides.style.transform = `translateX(${-index * 100}%)`;
}

document.getElementById("prev").addEventListener("click", () => cambiarSlide(-1));
document.getElementById("next").addEventListener("click", () => cambiarSlide(1));

// --- AUTO SLIDE ---
setInterval(() => cambiarSlide(1), 4000);

// --- AJUSTE AL REDIMENSIONAR ---
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
