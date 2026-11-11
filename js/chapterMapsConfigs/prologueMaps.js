import { NPC_STATES } from "../Npc.js";


export const prologueMaps = {
    "bar": {
        imageSrc: '../assets/Tilemaps/prologue/barTilemap.png',
        jsonDataSrc: '../data/maps/prologue/barTilemap.json',
        playerDefaultSpawn: { x: 350, y: 150 },
        npcs: [
            {
                x: 250, y: 230, key: "bennet_dialogue",
                dialogueVariants: [
                    { flag: "talkedToBennet", key: "bennet_repeat" }
                ],
                animationConfig: {
                    [NPC_STATES.SIDE]: { src: "../../assets/NPCSprites/BennetGW-Sheet.png", frameCount: 2, frameRow: 1, totalRows: 3, frameSpeed: 4, loop: true },
                    [NPC_STATES.IDLE]: { src: "../../assets/NPCSprites/BennetGW-Sheet.png", frameCount: 2, frameRow: 2, totalRows: 3, frameSpeed: 4, loop: true },
                    [NPC_STATES.FRONT]: { src: "../../assets/NPCSprites/BennetGW-Sheet.png", frameCount: 2, frameRow: 3, totalRows: 3, frameSpeed: 4, loop: true }
                }
            }
        ],
        items: [
        ],
        triggers: [
            {
                x: 337, y: 360, width: 46, height: 55,
                targetMap: "barStreet",
                targetPlayerX: 490, targetPlayerY: 90
            },
            /*cutscene trigger en mapa ej
            {
                x: 200, y: 150, width: 32, height: 32,
                flagRequired: "idfk",
                cutscene: [
                    { type: "STAND", who: "player", facing: "SIDE", flipX: true, time: 500 },
                    { type: "TEXT", key: "idfk" }
                ]
            }*/
        ]
    },
    "barStreet": {
        imageSrc: '../assets/Tilemaps/prologue/barStreetTilemap.png',
        jsonDataSrc: '../data/maps/prologue/barStreetTilemap.json',
        playerDefaultSpawn: { x: 490, y: 90 },
        npcs: [
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
        imageSrc: '../assets/Tilemaps/prologue/homeStreetTilemap.png',
        jsonDataSrc: '../data/maps/prologue/homeStreetTilemap.json',
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
                requiredItem: "key"
            },
            {
                x: 552, y: 50, width: 48, height: 50,
                dialogueKey: "locked_door",
                dialogueVariants: [
                    { flag: "checkedDoor", key: "check_bar" }
                ],
                flagRequired: "doorDialogue",
                repeatable: true,
                disabledByFlag: "grabbedKey"
            },
            {
                x: 0, y: 96, width: 40, height: 300,
                targetMap: "barStreet",
                targetPlayerX: 655, targetPlayerY: 240,
            },
            {
                x: 190, y: 440, width: 265, height: 40,
                advanceChapter: "CHAPTER_1",
                requiredItem: "money"
            }
        ]
    },
    "room": {
        imageSrc: '../assets/Tilemaps/prologue/roomTilemap.png',
        jsonDataSrc: '../data/maps/prologue/roomTilemap.json',
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
    },
    "roomChest": {
        imageSrc: '../assets/Tilemaps/prologue/roomChestTilemap.png',
        jsonDataSrc: '../data/maps/prologue/roomTilemap.json',
        playerDefaultSpawn: { x: 422, y: 168 },
        npcs: [
        ],
        items: [
            {
                x: 480, y: 260, 
                name: "money",
                //dialogueKey: "grabbed_keys", 
                /*animationConfig: {
                    [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/key.png", frameCount: 1, frameSpeed: 1, loop: true }
                }*/
            }
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