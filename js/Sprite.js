export default class Sprite {
    constructor(x, y, size = 60) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.state = "IDLE"; 
        this.animations = {};
        this.flipX = false;
    }

    initAnimations(animationConfig) {
        this.animations = animationConfig;

        for (let key in this.animations) {
            const anim = this.animations[key];
            anim.texture = new Image();
            anim.texture.src = anim.src;
            anim.currentFrame = 0;
            anim.timer = 0;
            anim.frameWidth = 0;
            anim.frameHeight = 0;
            

            anim.texture.onload = () => {
                const cols = anim.colsPerRow || anim.frameCount;
                anim.frameWidth = anim.texture.width / cols;
                const rows = anim.totalRows || 1; 
                anim.frameHeight = anim.texture.height / rows;
            };
        }
    }

    updateSprite(dt) {

        const anim = this.animations[this.state];
        if (!anim || anim.frameWidth === 0) return;

        anim.timer += dt;
        if (anim.timer >= 1.0 / anim.frameSpeed) {
            anim.timer = 0;
            anim.currentFrame++;

            if (anim.currentFrame >= anim.frameCount) {
                if (anim.loop) {
                    anim.currentFrame = 0;
                } else {
                    anim.currentFrame = anim.frameCount - 1;
                }
            }
        }
    }

    draw(ctx) {
        const anim = this.animations[this.state];

        if (!anim || anim.frameWidth === 0) {
            if (this.state.includes("IDLE")) ctx.fillStyle = "black";
            else if (this.state.includes("MOVE")) ctx.fillStyle = "blue";
            else if (this.state.includes("GRAB")) ctx.fillStyle = "green";
            else ctx.fillStyle = "red";
            
            ctx.fillRect(this.x, this.y, this.size, this.size);
            return;
        }

        ctx.save();

        const centerX = this.x + this.size / 2;
        const centerY = this.y + this.size / 2;

        ctx.translate(centerX, centerY);

        if (this.flipX) {
            ctx.scale(-1, 1);
        }

        const srcX = anim.frameWidth * anim.currentFrame;
        const rowOffset = anim.frameRow > 0 ? anim.frameRow - 1 : 0;
        const srcY = anim.frameHeight * rowOffset;
        
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
        ctx.restore();
    }
}
