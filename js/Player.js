const PLAYER_STATES = {
    IDLE: "IDLE",
    MOVE: "MOVE",
    GRAB: "GRAB",
    DEATH: "DEATH"
};

export default class Player {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.size = 60;
        this.speed = 200;
        this.speedX = 0;
        this.speedY = 0;
        this.enabled = true;

        this.keys = {
            ArrowRight: false,
            ArrowLeft: false,
            ArrowUp: false,
            ArrowDown: false,
            w: false,
            a: false,
            s: false,
            d: false 
        };

        this.mousePos = {
            x: 0.0,
            y: 0.0
        };
        
        this.baseScale = 1;
        this.scale = 1;
        this.breathingIntensity = 0.1;
        this.breathingFrec = 0.5;
        this.animationTime = 0;

/*
        this.state = PLAYER_STATES.IDLE;
        this.animations = {
            [PLAYER_STATES.IDLE]: {
                texture: new Image(),
                frameCount: 7,
                frameSpeed: 10,
                currentFrame: 0,
                timer: 0,
                frameWidth: 0, 
                frameHeight: 0
            },
            [PLAYER_STATES.MOVE]: {
                texture: new Image(),
                frameCount: 8,
                frameSpeed: 12,
                currentFrame: 0,
                timer: 0,
                frameWidth: 0,
                frameHeight: 0
            }
        };

        this.animations[PLAYER_STATES.IDLE].texture.src = "../assets/playerIdle.png";
        this.animations[PLAYER_STATES.MOVE].texture.src = "../assets/playerWalk.png";

        for (let key in this.animations) {
            const anim = this.animations[key];
            anim.texture.onload = () => {
                anim.frameWidth = anim.texture.width / anim.frameCount;
                anim.frameHeight = anim.texture.height;
            };
        }
*/
        window.addEventListener("keydown", (e) => {
            if (e.key in this.keys) this.keys[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            if (e.key in this.keys) this.keys[e.key] = false;
        }); 
        document.addEventListener("mousedown", (e) => {
            if (e.target.id === "GameCanvas") {
            this.MousePos(e.target, e);
    }
        });

    }

    update(dt)
    {
        // En la sesión 3 veremos qué es 'dt'
        if (this.enabled == true) {
            this.movePlayer(dt);
            //this.updateAnimation(dt);
        }
    }

    movePlayer(dt)
    {
        //const previousState = this.state;


        if (this.keys.ArrowRight || this.keys.d || this.keys.ArrowLeft || this.keys.a 
            || this.keys.ArrowUp || this.keys.w || this.keys.ArrowDown || this.keys.s) {
            this.mousePos.x = 0;
            this.mousePos.y = 0;
        }

        //key movements
        if (this.keys.ArrowRight || this.keys.d) {
            //console.log(this.keys.ArrowRight);
            this.speedX = this.speed;
        }
        if (!this.keys.ArrowRight && !this.keys.d) {
            //console.log(this.keys.ArrowRight);
            this.speedX = 0;
        }
        if (this.keys.ArrowLeft || this.keys.a) {
            this.speedX = -this.speed;
        }
        if (this.keys.ArrowUp || this.keys.w) {
            this.speedY = -this.speed;
        }
        if (!this.keys.ArrowUp && !this.keys.w) {
            this.speedY = 0;
        }
        if (this.keys.ArrowDown || this.keys.s) {
            this.speedY = this.speed;
        }

        //mouse movement
        if (this.mousePos.x != 0 && this.mousePos.y != 0) {
            let vector, vLength, factor;

            vector = this.#MakeVector(this.x, this.y, this.mousePos);
            vLength = this.#Length(vector);

            if (vLength <= this.speed * dt) {

                this.x = this.mousePos.x;
                this.y = this.mousePos.y;

                this.mousePos.x = 0;
                this.mousePos.y = 0;

            } else {

                factor = (this.speed * dt) / vLength;

                this.x = this.x + factor * vector.x;
                this.y = this.y + factor * vector.y;
            }
        }

        this.x += this.speedX * dt;
        this.y += this.speedY * dt;

        /*if (this.speedX !== 0 || this.speedY !== 0) {
            this.state = PLAYER_STATES.MOVE;
        } else {
            this.state = PLAYER_STATES.IDLE;
        }*/

        this.animationTime += dt;

        const breathOffset = Math.sin(this.animationTime * this.breathingFrec * Math.PI * 2) * this.breathingIntensity;
        this.scale = this.baseScale + breathOffset;

    }

    #MakeVector(x, y, point2) {
        let xDist, yDist;

        xDist = point2.x - x;
        yDist = point2.y - y;

        return {
            x: xDist,
            y: yDist
        };
    }

    #Length (vector)
    {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    }

    
    MousePos(canvas, e)
    {
        let rect = canvas.getBoundingClientRect();
        this.mousePos.x = e.clientX - rect.left - this.size / 2;
        this.mousePos.y = e.clientY - rect.top - this.size / 2;
        console.log(this.mousePos.x, this.mousePos.y);
    }

    /*updateAnimation(dt) {
        const anim = this.animations[this.state];
        
        if (!anim || anim.frameWidth === 0) return;

        anim.timer += dt;

        if (anim.timer >= 1.0 / anim.frameSpeed) {
            anim.timer = 0;
            anim.currentFrame++;

            if (anim.currentFrame >= anim.frameCount) {
                anim.currentFrame = 0;
            }
        }
    }*/

    draw(ctx)
    {
            
        ctx.fillStyle= "blue";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        /*const anim = this.animations[this.state];

        ctx.save();

        const centerX = this.x + this.size / 2;
        const centerY = this.y + this.size / 2;

        ctx.translate(centerX, centerY);
        ctx.scale(this.scale, this.scale);

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
