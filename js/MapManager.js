import NPC from "./Npc.js";
import Item from "./Item.js";

export default class MapManager {
    constructor() {
        this.maps = {
            "bar": {
                imageSrc: '../assets/Tilemaps/barTilemap.png',
                jsonDataSrc: '../data/maps/barTilemap.json',
                playerDefaultSpawn: { x: 350, y: 150 },
                npcs: [
                    { x: 250, y: 230, key: "npc_elder_intro" }
                ],
                items: [
                ],
                triggers: [
                    {
                        x: 337, y: 360, width: 46, height: 55,
                        targetMap: "barStreet",
                        targetPlayerX: 490, targetPlayerY: 90
                    }
                ]
            },
            "barStreet": {
                imageSrc: '../assets/Tilemaps/barStreetTilemap.png',
                jsonDataSrc: '../data/maps/barStreetTilemap.json',
                playerDefaultSpawn: { x: 490, y: 90 },
                npcs: [
                    { x: 300, y: 200, key: "mystic_signpost" }
                ],
                items: [
                ],
                triggers: [
                    {
                        x: 480, y: 50, width: 48, height: 35,
                        targetMap: "bar",
                        targetPlayerX: 348, targetPlayerY: 320,
                    },
                    {
                        x: 680, y: 96, width: 40, height: 300,
                        targetMap: "homeStreet",
                        targetPlayerX: 50, targetPlayerY: 240,
                    }
                ]
            },
            "homeStreet": {
                imageSrc: '../assets/Tilemaps/homeStreetTilemap.png',
                jsonDataSrc: '../data/maps/homeStreetTilemap.json',
                playerDefaultSpawn: { x: 560, y: 100 },
                npcs: [
                ],
                items: [
                ],
                triggers: [
                    {
                        x: 552, y: 50, width: 48, height: 35,
                        targetMap: "room",
                        targetPlayerX: 347, targetPlayerY: 320,
                    },
                    {
                        x: 0, y: 96, width: 40, height: 300,
                        targetMap: "barStreet",
                        targetPlayerX: 655, targetPlayerY: 240,
                    },
                    {
                        x: 190, y: 440, width: 265, height: 40,
                        targetMap: "streetOne",
                        targetPlayerX: 655, targetPlayerY: 240,
                        requiredItem: "money"
                    }
                ]
            },
            "room": {
                imageSrc: '../assets/Tilemaps/roomTilemap.png',
                jsonDataSrc: '../data/maps/roomTilemap.json',
                playerDefaultSpawn: { x: 350, y: 150 },
                npcs: [
                ],
                items: [
                ],
                triggers: [
                    {
                        x: 337, y: 360, width: 46, height: 55,
                        targetMap: "homeStreet",
                        targetPlayerX: 560, targetPlayerY: 100
                    }
                ]
            }
        };

        this.currentMapKey = null;
        this.mapImage = new Image();
        this.mapData = null;
        this.isLoaded = false;

        this.activeNpcs = [];
        this.activeItems = [];
        this.activeTriggers = [];
    }

    async loadMap(mapKey, gameInstance) {
        if (!this.maps[mapKey]) {
            console.error(`Map "${mapKey}" doesn't exist.`);
            return false;
        }

        this.isLoaded = false;
        this.currentMapKey = mapKey;
        const mapConfig = this.maps[mapKey];

        try {
            const response = await fetch(mapConfig.jsonDataSrc);
            this.mapData = await response.json();

            await new Promise((resolve, reject) => {
                this.mapImage.src = mapConfig.imageSrc;
                this.mapImage.onload = () => resolve();
                this.mapImage.onerror = (err) => reject(err);
            });

            this.activeNpcs = mapConfig.npcs.map(n => new NPC(n.x, n.y, n.key));
            this.activeItems = mapConfig.items.map(i => new Item(i.x, i.y, i.name));
            this.activeTriggers = mapConfig.triggers || [];

            gameInstance.npcs = this.activeNpcs;
            gameInstance.items = this.activeItems;

            this.isLoaded = true;
            return true;

        } catch (error) {
            console.error(`Error al cargar el mapa "${mapKey}":`, error);
            return false;
        }
    }

    getCurrentData() { return this.mapData; }
    getScaleImage() { return this.mapImage; }
    hasLoaded() { return this.isLoaded; }
    getTriggers() { return this.activeTriggers; }
    getDefaultSpawn() { return this.maps[this.currentMapKey].playerDefaultSpawn; }
}
