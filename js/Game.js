import Player from "./Player.js";
import NPC from "./Npc.js";
import DialogueManager, { loadDialogueData } from "./dialogueManager.js";

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.player = new Player(60, 70);

        this.dialogueManager = new DialogueManager();
        
        this.npc = [new NPC(420, 400, "Npc", "npc_elder_intro")];
        
        this.mapLoaded = false;
        this.mapData = null;
        this.mapImage = new Image();

        this.loadGameAssets();
        
        this.lastTime = 0;

        window.addEventListener('keydown', (e) => {
            console.log(e.key);
            if (e.key === 'Escape') this.togglePause();

             if (this.dialogueManager.isActive && (e.key === "Enter" || e.code === "Space")) {
                this.dialogueManager.nextLine();
                
                if (!this.dialogueManager.isActive) {
                    this.player.enabled = true;
                }
            }
        });
    }

    async loadGameAssets() {
        await loadDialogueData();
        const response = await fetch('../data/mapData.json');
        this.mapData = await response.json();
        
        this.mapImage.src = '../assets/Tilemaps/mockMapGlassware.png';
        this.mapImage.onload = () => {
            this.mapLoaded = true;
        };
    }
    

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.loop(time));
    }

    update(dt) {
        if (!this.mapLoaded) {
            console.log("Update pausado: esperando que mapLoaded sea true");
            return;
        }
        
        if (!this.dialogueManager.isActive) {
            this.player.update(dt, this.mapData);
        }

        for (let npc of this.npc) {
            npc.update(dt);

            if (!this.dialogueManager.isActive && npc.playerIsNear(this.player)) {
                if (this.player.keys.e) {
                    const key = npc.interact(); 
                    
                    this.dialogueManager.startDialogue(key);
                    
                    this.player.enabled = false;
                    this.player.keys.e = false; 
                    break;
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.mapLoaded) {
            this.ctx.drawImage(this.mapImage, 0, 0);
        }
        

        this.npc.forEach(npc => npc.draw(this.ctx, this.player));
        this.player.draw(this.ctx);

        if (this.dialogueManager.isActive) {
            this.dialogueManager.drawDialogue(this.ctx, this.canvas.width, this.canvas.height);
        }
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