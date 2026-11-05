import NPC from "./Npc.js";
import Item from "./Item.js";

export default class MapManager {
    constructor() {
        this.maps = {
            "map1": {
                imageSrc: '../assets/Tilemaps/mockMapGlassware.png',
                jsonDataSrc: '../data/mapData.json',
                playerDefaultSpawn: { x: 60, y: 70 },
                npcs: [
                    { x: 420, y: 400, key: "npc_elder_intro" }
                ],
                items: [
                    { x: 480, y: 100, name: "67" }
                ],
                triggers: [
                    {
                        x: 710, y: 0, width: 40, height: 110,
                        targetMap: "map2",
                        targetPlayerX: 50, targetPlayerY: 100
                    }
                ]
            },
            "map2": {
                imageSrc: '../assets/Tilemaps/mockMapGlassware.png',
                jsonDataSrc: '../data/mapData.json',
                playerDefaultSpawn: { x: 30, y: 70 },
                npcs: [
                    { x: 300, y: 200, key: "mystic_signpost" }
                ],
                items: [
                    { x: 600, y: 400, name: "sword" }
                ],
                triggers: [
                    {
                        x: 0, y: 100, width: 40, height: 100,
                        targetMap: "map1",
                        targetPlayerX: 655, targetPlayerY: 55,
                        requiredItem: "sword"
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
