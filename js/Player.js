import Sprite from './Sprite.js';

const PLAYER_STATES = {
    IDLE: "IDLE",
    MOVE: "MOVE",
    GRAB: "GRAB",
    //DEATH: "DEATH"
};

export default class Player extends Sprite {
    constructor(x, y) {
        super(x, y, 30);

        this.speed = 200;
        this.speedX = 0;
        this.speedY = 0;
        this.enabled = true;

        this.keys = {
            ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false,
            w: false, a: false, s: false, d: false, e: false
        };

        this.state = PLAYER_STATES.IDLE;
        this.initAnimations({
            //[PLAYER_STATES.IDLE]:  { src: "../assets/idle_sheet.png",  frameCount: 7, frameSpeed: 10, loop: true },
            //[PLAYER_STATES.MOVE]:  { src: "../assets/move_sheet.png",  frameCount: 8, frameSpeed: 12, loop: true },
            //[PLAYER_STATES.GRAB]:  { src: "../assets/grab_sheet.png",  frameCount: 8, frameSpeed: 12, loop: false },
            //[PLAYER_STATES.DEATH]: { src: "../assets/death_sheet.png", frameCount: 8, frameSpeed: 12, loop: false }
        });

        this.hitboxOffset = { x: 10, y: 10 };
        this.hitboxWidth = this.size - (this.hitboxOffset.x * 2);
        this.hitboxHeight = this.size - (this.hitboxOffset.y * 2);


        window.addEventListener("keydown", (e) => {
            if (e.key in this.keys) this.keys[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            if (e.key in this.keys) this.keys[e.key] = false;
        }); 
    }

    update(dt, mapData) {
        if (this.enabled === true) {
            this.movePlayer(dt, mapData);
            this.updateSprite(dt);
        }
    }

    movePlayer(dt, mapData) {

        if (this.keys.ArrowRight || this.keys.d) this.speedX = this.speed;
        if (!this.keys.ArrowRight && !this.keys.d) this.speedX = 0;
        if (this.keys.ArrowLeft || this.keys.a) this.speedX = -this.speed;
        
        if (this.keys.ArrowUp || this.keys.w) this.speedY = -this.speed;
        if (!this.keys.ArrowUp && !this.keys.w) this.speedY = 0;
        if (this.keys.ArrowDown || this.keys.s) this.speedY = this.speed;

        let targetX = this.speedX * dt;
        let targetY = this.speedY * dt;

        this.x += targetX;
        if (this.#checkCollision(mapData)) this.x -= targetX;
        this.y += targetY;
        if (this.#checkCollision(mapData)) this.y -= targetY;

        const isMovingByKeyboard = this.speedX !== 0 || this.speedY !== 0;

        if (isMovingByKeyboard) {
            if (this.state !== PLAYER_STATES.GRAB && this.state !== PLAYER_STATES.DEATH) {
                this.state = PLAYER_STATES.MOVE;
            }
        } else {
            if (this.state !== PLAYER_STATES.GRAB && this.state !== PLAYER_STATES.DEATH) {
                this.state = PLAYER_STATES.IDLE;
            }
        }
    }

    #checkCollision(mapData) {
        const collisionLayer = mapData.layers.find(layer => layer.name === "Collision");
        if (!collisionLayer) return false;

        const tileW = mapData.tilewidth;
        const tileH = mapData.tileheight;
        const mapWidthInTiles = mapData.width;

        const left = this.x + this.hitboxOffset.x;
        const right = this.x + this.hitboxOffset.x + this.hitboxWidth;
        const top = this.y + this.hitboxOffset.y;
        const bottom = this.y + this.hitboxOffset.y + this.hitboxHeight;

        const startTileX = Math.floor(left / tileW);
        const endTileX = Math.floor(right / tileW);
        const startTileY = Math.floor(top / tileH);
        const endTileY = Math.floor(bottom / tileH);

        for (let tileY = startTileY; tileY <= endTileY; tileY++) {
            for (let tileX = startTileX; tileX <= endTileX; tileX++) {
                
                const tileIndex = tileX + (tileY * mapWidthInTiles);
                const tileId = collisionLayer.data[tileIndex];

                if (tileId > 0) {
                    return true;
                }
            }
        }

        return false;
    }

    objectNear(distance, object) {
        if (distance < 10) { 

        }
    }

    grabObject(distance, object) {
        if (distance < 10 && this.keys.e) { 

        }
    }
}
