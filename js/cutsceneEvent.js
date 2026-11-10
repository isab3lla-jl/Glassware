export default class CutsceneEvent {
    constructor({ map, event, gameInstance }) {
        this.map = map;
        this.event = event;
        this.gameInstance = gameInstance;
    }

    init() {
        return new Promise((resolve) => {
            this[this.event.type](resolve);
        });
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
            setTimeout(() => resolve(), this.event.time);
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

        document.addEventListener("finished_free_walk", handleMoveComplete);
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

        document.addEventListener("dialogue_finished", handleDialogueComplete);
        this.gameInstance.dialogueManager.startDialogue(this.event.key);
    }

    GAME_END(resolve) {
        if (!this.gameInstance) {
            resolve();
            return;
        }
        this.gameInstance.changeState("GAME_END");
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
                fadeEl.classList.add("show-black");
            });
            
            setTimeout(() => {
                resolve();
            }, fadeDuration);

        } else if (this.event.direction === "OUT") {
            fadeEl.classList.remove("show-black");

            setTimeout(() => {
                fadeEl.classList.add("hidden");
                resolve();
            }, fadeDuration);
        }
    }

}
