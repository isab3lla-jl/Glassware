const ITEM_STATES = {
    IDLE: "IDLE",
    HOVER: "HOVER",
    GRAB: "GRAB"
};
 
export default class Item {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;

        this.state = ITEM_STATES.IDLE;
        //placeholder
        /*
        this.animations = {
            [ITEM_STATES.IDLE]: {
                texture: new Image(),
                frameCount: 7,
                frameSpeed: 0,
                currentFrame: 0,
                timer: 0,
                frameWidth: 0, 
                frameHeight: 0,
                loop: false
            },
            [ITEM_STATES.HOVER]: {
                texture: new Image(),
                frameCount: 8,
                frameSpeed: 12,
                currentFrame: 0,
                timer: 0,
                frameWidth: 0,
                frameHeight: 0,
                loop: false
            }
        };

        this.animations[ITEM_STATES.IDLE].texture.src = "../assets/";
        this.animations[ITEM_STATES.HOVER].texture.src = "../assets/";

        for (let key in this.animations) {
            const anim = this.animations[key];
            anim.texture.onload = () => {
                anim.frameWidth = anim.texture.width / anim.frameCount;
                anim.frameHeight = anim.texture.height;
            };
        }
*/

        this.canGrab = true;
    }

    update(dt)
    {

    }

    draw(ctx)
    {
        if (this.state === ITEM_STATES.IDLE) {
            ctx.fillStyle = "orange";
        } else if (this.state === ITEM_STATES.HOVER) {
            ctx.fillStyle = "red";
        } else if (this.state === ITEM_STATES.GRAB) {
            ctx.fillStyle = "crimson";
        }
        ctx.fillRect(this.x, this.y, this.size, this.size);
        /*const anim = this.animations[this.state];

        ctx.save();

        const centerX = this.x + this.size / 2;
        const centerY = this.y + this.size / 2;

        ctx.translate(centerX, centerY);

        const srcX = anim.frameWidth * anim.currentFrame;
        const srcY = 0;
        const srcW = anim.frameWidth;
        const srcH = anim.frameHeight;

        const destX = -this.size / 2;
        const destY = -this.size / 2;
        const destW = this.size;
        const destH = this.size;

        ctx.drawImage(
            anim.texture,
            srcX, srcY, srcW, srcH,
            destX, destY, destW, destH
        );

        ctx.restore();*/
    }
    
}