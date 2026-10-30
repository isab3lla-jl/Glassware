import Sprite from "./Sprite.js";

const NPC_STATES = {
    IDLE: "IDLE"
};

export default class NPC extends Sprite{
    constructor (x, y, dialogueKey = "npc_elder_intro") {
        super(x, y, 30);

        this.dialogueKey = dialogueKey;
        this.active = true;
        this.state = NPC_STATES.IDLE;
        this.initAnimations({
            //[NPC_STATES.IDLE]:  { src: "../assets/idle_sheet.png",  frameCount: 7, frameSpeed: 10, loop: true }
        });
    }

    update(dt) {
        this.updateSprite(dt);
    }

    playerIsNear(player) {
        const playerCenterX = player.x + player.size / 2;
        const playerCenterY = player.y + player.size / 2;
        const npcCenterX = this.x + this.size / 2;
        const npcCenterY = this.y + this.size / 2;

        const dx = playerCenterX - npcCenterX;
        const dy = playerCenterY - npcCenterY;

        return Math.hypot(dx, dy) < 90;
    }

    interact() {
        return this.dialogueKey;
    }

    draw(ctx, player) {
        super.draw(ctx);

        if (this.playerIsNear(player)) {
            
            const bounce = Math.sin(performance.now() / 150) * 3;
            
            const indicatorX = this.x + (this.size / 2);
            const indicatorY = this.y - 10 + bounce;

            ctx.save();

            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.beginPath();
            ctx.arc(indicatorX, indicatorY - 5, 10, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffae00";
            ctx.font = "bold 12px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("E", indicatorX, indicatorY - 5);

            ctx.restore();
        }
    }
}