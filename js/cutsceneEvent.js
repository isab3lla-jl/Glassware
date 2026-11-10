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

        if (targetEntity && this.event.facing) {
            targetEntity.facing = this.event.facing;
            if (this.event.facing === "SIDE" && this.event.flipX !== undefined) {
                targetEntity.flipX = this.event.flipX;
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
}
