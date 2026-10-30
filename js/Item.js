import Sprite from "./Sprite.js";

const ITEM_STATES = {
    IDLE: "IDLE",
    GRAB: "GRAB"
};
 
export default class Item extends Sprite{
    constructor(x, y, name = "item") {
        super(x, y, 20, 20);
        
        this.name = name;
        this.active = true;
        this.state = ITEM_STATES.IDLE;
        this.initAnimations({
            //[ITEM_STATES.IDLE]:  { src: "../assets/idle_sheet.png",  frameCount: 7, frameSpeed: 10, loop: true }
            //[ITEM_STATES.GRAB]:  { src: "../assets/idle_sheet.png",  frameCount: 7, frameSpeed: 10, loop: false }
        });
    }

    update(dt) {
        this.updateSprite(dt);
    }

    playerIsNear(player) {
        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;
        const itemCenterX = this.x + this.width / 2;
        const itemCenterY = this.y + this.height / 2;

        const dx = playerCenterX - itemCenterX;
        const dy = playerCenterY - itemCenterY;

        return Math.hypot(dx, dy) < 60;
    }

    grab() {
        this.state = ITEM_STATES.GRAB;
        this.active = false;
        return this.name;
    }

    draw(ctx, player) {
        if (!this.active) return;

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

            ctx.fillStyle = "#ffae00";
            ctx.font = "bold 12px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("E", indicatorX, indicatorY - 5);

            ctx.restore();
        }
    }
}