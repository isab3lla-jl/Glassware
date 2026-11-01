import Player from "./Player.js";
import MapManager from "./MapManager.js";
import DialogueManager, { loadDialogueData } from "./dialogueManager.js";

const GAME_STATES = {
    MAIN_MENU: "MAIN_MENU",
    PLAY: "PLAY",
    PAUSE: "PAUSE",
    GAME_OVER: "GAME_OVER"
}

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.domMenus = {
            main: document.getElementById("main-menu"),
            pause: document.getElementById("pause-menu"),
            gameOver: document.getElementById("game-over-menu")
        };

        this.gameState = GAME_STATES.MAIN_MENU;
        this.player = new Player(60, 70);
        this.dialogueManager = new DialogueManager();
        
        this.mapManager = new MapManager()

        this.npcs = [];
        this.items = [];

        this.inventory = [];
        this.maxInventorySlots = 6;

        this.lastTime = 0;

        this.setupMenuEvents();
        this.loadGameAssets();
    }

    setupMenuEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.togglePause();
            }

            if (this.dialogueManager.isActive && (e.key === "Enter" || e.code === "Space")) {
                this.dialogueManager.nextLine();
                if (!this.dialogueManager.isActive) this.player.enabled = true;
            }
        });

        document.getElementById("btn-start").addEventListener("click", () => {
            this.changeState(GAME_STATES.PLAY);
        });

        document.getElementById("btn-resume").addEventListener("click", () => {
            this.changeState(GAME_STATES.PLAY);
        });

        const btnExit = document.getElementById("btn-exit");
        if (btnExit) {
            btnExit.addEventListener("click", () => {
                this.changeState(GAME_STATES.MAIN_MENU);
            });
        }

        document.getElementById("btn-restart").addEventListener("click", () => {
            this.restartGame();
        });
    }

    changeState(newState) {
        this.gameState = newState;

        this.domMenus.main.classList.add("hidden");
        this.domMenus.pause.classList.add("hidden");
        this.domMenus.gameOver.classList.add("hidden");

        if (this.gameState === GAME_STATES.MAIN_MENU) {
            this.domMenus.main.classList.remove("hidden");
        } else if (this.gameState === GAME_STATES.PAUSE) {
            this.domMenus.pause.classList.remove("hidden");
        } else if (this.gameState === GAME_STATES.GAME_OVER) {
            this.domMenus.gameOver.classList.remove("hidden");
        }
    }

    togglePause() {
        if (this.gameState === GAME_STATES.PLAY) {
            this.changeState(GAME_STATES.PAUSE);
        } else if (this.gameState === GAME_STATES.PAUSE) {
            this.changeState(GAME_STATES.PLAY);
        }
    }

    restartGame() {
        this.inventory = [];
        this.player.x = 60;
        this.player.y = 70;
        this.player.enabled = true;
        
        this.items.forEach(item => item.active = true);

        this.changeState(GAME_STATES.PLAY);
    }

    async loadGameAssets() {
        await loadDialogueData();
        await this.mapManager.loadMap("map1", this);
        this.mapLoaded = this.mapManager.hasLoaded();
        
        if (this.mapLoaded) {
            const spawn = this.mapManager.getDefaultSpawn();
            this.player.x = spawn.x;
            this.player.y = spawn.y;
        }
    }

    checkMapTriggers() {
        const triggers = this.mapManager.getTriggers();
        const playerHitbox = {
            left: this.player.x + this.player.hitboxOffset.x,
            right: this.player.x + this.player.hitboxOffset.x + this.player.hitboxWidth,
            top: this.player.y + this.player.hitboxOffset.y,
            bottom: this.player.y + this.player.hitboxOffset.y + this.player.hitboxHeight
        };

        for (let trigger of triggers) {
            if (playerHitbox.right > trigger.x &&
                playerHitbox.left < trigger.x + trigger.width &&
                playerHitbox.bottom > trigger.y &&
                playerHitbox.top < trigger.y + trigger.height) {
                
                this.executeMapTransition(trigger.targetMap, trigger.targetPlayerX, trigger.targetPlayerY);
                break;
            }
        }
    }

    async executeMapTransition(nextMapKey, newX, newY) {
        this.gameState = GAME_STATES.MAIN_MENU;
        
        console.log(`Next zone: ${nextMapKey}...`);
        const success = await this.mapManager.loadMap(nextMapKey, this);
        
        if (success) {
            this.player.x = newX;
            this.player.y = newY;
            this.gameState = GAME_STATES.PLAY;
        }
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

        if (this.gameState !== GAME_STATES.PLAY) return;
        
        if (!this.dialogueManager.isActive) {
            this.player.update(dt, this.mapManager.getCurrentData());
            this.checkMapTriggers();
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
            this.ctx.drawImage(this.mapManager.getScaleImage(), 0, 0);
        }

        if (this.mapManager.hasLoaded() && this.gameState === GAME_STATES.PLAY) {
            const triggers = this.mapManager.getTriggers();
            
            this.ctx.save();
            triggers.forEach(trigger => {
                this.ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
                this.ctx.fillRect(trigger.x, trigger.y, trigger.width, trigger.height);
                
                this.ctx.strokeStyle = "#00ff00";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(trigger.x, trigger.y, trigger.width, trigger.height);

                this.ctx.fillStyle = "#ffffff";
                this.ctx.font = "bold 10px monospace";
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                this.ctx.fillText(
                    `A: ${trigger.targetMap}`, 
                    trigger.x + (trigger.width / 2), 
                    trigger.y + (trigger.height / 2)
                );
            });
            this.ctx.restore();
        }
        

        this.items.forEach(items => items.draw(this.ctx, this.player));
        this.npcs.forEach(npcs => npcs.draw(this.ctx, this.player));
        this.player.draw(this.ctx);
        
        if (this.gameState === GAME_STATES.PLAY || this.gameState === GAME_STATES.PAUSE) this.drawHotbar();

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