import { NPC_STATES } from "../Npc.js";

export const chapter2Maps = {
    "trainStation2": {
        imageSrc: '../assets/Tilemaps/chap2/trainStation2.png',
        jsonDataSrc: '../data/maps/chap2/trainStation2.json',
        playerDefaultSpawn: { x: 305, y: 240 },
        npcs: [],
        items: [],
        triggers: [
            {
                x: 689, y: 180, width: 40, height: 156,
                targetMap: "hotelStreet",
                targetPlayerX: 50, targetPlayerY: 258,
            },
        ]
    },
    "hotelStreet": {
        imageSrc: '../assets/Tilemaps/chap2/hotelStreet.png',
        jsonDataSrc: '../data/maps/chap2/hotelStreet.json',
        playerDefaultSpawn: { x: 490, y: 90 },
        npcs: [
        ],
        items: [
        ],
        triggers: [
            {
                x: 0, y: 180, width: 40, height: 156,
                targetMap: "trainStation2",
                targetPlayerX: 654, targetPlayerY: 258,
            },
            {
                x: 680, y: 180, width: 40, height: 156,
                targetMap: "asylumEntrance",
                targetPlayerX: 50, targetPlayerY: 240,
            },
            {
                x: 362, y: 120, width: 48, height: 40,
                targetMap: "hotelLobby",
                targetPlayerX: 358, targetPlayerY: 330,
                triggerFlag: "enterHotel"
            }
        ]
    },
    "hotelLobby": {
        imageSrc: '../assets/Tilemaps/chap2/hotellobby.png',
        jsonDataSrc: '../data/maps/chap2/hotelLobby.json',
        playerDefaultSpawn: { x: 305, y: 227 },
        npcs: [
            {
                x: 365, y: 165, key: "Mary_lobby_dialogue", interactable: true,
                dialogueVariants: [
                    { flag: "talkedToMary", key: "mary_lobby_repeat" }
                ],
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "../../assets/NPCSprites/MaryGWSheet.png", frameCount: 2, frameSpeed: 4, loop: true }
                }
            },
        ],
        items: [],
        triggers: [
            {
                x: 338, y: 372, width: 48, height: 40,
                targetMap: "hotelStreet",
                targetPlayerX: 386, targetPlayerY: 193,
            },
            {
                x: 172, y: 314, width: 40, height: 48,
                targetMap: "hotelRoom",
                targetPlayerX: 485, targetPlayerY: 322,
            },
        ]
    },
    "hotelRoom": {
        imageSrc: '../assets/Tilemaps/chap2/hotelRoom.png',
        jsonDataSrc: '../data/maps/chap2/hotelRoom.json',
        playerDefaultSpawn: { x: 305, y: 227 },
        npcs: [
        ],
        items: [
            {
                x: 230, y: 152,
                name: "bed",
                pickup: false,
                visible: false,
                dialogueKey: "bed_interaction",
                afterDialogue: {
                    flag: "gotInBed",
                    cutscene: [
                        { type: "FADE", direction: "IN" },
                        { type: "CHANGE_MAP", targetMap: "opalDream", x: 336, y: 336 },
                        { type: "FADE", direction: "OUT" }
                    ]
                }
            }
        ],
        triggers: [
            {
                x: 520, y: 314, width: 40, height: 48,
                targetMap: "hotelLobby",
                targetPlayerX: 215, targetPlayerY: 322,
            },
        ]
    },
    "opalDream": {
        imageSrc: '../assets/Tilemaps/chap2/opalDream.png',
        jsonDataSrc: '../data/maps/chap2/opalDream.json',
        playerDefaultSpawn: { x: 336, y: 336 },
        npcs: [
            {
                x: 336, y: 240, key: "dream_dialogue_1", interactable: true,
                animationConfig: {
                    [NPC_STATES.IDLE]: { src:"../../assets/CharSprites/Onyx-Sheet.png", frameCount:2, frameRow: 6, totalRows: 6, frameSpeed:2, loop: true}
                }
            }
        ],
        items: [
        ],
        triggers: [
            {
                x: 336, y: 67, width: 40, height: 48,
                targetMap: "opalDream2",
                targetPlayerX: 336, targetPlayerY: 255,
                requiredFlag: "nightmareyap1"
            },
            {
                x: 336, y: 75, width: 40, height: 48,
                dialogueKey:"dream_door_block",
                targetPlayerX: 372, targetPlayerY: 168,
                flagRequired:"nightmare",
                repeatable:true,
                disabledByFlag:"nightmareyap1"
            }
        ]
    },
    "opalDream2": {
        imageSrc: '../assets/Tilemaps/chap2/opalDream.png',
        jsonDataSrc: '../data/maps/chap2/opalDream.json',
        playerDefaultSpawn: { x: 305, y: 227 },
        npcs: [
            {
                x: 240, y: 144, key: "lantern_riddle", interactable: true,
                animationConfig: {
                    [NPC_STATES.IDLE]: { src:"../../assets/CharSprites/Onyx-Sheet.png", frameCount:2, frameRow: 6, totalRows: 6, frameSpeed:2, loop: true}
                }
            }
        ],
        items: [
            {
                x:480, y:144,
                name:"soap",
                pickup: false,
                dialogueKey: "choosing_wrong_item_lantern",
                animationConfig:{
                    [NPC_STATES.IDLE]: {src: "./assets/ItemSprites/soap-export.png", frameCount: 1, frameSpeed: 1, loop: true}
                }
            },
            {
                x:480, y:336,
                name:"broom",
                pickup: false,
                dialogueKey: "choosing_wrong_item_cigarettes",
                animationConfig:{
                    [NPC_STATES.IDLE]: {src: "./assets/ItemSprites/broom-export.png", frameCount: 1, frameSpeed: 1, loop: true}
                }
            },
            {
                x:216, y: 336,
                name:"lantern",
                pickup: false,
                dialogueKey: "choosing_right_item_lantern",
                animationConfig:{
                    [NPC_STATES.IDLE]: {src: "./assets/ItemSprites/Lantern.png", frameCount: 1, frameSpeed: 1, loop: true}
                }
            }
        ],
        triggers: [
            {
                x: 336, y: 67, width: 40, height: 48,
                targetMap: "opalDream3",
                targetPlayerX: 336, targetPlayerY: 255,
                requiredFlag: "riddle1correct"
            },
            {
                x: 336, y: 75, width: 40, height: 48,
                dialogueKey:"dream_door_block",
                targetPlayerX: 372, targetPlayerY: 168,
                flagRequired:"nightmare",
                repeatable:true,
                disabledByFlag:"riddle1correct"
            }
        ]
    },
    "opalDream3": {
        imageSrc: '../assets/Tilemaps/chap2/opalDream.png',
        jsonDataSrc: '../data/maps/chap2/opalDream.json',
        playerDefaultSpawn: { x: 305, y: 227 },
        npcs: [
            {
                x: 240, y: 144, key: "gin_riddle", interactable: true,
                animationConfig: {
                    [NPC_STATES.IDLE]: { src:"../../assets/CharSprites/Onyx-Sheet.png", frameCount:2, frameRow: 6, totalRows: 6, frameSpeed:2, loop: true}
                }
            }
        ],
        items: [
            {
                x:480, y:144,
                name:"gin",
                pickup: false,
                dialogueKey: "choosing_right_item_gin",
                animationConfig:{
                    [NPC_STATES.IDLE]: {src: "./assets/ItemSprites/GinBottle.png", frameCount: 1, frameSpeed: 1, loop: true}
                }
            },
            {
                x:480, y:336,
                name:"Food",
                pickup: false,
                dialogueKey: "choosing_wrong_item_cigarettes",
                animationConfig:{
                    [NPC_STATES.IDLE]: {src: "./assets/ItemSprites/Flan.png", frameCount: 1, frameSpeed: 1, loop: true}
                }
            },
            {
                x:216, y: 336,
                name:"Money",
                pickup: false,
                dialogueKey: "choosing_wrong_item_gin",
                animationConfig:{
                    [NPC_STATES.IDLE]: {src: "./assets/ItemSprites/Coins.png", frameCount: 1, frameSpeed: 1, loop: true}
                }
            }
        ],
        triggers: [
            {
                x: 336, y: 67, width: 40, height: 48,
                targetMap: "opalDream4",
                targetPlayerX: 336, targetPlayerY: 255,
                requiredFlag: "riddle2correct"
            },
            {
                x: 336, y: 75, width: 40, height: 48,
                dialogueKey:"dream_door_block",
                targetPlayerX: 372, targetPlayerY: 168,
                flagRequired:"riddle1correct",
                repeatable:true,
                disabledByFlag:"riddle2correct"
            }
        ]
    },
    "opalDream4": {
        imageSrc: '../assets/Tilemaps/chap2/opalDream.png',
        jsonDataSrc: '../data/maps/chap2/opalDream.json',
        playerDefaultSpawn: { x: 305, y: 227 },
        npcs: [
            {
                x: 240, y: 144, key: "cigarettes_riddle", interactable: true,
                animationConfig: {
                    [NPC_STATES.IDLE]: { src:"../../assets/CharSprites/Onyx-Sheet.png", frameCount:2, frameRow: 6, totalRows: 6, frameSpeed:2, loop: true}
                }
            }
        ],
        items: [
            {
                x:480, y:144,
                name:"cigarettes",
                pickup: false,
                dialogueKey: "choosing_right_item_cigarettes",
                animationConfig:{
                    [NPC_STATES.IDLE]: {src: "./assets/ItemSprites/Cigarettes.png", frameCount: 1, frameSpeed: 1, loop: true}
                }
            },
            {
                x:480, y:336,
                name:"book",
                pickup: false,
                dialogueKey: "choosing_wrong_item_lantern",
                animationConfig:{
                    [NPC_STATES.IDLE]: {src: "./assets/ItemSprites/Book.png", frameCount: 1, frameSpeed: 1, loop: true}
                }
            },
            {
                x:216, y: 336,
                name:"love",
                pickup: false,
                dialogueKey: "choosing_wrong_item_cigarettes",
                animationConfig:{
                    [NPC_STATES.IDLE]: {src: "./assets/ItemSprites/love-export.png", frameCount: 1, frameSpeed: 1, loop: true}
                }
            }
        ],
        triggers: [
            {
                x: 336, y: 67, width: 40, height: 48,
                targetMap: "hotelRoom2",
                targetPlayerX: 336, targetPlayerY: 255,
                requiredFlag: "riddle3correct"
            },
            {
                x: 336, y: 75, width: 40, height: 48,
                dialogueKey:"dream_door_block",
                targetPlayerX: 372, targetPlayerY: 168,
                flagRequired:"riddle2correct",
                repeatable:true,
                disabledByFlag:"riddle3correct"
            }
        ]
    },
    "hotelRoom2": {
        imageSrc: '../assets/Tilemaps/chap2/hotelRoom.png',
        jsonDataSrc: '../data/maps/chap2/hotelRoom.json',
        playerDefaultSpawn: { x: 305, y: 227 },
        npcs: [
        ],
        items: [
            {
                x: 230, y: 152,
                name: "bed",
                pickup: false,
                visible: false,
                dialogueKey: "waking_up_from_dream",
            }
        ],
        triggers: [
            {
                x: 520, y: 314, width: 40, height: 48,
                targetMap: "hotelLobby2",
                targetPlayerX: 215, targetPlayerY: 322,
            },
        ]
    },
    "hotelLobby2": {
        imageSrc: '../assets/Tilemaps/chap2/hotellobby.png',
        jsonDataSrc: '../data/maps/chap2/hotelLobby.json',
        playerDefaultSpawn: { x: 305, y: 227 },
        npcs: [
            {
                x: 365, y: 165, key: "mary_after_sleeping", interactable: true,
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "../../assets/NPCSprites/MaryGWSheet.png", frameCount: 2, frameSpeed: 4, loop: true }
                }
            },
        ],
        items: [],
        triggers: [
            {
                x: 338, y: 372, width: 48, height: 40,
                targetMap: "hotelStreet",
                targetPlayerX: 386, targetPlayerY: 193,
            },
            {
                x: 172, y: 314, width: 40, height: 48,
                dialogueKey:"waking_up_from_dream",
                flagRequired:"nightmare",
                repeatable:true
            },
        ]
    },
    "asylumEntrance": {
        imageSrc:'../assets/Tilemaps/chap2/asylumEntrance.png',
        jsonDataSrc:'../data/maps/chap2/asylumEntrance.json',
        playerDefaultSpawn: { x: 490, y: 90 },
        npcs: [],
        items: [],
        triggers: [
            {
                x: 0, y: 180, width: 40, height: 156,
                targetMap: "hotelStreet",
                targetPlayerX: 654, targetPlayerY: 258,
            },
            {
                x: 456, y: 85, width: 48, height: 48,
                dialogueKey:"blocked_asylum",
                disabledByFlag:"nightmare",
                repeatable:true,
            },
            {
                x: 456, y: 80, width: 48, height: 40,
                targetMap:"blank",
                requiredFlag:"nightmare",
            }
        ]
    },
    "blank":{
        imageSrc: '../assets/Tilemaps/chap2/blank.png',
        jsonDataSrc: '../data/maps/chap2/blank.json',
        playerDefaultSpawn: { x: 0, y: 0 },
        npcs: [],
        items: [],
        triggers: []
    }
}