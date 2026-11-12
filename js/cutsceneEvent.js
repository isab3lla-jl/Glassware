import NPC from "./Npc.js";
import { getEntry } from "./dialogueManager.js";

export default class CutsceneEvent {
    constructor({ map, event, gameInstance }) {
        this.map = map;
        this.event = event;
        this.gameInstance = gameInstance;

        this.timeouts = [];
        this.listeners = [];
        this.cancelled = false;
        this._resolve = null;
    }

    init() {
        return new Promise((resolve) => {
            this._resolve = resolve;
            this[this.event.type](resolve);
        });
    }

    _setTimeout(fn, ms) {
        this.timeouts.push(setTimeout(fn, ms));
    }

    _addListener(name, handler) {
        document.addEventListener(name, handler);
        this.listeners.push([name, handler]);
    }

    cancel() {
        this.cancelled = true;
        this.timeouts.forEach(clearTimeout);
        this.listeners.forEach(([name, handler]) => document.removeEventListener(name, handler));
        this.timeouts = [];
        this.listeners = [];
        if (this._resolve) this._resolve();
    }

    STAND(resolve) {
        const targetEntity = this.event.who === "player" 
            ? this.gameInstance.player 
            : this.map.activeNpcs.find(n => n.key === this.event.who);

        if (targetEntity && this.event.direction) {
            const dir = this.event.direction;

            if (dir === "LEFT") {
                targetEntity.state = "IDLE_SIDE";
                targetEntity.facing = "SIDE";
                targetEntity.flipX = true;
            } else if (dir === "RIGHT") {
                targetEntity.state = "IDLE_SIDE";
                targetEntity.facing = "SIDE";
                targetEntity.flipX = false;
            } else if (dir === "UP") {
                targetEntity.state = "IDLE_BACK";
                targetEntity.facing = "BACK";
            } else if (dir === "DOWN") {
                targetEntity.state = "IDLE_FRONT";
                targetEntity.facing = "FRONT";
            }
        }

        if (this.event.time) {
            this._setTimeout(() => resolve(), this.event.time);
        } else {
            resolve();
        }
    }


    WALK(resolve) {
        const targetEntity = this.event.who === "player" 
            ? this.gameInstance.player 
            : this.map.activeNpcs.find(n => n.key === this.event.who);

        if (!targetEntity) {
            resolve();
            return;
        }

        const targetKey = this.event.who === "player" ? "player" : this.event.who;

        const handleMoveComplete = (e) => {
            if (e.detail.npcKey === targetKey) {
                document.removeEventListener("finished_free_walk", handleMoveComplete);
                resolve();
            }
        };

        this._addListener("finished_free_walk", handleMoveComplete);
        const duration = this.event.time || 500;
        targetEntity.startCutsceneWalk(this.event.direction, duration);
    }

    TEXT(resolve) {
        if (!this.gameInstance || !this.gameInstance.dialogueManager) {
            resolve();
            return;
        }

        const handleDialogueComplete = () => {
            document.removeEventListener("dialogue_finished", handleDialogueComplete);
            resolve();
        };

        this._addListener("dialogue_finished", handleDialogueComplete);
        this.gameInstance.dialogueManager.startDialogue(this.event.key);
    }

    ADD_NPC(resolve) {
        if (!this.gameInstance || !this.map) {
            resolve();
            return;
        }

        const newNpc = new NPC(
            this.event.x, 
            this.event.y, 
            this.event.npcKey
        );

        newNpc.key = this.event.npcKey;
        newNpc.showPrompt = false;

        if (this.event.animationConfig) {
            newNpc.initAnimations(this.event.animationConfig);
        }

        
        this.map.activeNpcs.push(newNpc);
        this.gameInstance.npcs = this.map.activeNpcs;

        resolve();
    }

    
    REMOVE_NPC(resolve) {
        if (!this.gameInstance || !this.map) {
            resolve();
            return;
        }

        const npcToLeave = this.event.npcKey;

        this.map.activeNpcs = this.map.activeNpcs.filter(n => n.key !== npcToLeave);
        this.gameInstance.npcs = this.map.activeNpcs;

        console.log(`[Cutscene] NPC '${npcToLeave}' has been removed`);
        
        resolve();
    }

        
    async CHANGE_MAP(resolve) {
        if (!this.gameInstance) {
            resolve();
            return;
        }

        console.log(`[Cutscene] Map change to: ${this.event.targetMap}`);

        await this.gameInstance.executeMapTransition(
            this.event.targetMap, 
            this.event.x, 
            this.event.y
        );

        if (this.cancelled) return;

        this.gameInstance.player.enabled = false;

        this._setTimeout(() => resolve(), 100);
    }

    START_TIMER(resolve) {
        const game = this.gameInstance;
        if (game) {
            if (this.event.reset) game.timer = game.gameDuration;
            game.timerActive = true;
        }
        resolve();
    }

    STOP_TIMER(resolve) {
        if (this.gameInstance) this.gameInstance.timerActive = false;
        resolve();
    }


    FADE(resolve) {
        if (!this.gameInstance || !this.gameInstance.domMenus.fade) {
            resolve();
            return;
        }

        const fadeEl = this.gameInstance.domMenus.fade;
        const fadeDuration = this.event.time || 800;

        if (this.event.direction === "IN") {
            fadeEl.classList.remove("hidden");

            requestAnimationFrame(() => {
                if (!this.cancelled) {
                    fadeEl.classList.add("show-black");
                }
            });

            this._setTimeout(() => {
                resolve();
            }, fadeDuration);

        } else if (this.event.direction === "OUT") {
            fadeEl.classList.remove("show-black");

            this._setTimeout(() => {
                fadeEl.classList.add("hidden");
                resolve();
            }, fadeDuration);
        }
    }

    TITLE_CARD(resolve) {
        const game = this.gameInstance;
        if (!game) {
            resolve();
            return;
        }

        const key = this.event.key
            ?? `title_${game.chapterManager.currentChapter.toLowerCase()}`;
        const entry = getEntry(key) || {};

        const fadeEl = game.domMenus.fade;
        const fromBlack = fadeEl && fadeEl.classList.contains("show-black");
        if (fromBlack) {
            fadeEl.classList.remove("show-black");
            fadeEl.classList.add("hidden");
        }

        const fadeIn = fromBlack ? 0 : (this.event.fadeIn ?? 600);
        const hold = this.event.hold ?? 2000;
        const fadeOut = this.event.fadeOut ?? 600;

        game.titleCard = {
            title: entry.title ?? this.event.title ?? "",
            subtitle: entry.subtitle ?? this.event.subtitle ?? "",
            startTime: performance.now(),
            fadeIn, hold, fadeOut
        };

        this._setTimeout(() => {
            game.titleCard = null;
            resolve();
        }, fadeIn + hold + fadeOut);
    }

    ADVANCE_CHAPTER(resolve) {
        const game = this.gameInstance;

        if (!game || !game.chapterManager.advanceChapter(this.event.chapter)) {
            resolve();
            return;
        }

        const startMap = this.event.startMap
            ?? this.map.getChapterStartMap(game.chapterManager.currentChapter);

        this.map.loadMap(startMap, game).then((success) => {
            if (this.cancelled) return;

            if (success) {
                const spawn = this.event.spawn ?? this.map.getDefaultSpawn(game);
                game.player.x = spawn.x;
                game.player.y = spawn.y;

                if (this.event.resetTimer) game.timer = game.gameDuration;
                if (this.event.clearInventory) {
                    game.inventory = [];
                    game.discarded = [];
                }
            }
            resolve();
        });
    }

    GAME_END(resolve) {
        if (!this.gameInstance) {
            resolve();
            return;
        }
        this.gameInstance.changeState("GAME_END");
        resolve();
    }
}
