import Player from './Player.js';

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.player = new Player(60, 70);
        
        this.mapLoaded = false;
        this.mapData = null;
        this.mapImage = new Image();

        this.loadMap('../data/mapData.json', '../assets/Tilemaps/mockMapGlassware.png');
        
        this.lastTime = 0;

        window.addEventListener('keydown', (e) => {
            console.log(e.key);
            if (e.key === 'Escape') this.togglePause();
        });
    }

    async loadMap(jsonPath, pngPath) {
        const response = await fetch(jsonPath);
        this.mapData = await response.json();
        
        this.mapImage.src = pngPath;
        this.mapImage.onload = () => {
            this.mapLoaded = true;
        };
    }

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.loop(time));
    }

    update(dt) {
        if (!this.mapLoaded) return;
        this.player.update(dt, this.mapData);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.mapLoaded) {
            this.ctx.drawImage(this.mapImage, 0, 0);
        }
        
        this.player.draw(this.ctx);
    }

    loop(currentTime) {
        const dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        // Límite de dt para evitar colapsos al cambiar de pestaña
        if (dt < 0.1) { 
                this.update(dt);
        }
        this.draw();
        requestAnimationFrame((time) => this.loop(time));
    }
}