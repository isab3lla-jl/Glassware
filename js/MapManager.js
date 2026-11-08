import NPC from "./Npc.js";
import Item from "./Item.js";

import { prologueMaps } from "./chapterMapsConfigs/prologueMaps.js";
import { CHAPTERS } from "./chapterManager.js";

export default class MapManager {
    constructor() {
        this.chapterLibrary = {
            [CHAPTERS.PROLOGUE]: prologueMaps
        };

        this.currentMapKey = null;
        this.mapImage = new Image();
        this.mapData = null;
        this.isLoaded = false;

        this.activeNpcs = [];
        this.activeItems = [];
        this.activeTriggers = [];
    }

    getMapsForCurrentChapter(gameInstance) {
        if (!gameInstance || !gameInstance.chapterManager) {
            return prologueMaps;
        }
        
        const currentChapter = gameInstance.chapterManager.currentChapter;
        
        return this.chapterLibrary[currentChapter] || prologueMaps;
    }

    async loadMap(mapKey, gameInstance) {
        const currentChapterMaps = this.getMapsForCurrentChapter(gameInstance);
        const mapConfig = currentChapterMaps[mapKey];

        if (!mapConfig) {
            console.error(`Map "${mapKey}" doesn't exist.`);
            return false;
        }

        this.isLoaded = false;
        this.currentMapKey = mapKey;

        try {
            const response = await fetch(mapConfig.jsonDataSrc);
            this.mapData = await response.json();

            await new Promise((resolve, reject) => {
                this.mapImage.src = mapConfig.imageSrc;
                this.mapImage.onload = () => resolve();
                this.mapImage.onerror = (err) => reject(err);
            });

            let runtimeNpcs = [...mapConfig.npcs];
            let runtimeItems = [...mapConfig.items];

            if (mapKey === "bar" && gameInstance.chapterManager.getFlag("hasTalkedToElder")) {
                runtimeNpcs = runtimeNpcs.filter(n => n.key !== "npc_elder_intro");
                runtimeItems.push({ x: 320, y: 180, name: "key" });
            }
            if (mapKey === "barStreet" && gameInstance.chapterManager.getFlag("hasTalkedToElder")) {
                runtimeNpcs = runtimeNpcs.filter(n => n.key !== "mystic_signpost");
            }

            this.activeNpcs = runtimeNpcs.map(n => new NPC(n.x, n.y, n.key));
            this.activeItems = runtimeItems.map(i => new Item(i.x, i.y, i.name));
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
    getDefaultSpawn(gameInstance) { 
        const currentChapterMaps = this.getMapsForCurrentChapter(gameInstance);
        return currentChapterMaps[this.currentMapKey].playerDefaultSpawn; 
    }
}
