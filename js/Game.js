import Player from "./Player.js";
import { NPC_STATES } from "./Npc.js";
import MapManager from "./MapManager.js";
import DialogueManager, { loadDialogueData, getEntry } from "./dialogueManager.js";
import ChapterManager, { CHAPTERS } from "./chapterManager.js";

const GAME_STATES = {
    MAIN_MENU: "MAIN_MENU",
    PLAY: "PLAY",
    PAUSE: "PAUSE",
    GAME_OVER: "GAME_OVER",
    GAME_END: "GAME_END"
}

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.domMenus = {
            main: document.getElementById("main-menu"),
            pause: document.getElementById("pause-menu"),
            gameOver: document.getElementById("game-over-menu"),
            gameEnd: document.getElementById("game-end-menu"),
            fade: document.getElementById("fade-overlay")
        };

        this.gameState = GAME_STATES.MAIN_MENU;
        this.player = new Player(60, 70);

        this.dialogueManager = new DialogueManager();
        this.lang = "en";
        document.getElementById('language-switcher').addEventListener('change', async (e) => {
            this.lang = e.target.value;
            await loadDialogueData(this.lang); 
        });
        
        this.chapterManager = new ChapterManager();
        this.mapManager = new MapManager();

        this.hint = null;

        this.npcs = [];
        this.items = [];

        this.inventory = [];
        this.discarded = [];
        this.maxInventorySlots = 6;

        this.titleCard = null;

        this.lastTime = 0;
        
        this.gameDuration = 100; //seconds
        this.timer = this.gameDuration;
        this.timerActive = false;

        this.setupMenuEvents();
        this.loadGameAssets();
    }

    setupMenuEvents() {
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                this.togglePause();
            }

            if (this.dialogueManager.isActive && (e.key === "Enter" || e.code === "Space")) {
                this.dialogueManager.nextLine(this);
                if (!this.dialogueManager.isActive) this.player.enabled = true;
            }
        });

        document.getElementById("btn-start").addEventListener("click", () => {
            this.changeState(GAME_STATES.PLAY);
            this.showChapterTitle();
        });

        document.getElementById("btn-resume").addEventListener("click", () => {
            //this.restartGame();
            this.changeState(GAME_STATES.PLAY);
        });

        const btnsExit = document.getElementsByClassName("btn-exit");
        for (let i = 0; i < btnsExit.length; i++) {
            btnsExit[i].addEventListener("click", async () => {
                await this.restartGame();
                this.changeState(GAME_STATES.MAIN_MENU);
            });
        }

        const btnsRestart = document.getElementsByClassName("btn-restart");
        for (let i = 0; i < btnsRestart.length; i++) {
            btnsRestart[i].addEventListener("click", async () => {
                await this.restartGame();
                this.showChapterTitle();
            });
        }
    }

    changeState(newState) {
        this.gameState = newState;

        this.domMenus.main.classList.add("hidden");
        this.domMenus.pause.classList.add("hidden");
        this.domMenus.gameOver.classList.add("hidden");
        this.domMenus.gameEnd.classList.add("hidden");

        if (this.gameState === GAME_STATES.MAIN_MENU) {
            this.domMenus.main.classList.remove("hidden");
        } else if (this.gameState === GAME_STATES.PAUSE) {
            this.domMenus.pause.classList.remove("hidden");
        } else if (this.gameState === GAME_STATES.GAME_OVER) {
            this.domMenus.gameOver.classList.remove("hidden");
        } else if (this.gameState === GAME_STATES.GAME_END) {
            this.domMenus.gameEnd.classList.remove("hidden");
        }
    }

    togglePause() {
        if (this.gameState === GAME_STATES.PLAY) {
            this.changeState(GAME_STATES.PAUSE);
        } else if (this.gameState === GAME_STATES.PAUSE) {
            this.changeState(GAME_STATES.PLAY);
        }
    }

    async restartGame() {
        this.mapManager.cancelCutscene(this);
        if (this.dialogueManager.isActive) this.dialogueManager.endDialogue();
        
        this.inventory = [];
        this.discarded = [];
        this.gameState = GAME_STATES.MAIN_MENU;

        this.chapterManager.reset()

        await this.mapManager.loadMap("bar", this);
        this.mapLoaded = this.mapManager.hasLoaded();

        this.timer = this.gameDuration;
        this.timerActive = false;

        this.player.state = "IDLE_FRONT";
        this.player.facing = "FRONT";
        this.player.enabled = true;

        if (this.player.animations["DEATH"]) {
            this.player.animations["DEATH"].currentFrame = 0;
            this.player.animations["DEATH"].timer = 0;
        }

        if (this.mapLoaded) {
            const spawn = this.mapManager.getDefaultSpawn(this);
            this.player.x = spawn.x;
            this.player.y = spawn.y;

            this.changeState(GAME_STATES.PLAY);
        }
    }

    async loadGameAssets() {
        const pixelFont = new FontFace(
            'PixelifySans',
            'url(./assets/fonts/PixelifySans-VariableFont_wght.ttf)'
        );

        const loadedFont = await pixelFont.load();
        document.fonts.add(loadedFont);
        
        await loadDialogueData(this.lang);
        await this.mapManager.loadMap("bar", this);
        this.mapLoaded = this.mapManager.hasLoaded();
        
        if (this.mapLoaded) {
            const spawn = this.mapManager.getDefaultSpawn(this);
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
            const overlapping =
                playerHitbox.right > trigger.x &&
                playerHitbox.left < trigger.x + trigger.width &&
                playerHitbox.bottom > trigger.y &&
                playerHitbox.top < trigger.y + trigger.height;

            if (!overlapping) {
                trigger.locked = false;
                continue;
            }

            if (trigger.disabledByFlag && this.chapterManager.getFlag(trigger.disabledByFlag)) {
                continue;
            }

            if (trigger.requiredFlag && !this.chapterManager.getFlag(trigger.requiredFlag)) {
                continue;
            }

            if (trigger.cutscene) {
                if (this.chapterManager.getFlag(trigger.flagRequired)) {
                    continue;
                }

                this.chapterManager.setFlag(trigger.flagRequired, true);

                this.mapManager.startCutscene(trigger.cutscene, this);
                break;
            }

            if (trigger.dialogueKey) {
                if (trigger.repeatable) {
                    if (trigger.locked) continue;
                    trigger.locked = true;
                } else if (this.chapterManager.getFlag(trigger.flagRequired)) {
                    continue;
                }

                if (trigger.flagRequired) {
                    this.chapterManager.setFlag(trigger.flagRequired, true);
                }

                const key = this.chapterManager.resolveDialogueKey(
                    trigger.dialogueKey,
                    trigger.dialogueVariants
                );

                this.dialogueManager.startDialogue(key);
                this.player.enabled = !this.dialogueManager.isActive;
                break;
            }

            if (trigger.requiredItem) {
                const itemIndex = this.inventory.indexOf(trigger.requiredItem);

                if ((itemIndex === -1)) {
                    continue;
                }
                this.discarded.push(trigger.requiredItem);
                console.log(this.discarded);
                this.inventory.splice(itemIndex, 1);
            }

            if (trigger.advanceChapter) {
                this.advanceChapter(trigger.advanceChapter);
                break;
            }

            delete trigger.requiredItem;
            console.log(trigger.requiredItem);
            this.executeMapTransition(trigger.targetMap, trigger.targetPlayerX, trigger.targetPlayerY);
            break;
        }
    }

    async executeMapTransition(nextMapKey, newX, newY) {
        this.gameState = GAME_STATES.MAIN_MENU;
        
        const success = await this.mapManager.loadMap(nextMapKey, this);
        
        if (success) {
            this.player.x = newX;
            this.player.y = newY;
            this.gameState = GAME_STATES.PLAY;

            if (nextMapKey === "room" && !this.chapterManager.getFlag("sawRoomCutscene")) {
                
                this.chapterManager.setFlag("sawRoomCutscene", true);

                const roomCutscene = [
                    { type: "WALK", who: "player", direction: "UP", time: 400 },
                    { type: "WALK", who: "player", direction: "LEFT", time: 500 },
                    { type: "WALK", who: "player", direction: "UP", time: 800 },
                    { type: "WALK", who: "player", direction: "RIGHT", time: 1100 },
                    { type: "STAND", who: "player", direction: "RIGHT", time: 500 },
                    { type: "FADE", direction: "IN" },
                    { type: "CHANGE_MAP", targetMap: "roomChest", x: 422, y: 168 },
                    { type: "STAND", who: "player", direction: "LEFT", time: 50 },
                    { 
                        type: "ADD_NPC", 
                        npcKey: "onyx", 
                        x: 250, 
                        y: 290,
                        animationConfig: {
                            [NPC_STATES.IDLE]:       { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 6, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.IDLE_FRONT]: { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 6, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.IDLE_SIDE]:  { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 4, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.IDLE_BACK]:  { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 5, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.MOVE_FRONT]: { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 3, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.MOVE_SIDE]:  { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 1, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.MOVE_BACK]:  { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 2, totalRows: 6, frameSpeed: 4, loop: true }
                        }
                    },
                    { type: "FADE", direction: "OUT"},
                    { type: "STAND", who: "onyx", direction: "DOWN", time: 500 },
                    { type: "WALK", who: "onyx", direction: "UP", time: 970, },
                    { type: "WALK", who: "onyx", direction: "RIGHT", time: 750, },
                    { type: "TEXT", key: "first_onyx_cutscene" },
                    { type: "FADE", direction: "IN" },
                    { type: "REMOVE_NPC", npcKey: "onyx"},
                    { type: "FADE", direction: "OUT"},
                    { type: "WALK", who: "player", direction: "LEFT", time: 1100 },
                    { type: "WALK", who: "player", direction: "DOWN", time: 800 },
                    { type: "WALK", who: "player", direction: "RIGHT", time: 500 },
                    { type: "WALK", who: "player", direction: "DOWN", time: 230 },
                    { type: "FADE", direction: "IN" },
                    { 
                        type: "ADD_NPC", 
                        npcKey: "onyx", 
                        x: 250, 
                        y: 170,
                        animationConfig: {
                            [NPC_STATES.IDLE]:       { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 6, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.IDLE_FRONT]: { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 6, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.IDLE_SIDE]:  { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 4, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.IDLE_BACK]:  { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 5, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.MOVE_FRONT]: { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 3, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.MOVE_SIDE]:  { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 1, totalRows: 6, frameSpeed: 4, loop: true },
                            [NPC_STATES.MOVE_BACK]:  { src: "../assets/CharSprites/Onyx-Sheet.png", frameCount: 2, colsPerRow: 2, frameRow: 2, totalRows: 6, frameSpeed: 4, loop: true }
                        }
                    },
                    { type: "FADE", direction: "OUT"},
                    { type: "TEXT", key: "first_onyx_cutscene_pt2" },
                    { type: "WALK", who: "player", direction: "RIGHT", time: 850 },
                    { type: "WALK", who: "player", direction: "UP", time: 250 },
                    { type: "STAND", who: "player", direction: "RIGHT", time: 500 },
                    { type: "TEXT", key: "first_onyx_cutscene_pt3" },
                    { type: "FADE", direction: "IN" },
                    { type: "REMOVE_NPC", npcKey: "onyx"},
                    { type: "FADE", direction: "OUT"},
                    { type: "STAND", who: "player", direction: "DOWN", time: 500 },
                    { type: "START_TIMER" }
//                  { type: "GAME_END" }
                ];

                this.mapManager.startCutscene(roomCutscene, this);
            }
        }
    }

    advanceChapter(nextChapter = null) {
        this.mapManager.startCutscene([
            { type: "FADE", direction: "IN" },
            { type: "ADVANCE_CHAPTER", chapter: nextChapter },
            { type: "TITLE_CARD" }
        ], this);
    }

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.loop(time));
    }

    update(dt) {
        //console.log(this.discarded)
        if (!this.mapLoaded) {
            console.log("Update pausado: esperando que mapLoaded sea true");
            return;
        }

        if (this.gameState !== GAME_STATES.PLAY) return;

        if (this.player.state === "DEATH") {
            this.player.updateSprite(dt); 

            if (this.player.isAnimationFinished()) {
                this.changeState(GAME_STATES.GAME_OVER);
            }
            return;
        }

        this.player.updateCutsceneMovement(dt);

        if (!this.dialogueManager.isActive && !this.mapManager.isCutscenePlaying) {
            //console.log(this.player.x, this.player.y, this.player.animationConfig);
            this.player.update(dt, this.mapManager.getCurrentData(), this.timer);
            this.checkMapTriggers();

            if (this.timerActive) {
                this.timer -= dt;
                if (this.timer <= 0) {
                    this.timer = 0;
                    this.player.state = "DEATH";
                    this.player.enabled = false;
                }
            }

            
        }

        for (let npc of this.npcs) {
            npc.update(dt);
            npc.updateCutsceneMovement(dt);

            if (!this.dialogueManager.isActive && !this.mapManager.isCutscenePlaying && npc.playerIsNear(this.player)) {
                if (this.player.keys.e) {
                    const key = npc.interact(this.chapterManager);
                    
                    this.dialogueManager.startDialogue(key);
                    this.chapterManager.setFlag("tutorialInteract", true);
                    
                    this.player.enabled = false;
                    this.player.keys.e = false; 
                    break;
                }
            }
        }

        for (let items of this.items) {
            if (this.inventory.includes(items.name) || this.discarded.includes(items.name)) {
                items.active = false;
            }

            if (!items.active) continue;

            items.update(dt);

            if (this.dialogueManager.isActive || this.mapManager.isCutscenePlaying) continue;

            if (items.playerIsNear(this.player) && this.player.keys.e) {
                if (this.inventory.length < this.maxInventorySlots) {
                    const itemName = items.grab();
                    this.inventory.push(itemName);
                    this.chapterManager.setFlag("tutorialInteract", true);

                    if (items.triggerFlag) {
                        this.chapterManager.setFlag(items.triggerFlag, true);
                    }

                    if (items.dialogueKey) {
                        this.dialogueManager.startDialogue(items.dialogueKey);
                        this.player.enabled = false;
                    }
                } else {
                    console.log("full inventory");
                }

                this.player.keys.e = false;
                break;
            }
        }

        this.updateHint();
    }

    updateHint() {
        this.hint = null;

        const onTutorialMap =
            this.chapterManager.currentChapter === CHAPTERS.PROLOGUE && this.mapManager.currentMapKey === "bar";

        if (!onTutorialMap) return;
        if (this.dialogueManager.isActive || this.mapManager.isCutscenePlaying) return;

        if (!this.chapterManager.getFlag("tutorialMove")) {
            if (this.player.speedX !== 0 || this.player.speedY !== 0) {
                this.chapterManager.setFlag("tutorialMove", true);
            } else {
                this.hint = "hint_move";
            }
            return;
        }

        if (!this.chapterManager.getFlag("tutorialInteract")) {
            const nearSomething =
                this.npcs.some(n => n.showPrompt !== false && n.playerIsNear(this.player)) ||
                this.items.some(i => i.active && i.playerIsNear(this.player));

            if (nearSomething) this.hint = "hint_interact";
        }
    }

    drawHint() {
        if (!this.hint || this.gameState !== GAME_STATES.PLAY) return;

        const text = getEntry(this.hint)?.text;
        if (!text) return;

        const ctx = this.ctx;
        ctx.save();

        ctx.font = "16px 'PixelifySans'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const boxW = ctx.measureText(text).width + 32;
        const boxH = 34;
        const x = (this.canvas.width - boxW) / 2;
        const y = 20;

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.strokeStyle = "#ff9500";
        ctx.lineWidth = 2;
        ctx.fillRect(x, y, boxW, boxH);
        ctx.strokeRect(x, y, boxW, boxH);

        ctx.fillStyle = "#ffffff";
        ctx.fillText(text, this.canvas.width / 2, y + boxH / 2);

        ctx.restore();
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.ceil(seconds % 60);

        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${paddedMinutes}:${paddedSeconds}`;
    }

    showChapterTitle() {
        const key = `title_${this.chapterManager.currentChapter.toLowerCase()}`;
        this.mapManager.startCutscene([
            { type: "TITLE_CARD", key }
        ], this);
    }

    drawTitleCard() {
        const card = this.titleCard;
        if (!card) return;

        const elapsed = performance.now() - card.startTime;
        let alpha;
        if (elapsed < card.fadeIn) {
            alpha = elapsed / card.fadeIn;
        } else if (elapsed < card.fadeIn + card.hold) {
            alpha = 1;
        } else {
            alpha = 1 - (elapsed - card.fadeIn - card.hold) / card.fadeOut;
        }
        alpha = Math.max(0, Math.min(1, alpha));

        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;

        this.ctx.save();
        this.ctx.globalAlpha = alpha;

        this.ctx.fillStyle = "#0A0A14FF";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "40px 'PixelifySans'";
        this.ctx.fillText(card.title, cx, card.subtitle ? cy - 15 : cy);

        if (card.subtitle) {
            this.ctx.fillStyle = "#ff9500";
            this.ctx.font = "18px 'PixelifySans'";
            this.ctx.fillText(card.subtitle, cx, cy + 25);
        }

        this.ctx.restore();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.mapLoaded) {
            this.ctx.drawImage(this.mapManager.getScaleImage(), 0, 0);
        }

        if (this.gameState === GAME_STATES.PLAY && this.timerActive) {
            this.ctx.save();
            this.ctx.fillStyle = "#eeeeee";
            this.ctx.font = "20px 'PixelifySans'";
            this.ctx.shadowColor = "black";
            this.ctx.shadowBlur = 4;
            this.ctx.fillText(`${this.formatTime(this.timer)}`, 20, 40);
            this.ctx.restore();
        }

        /*if (this.mapManager.hasLoaded() && this.gameState === GAME_STATES.PLAY) {
            const triggers = this.mapManager.getTriggers();
            
            this.ctx.save();
            triggers.forEach(trigger => {
                this.ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
                this.ctx.fillRect(trigger.x, trigger.y, trigger.width, trigger.height);
                
                this.ctx.strokeStyle = "#00ff00";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(trigger.x, trigger.y, trigger.width, trigger.height);

                this.ctx.fillStyle = "#ffffff";
                this.ctx.font = "10px 'PixelifySans'";
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                this.ctx.fillText(
                    `A: ${trigger.targetMap}`, 
                    trigger.x + (trigger.width / 2), 
                    trigger.y + (trigger.height / 2)
                );
            });
            this.ctx.restore();
        }*/
        
        for (let items of this.items) {
            if ((!this.inventory.includes(items.name) && !this.discarded.includes(items.name)) && items.active) {
                items.draw(this.ctx, this.player);
            }
        }
        this.npcs.forEach(npcs => npcs.draw(this.ctx, this.player));
        this.player.draw(this.ctx);
        
        if (this.gameState === GAME_STATES.PLAY || this.gameState === GAME_STATES.PAUSE) this.drawHotbar();

        if (this.dialogueManager.isActive) {
            this.dialogueManager.drawDialogue(this.ctx, this.canvas.width, this.canvas.height);
        }

        this.drawHint();
        this.drawTitleCard();
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

        this.ctx.fillStyle = "rgba(76, 38, 38, 0.69)";
        this.ctx.strokeStyle = "#3f1818";
        this.ctx.lineWidth = 3;
        this.ctx.fillRect(x, y, hotbarWidth, hotbarHeight);
        this.ctx.strokeRect(x, y, hotbarWidth, hotbarHeight);

        for (let i = 0; i < slots; i++) {
            const slotX = x + padding + (i * (slotSize + padding));
            const slotY = y + padding;

            this.ctx.fillStyle = "rgba(90, 42, 42, 0.69)";
            this.ctx.strokeStyle = "#3f1818";
            this.ctx.lineWidth = 2;
            this.ctx.fillRect(slotX, slotY, slotSize, slotSize);
            this.ctx.strokeRect(slotX, slotY, slotSize, slotSize);

            if (this.inventory[i]) {
                this.ctx.fillStyle = "#ffffff";
                this.ctx.font = "10px 'PixelifySans'";
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";

                //ctx.drawImage(itemIcon, slotX + 4, 32, 32);
                this.ctx.fillText(this.inventory[i].substring(0, 5), slotX + (slotSize / 2), slotY + (slotSize / 2));
            }
        }

        this.ctx.restore();
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