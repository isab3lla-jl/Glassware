import Sprite from "./Sprite.js";

const PLAYER_STATES = {
    IDLE_FRONT: "IDLE_FRONT",
    IDLE_SIDE: "IDLE_SIDE",
    IDLE_BACK: "IDLE_BACK",

    MOVE_FRONT: "MOVE_FRONT",
    MOVE_SIDE: "MOVE_SIDE",
    MOVE_BACK: "MOVE_BACK",

    GRAB_FRONT: "GRAB_FRONT",
    GRAB_SIDE: "GRAB_SIDE",
    GRAB_BACK: "GRAB_BACK",
    //DEATH: "DEATH"
};

const FACING = {
    FRONT: "FRONT",
    SIDE: "SIDE",
    BACK: "BACK"
};

export default class Player extends Sprite {
    constructor(x, y) {
        super(x, y, 27, 33);

        this.speed = 125;
        this.speedX = 0;
        this.speedY = 0;
        this.enabled = true;

        this.keys = {
            ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false,
            w: false, a: false, s: false, d: false, e: false
        };

        this.state = PLAYER_STATES.IDLE_FRONT;
        this.facing = FACING.FRONT; 
        this.initAnimations({
            [PLAYER_STATES.IDLE_FRONT]:  { src: "../assets/CharSprites/Opal-Sheet.png",  frameCount: 2, colsPerRow: 4, frameRow: 8, totalRows: 8, frameSpeed: 5, loop: true },
            [PLAYER_STATES.IDLE_SIDE]:  { src: "../assets/CharSprites/Opal-Sheet.png",  frameCount: 2, colsPerRow: 4, frameRow: 2, totalRows: 8, frameSpeed: 5, loop: true },
            [PLAYER_STATES.IDLE_BACK]:  { src: "../assets/CharSprites/Opal-Sheet.png",  frameCount: 2, colsPerRow: 4, frameRow: 5, totalRows: 8, frameSpeed: 5, loop: true },

            [PLAYER_STATES.MOVE_FRONT]:  { src: "../assets/CharSprites/Opal-Sheet.png",  frameCount: 2, colsPerRow: 4, frameRow: 7, totalRows: 8, frameSpeed: 6, loop: true },
            [PLAYER_STATES.MOVE_SIDE]:  { src: "../assets/CharSprites/Opal-Sheet.png",  frameCount: 4, colsPerRow: 4, frameRow: 1, totalRows: 8, frameSpeed: 6, loop: true },
            [PLAYER_STATES.MOVE_BACK]:  { src: "../assets/CharSprites/Opal-Sheet.png",  frameCount: 2, colsPerRow: 4, frameRow: 4, totalRows: 8, frameSpeed: 6, loop: true },

            [PLAYER_STATES.GRAB_FRONT]:  { src: "../assets/CharSprites/Opal-Sheet.png",  frameCount: 2, colsPerRow: 4, frameRow: 6, totalRows: 8, frameSpeed: 4, loop: false },
            [PLAYER_STATES.GRAB_SIDE]:  { src: "../assets/CharSprites/Opal-Sheet.png",  frameCount: 2, colsPerRow: 4, frameRow: 2, totalRows: 8, frameSpeed: 4, loop: false },
            [PLAYER_STATES.GRAB_BACK]:  { src: "../assets/CharSprites/Opal-Sheet.png",  frameCount: 2, colsPerRow: 4, frameRow: 3, totalRows: 8, frameSpeed: 4, loop: false },

            //[PLAYER_STATES.DEATH]: { src: "../assets/CharSprites/Opal-Sheet.png", frameCount: 8, colsPerRow: 4, frameRow: 4, totalRows: 10, frameSpeed: 12, loop: false }
        });

        this.hitboxOffset = { x: 10, y: 10 };
        this.hitboxWidth = this.width - (this.hitboxOffset.x * 2);
        this.hitboxHeight = this.height - (this.hitboxOffset.y * 2);


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
            this.updatePlayerState();
            this.updateSprite(dt);
        }
    }

    movePlayer(dt, mapData) {
        this.speedX = 0;
        this.speedY = 0;

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
    }

    updatePlayerState() {
        if (this.state.startsWith("GRAB")) {
            return;
        }

        const isMoving = this.speedX !== 0 || this.speedY !== 0;

        if (isMoving) {
            if (this.speedY > 0) {
                this.facing = FACING.FRONT;
                this.state = PLAYER_STATES.MOVE_FRONT;
            } else if (this.speedY < 0) {
                this.facing = FACING.BACK;
                this.state = PLAYER_STATES.MOVE_BACK;
            } else if (this.speedX > 0) {
                this.facing = FACING.SIDE;
                this.state = PLAYER_STATES.MOVE_SIDE;
                this.flipX = false;
            } else if (this.speedX < 0) {
                this.facing = FACING.SIDE;
                this.state = PLAYER_STATES.MOVE_SIDE;
                this.flipX = true;
            }
        } else {
            if (this.facing === FACING.FRONT) this.state = PLAYER_STATES.IDLE_FRONT;
            if (this.facing === FACING.BACK)  this.state = PLAYER_STATES.IDLE_BACK;
            if (this.facing === FACING.SIDE)  this.state = PLAYER_STATES.IDLE_SIDE;
        }
    }

    grab() {
        if (this.facing === FACING.FRONT) this.state = PLAYER_STATES.GRAB_FRONT;
        if (this.facing === FACING.BACK)  this.state = PLAYER_STATES.GRAB_BACK;
        if (this.facing === FACING.SIDE)  this.state = PLAYER_STATES.GRAB_SIDE;
        
        setTimeout(() => {
            if (this.facing === FACING.FRONT) this.state = PLAYER_STATES.IDLE_FRONT;
            if (this.facing === FACING.BACK) this.state = PLAYER_STATES.IDLE_BACK;
            if (this.facing === FACING.SIDE) this.state = PLAYER_STATES.IDLE_SIDE;
        }, 300);
    }

    #checkCollision(mapData) {
        const collisionLayer = mapData.layers.find(layer => layer.name === "Collision");
        //const sceneChangeTrigger = mapData.layers.find(layer => layer.name === "...");
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
}
