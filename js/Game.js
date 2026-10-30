import Player from "./Player.js";
import NPC from "./Npc.js";
import Item from "./Item.js";
import DialogueManager, { loadDialogueData } from "./dialogueManager.js";

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.player = new Player(60, 70);

        this.dialogueManager = new DialogueManager();
        
        this.npcs = [new NPC(420, 400, "npc_elder_intro")];

        this.items = [new Item(480, 100, "67")];

        this.inventory = [];
        this.maxInventorySlots = 6;
        
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

        for (let npcs of this.npcs) {
            npcs.update(dt);

            if (!this.dialogueManager.isActive && npcs.playerIsNear(this.player)) {
                if (this.player.keys.e) {
                    const key = npcs.interact(); 
                    
                    this.dialogueManager.startDialogue(key);
                    
                    this.player.enabled = false;
                    this.player.keys.e = false; 
                    break;
                }
            }
        }

        for (let items of this.items) {
            if (!items.active) continue;

            items.update(dt);

            if (items.playerIsNear(this.player) && this.player.keys.e) {
                if (this.inventory.length < this.maxInventorySlots) {
                    const itemName = items.grab();
                    this.inventory.push(itemName);
                } else {
                    console.log("full inventory")
                }

                this.player.keys.e = false;
                break;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.mapLoaded) {
            this.ctx.drawImage(this.mapImage, 0, 0);
        }
        

        this.items.forEach(items => items.draw(this.ctx, this.player));
        this.npcs.forEach(npcs => npcs.draw(this.ctx, this.player));
        this.player.draw(this.ctx);
        
        this.drawHotbar();

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

    drawHotbar(){
        const slots = this.maxInventorySlots;
        const slotSize = 32;
        const padding = 4;
        const hotbarWidth = (slotSize * slots) + (padding * (slots + 1));
        const hotbarHeight = slotSize + (padding * 2);

        const x = (this.canvas.width - hotbarWidth) / 2;
        const y = this.canvas.height - hotbarHeight - 20;

        this.ctx.save();

        this.ctx.fillStyle = "rgba(60, 60, 60, 0.85)";
        this.ctx.strokeStyle = "#1e1e1e";
        this.ctx.lineWidth = 3;
        this.ctx.fillRect(x, y, hotbarWidth, hotbarHeight);
        this.ctx.strokeRect(x, y, hotbarWidth, hotbarHeight);

        for (let i = 0; i < slots; i++) {
            const slotX = x + padding + (i * (slotSize + padding));
            const slotY = y + padding;

            this.ctx.fillStyle = "rgba(139, 139, 139, 0.5)";
            this.ctx.strokeStyle = "#373737";
            this.ctx.lineWidth = 2;
            this.ctx.fillRect(slotX, slotY, slotSize, slotSize);
            this.ctx.strokeRect(slotX, slotY, slotSize, slotSize);

            if (this.inventory[i]) {
                this.ctx.fillStyle = "#ffffff";
                this.ctx.font = "10px sans-serif";
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";

                //ctx.drawImage(itemIcon, slotX + 4, 32, 32);
                this.ctx.fillText(this.inventory[i].substring(0, 5), slotX + (slotSize / 2), slotY + (slotSize / 2));
            }
        }

        this.ctx.restore();
    }
}