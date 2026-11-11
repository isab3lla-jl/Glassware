import NPC, { NPC_STATES } from "./Npc.js";
import Item from "./Item.js";
import CutsceneEvent from "./cutsceneEvent.js";

import { prologueMaps } from "./chapterMapsConfigs/prologueMaps.js";
import { chapter1Maps } from "./chapterMapsConfigs/chap1Maps.js";

import { CHAPTERS } from "./chapterManager.js";

export default class MapManager {
    constructor() {
        this.chapterLibrary = {
            [CHAPTERS.PROLOGUE]: prologueMaps,
            [CHAPTERS.CHAPTER_1]: chapter1Maps
        };

        this.chapterStartMaps = {
            [CHAPTERS.PROLOGUE]: "bar",
            [CHAPTERS.CHAPTER_1]: "streetOne"
        };

        this.loadId = 0;

        this.currentMapKey = null;
        this.mapImage = new Image();
        this.mapData = null;
        this.isLoaded = false;

        this.activeNpcs = [];
        this.activeItems = [];
        this.activeTriggers = [];

        this.isCutscenePlaying = false;
        this.cutsceneId = 0;
        this.currentCutsceneEvent = null;
    }

    getChapterStartMap(chapter) {
        return this.chapterStartMaps[chapter];
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
        const loadId = ++this.loadId; 

        try {
            const response = await fetch(mapConfig.jsonDataSrc);
            const data = await response.json();
            if (loadId !== this.loadId) return false;
            this.mapData = data;

            await new Promise((resolve, reject) => {
                this.mapImage.src = mapConfig.imageSrc;
                this.mapImage.onload = () => resolve();
                this.mapImage.onerror = (err) => reject(err);
            });
            if (loadId !== this.loadId) return false;

            let runtimeNpcs = mapConfig.npcs 
                ? mapConfig.npcs.map(npc => ({ ...npc })) 
                : [];
                
            let runtimeItems = mapConfig.items 
                ? mapConfig.items.map(item => ({ ...item })) 
                : [];

            if (mapKey === "bar" && gameInstance.chapterManager.getFlag("doorDialogue")) {
                runtimeItems.push({ 
                    x: 400, 
                    y: 160, 
                    name: "key",
                    dialogueKey: "grabbed_keys", 
                    animationConfig: {
                        [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/key.png", frameCount: 1, frameSpeed: 1, loop: true }
                    }
                });
                
                runtimeNpcs = runtimeNpcs.filter(n => n.key !== "bennet_dialogue");
            }
            
            if (mapKey === "barStreet" && gameInstance.chapterManager.getFlag("hasTalkedToElder")) {
                runtimeNpcs = runtimeNpcs.filter(n => n.key !== "mystic_signpost");
            }

            this.activeNpcs = runtimeNpcs.map(n => new NPC(n.x, n.y, n.key, n.animationConfig, n.dialogueVariants));
            this.activeItems = runtimeItems.map(i => new Item(i.x, i.y, i.name, i.dialogueKey, i.animationConfig));
            this.activeTriggers = mapConfig.triggers 
                ? mapConfig.triggers.map(trigger => ({ ...trigger }))
                : [];

            gameInstance.npcs = this.activeNpcs;
            gameInstance.items = this.activeItems;

            this.isLoaded = true;
            return true;

        } catch (error) {
            console.error(`Error al cargar el mapa "${mapKey}":`, error);
            return false;
        }
    }

    async startCutscene(eventQueue, gameInstance) {
        const myId = ++this.cutsceneId;
        this.isCutscenePlaying = true;
        gameInstance.player.enabled = false;

        for (let eventConfig of eventQueue) {
            if (myId !== this.cutsceneId) return;

            const eventHandler = new CutsceneEvent({
                map: this,
                event: eventConfig,
                gameInstance: gameInstance
            });
            this.currentCutsceneEvent = eventHandler;
            await eventHandler.init();

            if (myId !== this.cutsceneId) return;
        }

        this.currentCutsceneEvent = null;
        this.isCutscenePlaying = false;
        gameInstance.player.enabled = true;
    }

    cancelCutscene(gameInstance) {
        this.cutsceneId++;

        if (this.currentCutsceneEvent) {
            this.currentCutsceneEvent.cancel();
            this.currentCutsceneEvent = null;
        }
        this.isCutscenePlaying = false;

        const fadeEl = gameInstance.domMenus.fade;
        if (fadeEl) {
            fadeEl.classList.remove("show-black");
            fadeEl.classList.add("hidden");
        }

        gameInstance.titleCard = null;

        gameInstance.player.cutsceneTimer = 0;
        gameInstance.player.cutsceneDirection = null;
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
