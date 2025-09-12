// Проверка системной темы
export function checkSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-theme');
    }
}

// Переключение темы
export function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle == null)
        return

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });
}

// Инициализация
export function init() {
    checkSystemTheme();
    setupThemeToggle();
    createParticles();
    initCanvas()
}

function createParticles() {
    const container = document.getElementById('particles');

    if (container == null)
        return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();

        container.appendChild(particle);
    }
}

interface Wave {
    x: number
    y: number
    radius: number
    maxRadius: number
    opacity: number
    speed: number
    fadeStart: number
    hexagons: never[]
    progress: number
    dashArray: number
    dashOffset: number
}

export function initCanvas() {
    const canvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement;

    if (canvas == null)
        return

    const ctx = canvas.getContext('2d');

    if (ctx == null)
        return;

    function resizeCanvas() {
        const heroSection = document.querySelector('.hero') as HTMLDivElement;

        if (heroSection == null)
            return;

        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const waves: Wave[] = [];
    const MAX_WAVES = 4;

    let lastWaveTime = 0;
    const WAVE_COOLDOWN = 300;

    const mousePos = { x: -100, y: -100 };

    window.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left;
        mousePos.y = e.clientY - rect.top;

        const currentTime = Date.now();
        if (waves.length < MAX_WAVES && currentTime - lastWaveTime > WAVE_COOLDOWN) {
            createWave(mousePos.x, mousePos.y);
            lastWaveTime = currentTime;
        }
    });

    canvas.addEventListener('mouseleave', function() {
        mousePos.x = -100;
        mousePos.y = -100;
    });

    function createWave(x: number, y: number) {
        waves.push({
            x: x,
            y: y,
            radius: 5,
            maxRadius: 400,
            opacity: 1,
            speed: 1.0,
            fadeStart: 0.7,
            hexagons: [],
            progress: 0,
            dashArray: 0,
            dashOffset: 0
        });
    }

    function createHexagon(x: number, y: number, radius: number) {
        const points = [];
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            points.push({
                x: x + radius * Math.cos(angle),
                y: y + radius * Math.sin(angle)
            });
        }
        return points;
    }

    function draw() {
        if (ctx == null)
            return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = waves.length - 1; i >= 0; i--) {
            const wave = waves[i];

            wave.radius += wave.speed;

            if (wave.radius > wave.maxRadius * wave.fadeStart) {
                const fadeProgress = (wave.radius - wave.maxRadius * wave.fadeStart) / (wave.maxRadius * (1 - wave.fadeStart));
                wave.opacity = 1 - fadeProgress;
            }

            if (wave.radius > wave.maxRadius || wave.opacity <= 0) {
                waves.splice(i, 1);
                continue;
            }

            const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
            gradient.addColorStop(0, '#271230');
            gradient.addColorStop(0.5, '#271230');
            gradient.addColorStop(1, '#e5e9d3');

            const hexagonPoints = createHexagon(wave.x, wave.y, wave.radius);

            const perimeter = 6 * wave.radius;
            wave.progress = Math.min(wave.progress + 0.02, 1);
            wave.dashOffset = perimeter * wave.progress;

            ctx.setLineDash([perimeter]);
            ctx.lineDashOffset = wave.dashOffset;

            ctx.beginPath();
            ctx.moveTo(hexagonPoints[0].x, hexagonPoints[0].y);

            for (let j = 1; j < hexagonPoints.length; j++) {
                ctx.lineTo(hexagonPoints[j].x, hexagonPoints[j].y);
            }

            ctx.closePath();

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.globalAlpha = wave.opacity;
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.setLineDash([]);

            const offset = 25;
            const innerHexagon = createHexagon(wave.x, wave.y, wave.radius - offset);

            ctx.beginPath();
            ctx.moveTo(innerHexagon[0].x, innerHexagon[0].y);

            for (let j = 1; j < innerHexagon.length; j++) {
                ctx.lineTo(innerHexagon[j].x, innerHexagon[j].y);
            }

            ctx.closePath();
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = wave.opacity * 0.7;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        requestAnimationFrame(draw);
    }

    draw();
}

window.addEventListener("DOMContentLoaded", init)