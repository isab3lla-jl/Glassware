import Sprite from "./Sprite.js";

export const NPC_STATES = {
    IDLE: "IDLE",
    SIDE: "SIDE",
    FRONT: "FRONT"
};

export default class NPC extends Sprite{
    constructor (x, y, dialogueKey = "key", animationConfig = {}, dialogueVariants = []) {
        super(x, y, 27, 33);

        this.dialogueKey = dialogueKey;
        this.animationConfig = animationConfig;
        this.dialogueVariants = dialogueVariants;
        this.active = true;
        this.state = NPC_STATES.IDLE;
        this.initAnimations(this.animationConfig);
    }

    update(dt) {
        this.updateSprite(dt);
    }

    playerIsNear(player) {
        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;
        const npcCenterX = this.x + this.width / 2;
        const npcCenterY = this.y + this.height / 2;

        const dx = playerCenterX - npcCenterX;
        const dy = playerCenterY - npcCenterY;

        return Math.hypot(dx, dy) < 90;
    }

    interact(chapterManager) {
        if (chapterManager) {
            return chapterManager.resolveDialogueKey(this.dialogueKey, this.dialogueVariants);
        }
        return this.dialogueKey;
    }

    draw(ctx, player) {
        super.draw(ctx);

        if (this.playerIsNear(player)) {
            
            const bounce = Math.sin(performance.now() / 150) * 3;
            
            const indicatorX = this.x + (this.width / 2);
            const indicatorY = this.y - 10 + bounce;
            
            ctx.save();

            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.beginPath();
            ctx.arc(indicatorX, indicatorY - 5, 10, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ff9500";
            ctx.font = "bold 12px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("E", indicatorX, indicatorY - 5);

            ctx.restore();
        }
    }
}