import { NPC_STATES } from "../Npc.js";

export const chapter1Maps = {
    "streetOne": {
        imageSrc: '../assets/Tilemaps/chap1/streetOneTilemap.png',
        jsonDataSrc: '../data/maps/chap1/streetOneTilemap.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [],
        items: [],
        triggers: [
            
            {
                x: 190, y: 0, width: 265, height: 40,
                targetMap: "homeStreet",
                targetPlayerX: 322, targetPlayerY: 400,
            },
            {
                x: 190, y: 440, width: 265, height: 40,
                targetMap: "tStreet",
                targetPlayerX: 322, targetPlayerY: 60,
            }
        ]
    },
    "tStreet": {
        imageSrc: '../assets/Tilemaps/chap1/tStreet.png',
        jsonDataSrc: '../data/maps/chap1/tStreet.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [],
        items: [],
        triggers: [
            
            {
                x: 190, y: 0, width: 265, height: 40,
                targetMap: "streetOne",
                targetPlayerX: 322, targetPlayerY: 400,
            },
            {
                x: 552, y: 96, width: 48, height: 40,
                targetMap: "warehouseOne",
                targetPlayerX: 360, targetPlayerY: 320, //same for warehouseTwo
                requiredFlag: "talkedToBennetHouse"
            },
            {
                x: 552, y: 96, width: 48, height: 50,
                dialogueKey: "unavailable_door",
                repeatable: true,
                disabledByFlag: "talkedToBennetHouse"
            },
            {
                x: 682, y: 168, width: 40, height: 168,
                targetMap: "crossStreet",
                targetPlayerX: 50, targetPlayerY: 240,
            },
            {
                x: 202, y: 442, width: 252, height: 40,
                targetMap: "graceStreet",
                targetPlayerX: 328, targetPlayerY: 50,
            }
        ]
    },
    "warehouseOne": {
        imageSrc: '../assets/Tilemaps/chap1/warehouse1.png',
        jsonDataSrc: '../data/maps/chap1/warehouse1.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [],
        items: [
            {
                x: 408, y: 156,
                name: "trash",
                pickup: false,
                dialogueKey: "trash_interact_1", 
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/trashitem.png", frameCount: 1, frameSpeed: 1, loop: true }
                }
            },
            {
                x: 310, y: 230,
                name: "trash",
                pickup: false,
                dialogueKey: "trash_interact_2", 
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/trashitem.png", frameCount: 1, frameSpeed: 1, loop: true }
                }
            },
            {
                x: 486, y: 288,
                name: "trash",
                pickup: false,
                dialogueKey: "trash_interact_3", 
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/trashitem.png", frameCount: 1, frameSpeed: 1, loop: true }
                }
            },
            {
                x: 216, y: 160, 
                name: "lockpicks",
                dialogueKey: "hidden_item_interact", 
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/trashitem.png", frameCount: 1, frameSpeed: 1, loop: true }
                }
            },
        ], //4 i think
        triggers: [
            {
                x: 334, y: 360, width: 48, height: 40,
                targetMap: "tStreet",
                targetPlayerX: 572, targetPlayerY: 169,
            }
        ]
    },
    "warehouseTwo": {
        imageSrc: '../assets/Tilemaps/chap1/warehouse2.png',
        jsonDataSrc: '../data/maps/chap1/warehouse2.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [],
        items: [
            {
                x: 280, y: 316,
                name: "trash",
                pickup: false,
                dialogueKey: "trash_interact_4", 
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/trashitem.png", frameCount: 1, frameSpeed: 1, loop: true }
                }
            },
            {
                x: 315, y: 145,
                name: "trash",
                pickup: false,
                dialogueKey: "trash_interact_2", 
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/trashitem.png", frameCount: 1, frameSpeed: 1, loop: true }
                }
            },
            {
                x: 428, y: 288,
                name: "trash",
                pickup: false,
                dialogueKey: "trash_interact_3", 
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/trashitem.png", frameCount: 1, frameSpeed: 1, loop: true }
                }
            },
        ], //4 i think
        triggers: [
            {
                x: 334, y: 360, width: 48, height: 40,
                targetMap: "crossStreet",
                targetPlayerX: 572, targetPlayerY: 193,
            }
        ]
    },
    "crossStreet": {
        imageSrc: '../assets/Tilemaps/chap1/crossStreet.png',
        jsonDataSrc: '../data/maps/chap1/crossStreet.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [],
        items: [],
        triggers: [
            {
                x: 0, y: 168, width: 40, height: 168,
                targetMap: "tStreet",
                targetPlayerX: 650, targetPlayerY: 252,
            },
            {
                x: 264, y: 0, width: 192, height: 40,
                targetMap: "trainStation",
                targetPlayerX: 360, targetPlayerY: 320,
            },
            {
                x: 680, y: 168, width: 40, height: 168,
                targetMap: "finleyStreet",
                targetPlayerX: 50, targetPlayerY: 240,
                triggerFlag: "finleyFound"
            },
            {
                x: 264, y: 440, width: 192, height: 40,
                targetMap: "kittyStreet",
                targetPlayerX: 360, targetPlayerY: 85,
            },
            {
                x: 552, y: 120, width: 48, height: 40,
                targetMap: "warehouseTwo",
                targetPlayerX: 360, targetPlayerY: 320,
                requiredFlag: "talkedToBennetHouse"
            },
            {
                x: 552, y: 120, width: 48, height: 50,
                dialogueKey: "unavailable_door",
                repeatable: true,
                disabledByFlag: "talkedToBennetHouse"
            }
        ]
    },
    "trainStation": {
        imageSrc: '../assets/Tilemaps/chap1/trainStation.png',
        jsonDataSrc: '../data/maps/chap1/trainStation.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [],
        items: [],
        triggers: [
            //cutscene trigger train door
            {
                x: 168, y: 144, width: 48, height: 64,
                targetMap: "trainCar1",
                targetPlayerX: 350, targetPlayerY: 320,
                requiredItem: "money",
                requiredFlag: "readGracePapers",
            },
            {
                x: 168, y: 144, width: 48, height: 74,
                dialogueKey: "unavailable_door",
                repeatable: true,
                disabledByFlag: "readGracePapers"
            },
            {
                x: 264, y: 440, width: 192, height: 40,
                targetMap: "crossStreet",
                targetPlayerX: 360, targetPlayerY: 85,
            },
        ]
    },
    "trainCar1": {
        imageSrc: '../assets/Tilemaps/chap1/trainCar2.png',
        jsonDataSrc: '../data/maps/chap1/trainCar2.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        triggers: [
            {
                x: 336, y: 350, width: 48, height: 40,
                advanceChapter: "CHAPTER_2",
                requiredFlag: "sawTrainCutscene"
            },
            {
                x: 560, y: 216, width: 40, height: 48,
                dialogueKey: "leave_train",
                repeatable: true,
            },
        ]
    },
    "trainCar2": {
        imageSrc: '../assets/Tilemaps/chap1/trainCar1.png',
        jsonDataSrc: '../data/maps/chap1/trainCar1.json',
        playerDefaultSpawn: { x: 360, y: 50 },
    },
    "finleyStreet": {
        imageSrc: '../assets/Tilemaps/chap1/finleyStreet.png',
        jsonDataSrc: '../data/maps/chap1/finleyStreet.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [
            {
                x: 624, y: 72, key: "finley_questions", interactable: true,
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "../../assets/NPCSprites/FinleyGW-Sheet.png", frameCount: 2, frameRow: 3, totalRows: 3, frameSpeed: 4, loop: true }
                }
            }
        ],
        items: [],
        triggers: [
            {
                
                x: 0, y: 168, width: 40, height: 168,
                targetMap: "crossStreet",
                targetPlayerX: 650, targetPlayerY: 252,
            }
        ]
    },
    "kittyStreet": {
        imageSrc: '../assets/Tilemaps/chap1/kittyStreet.png',
        jsonDataSrc: '../data/maps/chap1/kittyStreet.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [
            {
                x: 648, y: 144, key: "bennet_cat_interact", interactable: true, flipX: true,
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "../../assets/NPCSprites/Kitties-Sheet.png", frameCount: 2, frameRow: 1, totalRows: 3, frameSpeed: 2, loop: true }
                }
            }
        ], //kitty
        items: [],
        triggers: [
            {
                x: 264, y: 0, width: 192, height: 40,
                targetMap: "crossStreet",
                targetPlayerX: 360, targetPlayerY: 320,
            },
            {
                x: 552, y: 96, width: 48, height: 40,
                targetMap: "bennetHouse",
                targetPlayerX: 353, targetPlayerY: 320,
                requiredFlag: "checkedGraceDoor",
                triggerFlag: "talkedBennetCat"
            },
            {
                x: 552, y: 90, width: 48, height: 50,
                dialogueKey: "unavailable_door",
                repeatable: true,
                disabledByFlag: "checkedGraceDoor"
            }
        ]
    },
    "bennetHouse": {
        imageSrc: '../assets/Tilemaps/chap1/bennetHouse.png',
        jsonDataSrc: '../data/maps/chap1/bennetHouse.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [
            {
                x: 384, y: 168, key: "bennet_help", interactable: true,
                giveItem: {
                    item: "gin",
                    dialogueKey: "bennet_interact_bottle_only",
                    triggerFlag: "givenGin",
                },
                dialogueVariants: [
                    { flags: ["ginGrabbed", "lockpicksGrabbed", "talkedToBennetHouse" ], key: "bennet_interact_with_both_items", requiredItem: "gin" },
                    { flags: ["ginGrabbed", "talkedToBennetHouse" ], key: "bennet_interact_bottle_only" },
                    { flag: "lockpicksGrabbed", key: "bennet_interact_lockpicks_only" },
                ],
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "../../assets/NPCSprites/BennetGW-Sheet.png", frameCount: 2, frameRow: 3, totalRows: 3, frameSpeed: 2, loop: true }
                }
            }
        ], //bennet
        items: [],
        triggers: [
            {
                x: 337, y: 360, width: 46, height: 55,
                targetMap: "kittyStreet",
                targetPlayerX: 573, targetPlayerY: 155,
            }
        ],
    },
    "graceStreet": {
        imageSrc: '../assets/Tilemaps/chap1/graceStreet.png',
        jsonDataSrc: '../data/maps/chap1/graceStreet.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [],
        items: [], //4 i think
        triggers: [
            {
                x: 202, y: 0, width: 252, height: 40,
                targetMap: "tStreet",
                targetPlayerX: 328, targetPlayerY: 400,
            },
            {
                x: 72, y: 264, width: 48, height: 40,
                targetMap: "graceHouse",
                targetPlayerX: 347, targetPlayerY: 320,
                requiredFlag: "locksmithSkills",
                triggerFlag: "graceDoorOpened"
            },
            {
                x: 72, y: 264, width: 48, height: 50,
                dialogueKey: "locked_grace_door",
                dialogueVariants: [
                    { flag: "checkedGraceDoor", key: "grace_locked_door_repeat" }
                ],
                requiredFlag: "talkedToFinley",
                flagRequired: "graceDoorDialogue",
                repeatable: true,
                disabledByFlag: "locksmithSkills"
            },
            {
                x: 72, y: 264, width: 48, height: 50,
                dialogueKey: "unavailable_door",
                repeatable: true,
                disabledByFlag: "talkedToFinley"
            }
        ]
    },
    "graceHouse": {
        imageSrc: '../assets/Tilemaps/chap1/graceHouse.png',
        jsonDataSrc: '../data/maps/chap1/graceHouse.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [],
        items: [
            {
                x: 230, y: 153,
                name: "papers",
                pickup: false,
                visible: false,
                dialogueKey: "grace_right_clue"
            },
            {
                x: 360, y: 144,
                name: "vials",
                pickup: false,
                visible: false,
                dialogueKey: "grace_clue_2"
            },
            {
                x: 480, y: 336,
                name: "loss",
                pickup: false,
                visible: false,
                dialogueKey: "grace_clue_3"
            }
        ], //1 readable
        triggers: [
            {
                x: 337, y: 360, width: 46, height: 55,
                targetMap: "graceStreet",
                targetPlayerX: 90, targetPlayerY: 320,
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
                targetMap: "roomChest",
                targetPlayerX: 347, targetPlayerY: 320,
            },
            /* dialogue trigger ej
            {
                x: 552, y: 50, width: 48, height: 50,
                dialogueKey: "locked_door",
                dialogueVariants: [
                    { flag: "checkedDoor", key: "check_bar" }
                ],
                flagRequired: "doorDialogue",
                repeatable: true,
                disabledByFlag: "grabbedKey"
            },*/
            {
                x: 0, y: 96, width: 40, height: 300,
                targetMap: "barStreet",
                targetPlayerX: 655, targetPlayerY: 240,
            },
            {
                x: 190, y: 440, width: 265, height: 40,
                targetMap: "streetOne",
                targetPlayerX: 322, targetPlayerY: 65,
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
        ],
        triggers: [
            {
                x: 337, y: 360, width: 46, height: 55,
                targetMap: "homeStreet",
                targetPlayerX: 560, targetPlayerY: 100
            }
        ]
    },
    "barStreet": {
        imageSrc: '../assets/Tilemaps/prologue/barStreetTilemap.png',
        jsonDataSrc: '../data/maps/prologue/barStreetTilemap.json',
        playerDefaultSpawn: { x: 490, y: 90 },
        npcs: [
            {
                x: 100, y: 100, key: "prologue_kitty", interactable: true,
                animationConfig: {
                    [NPC_STATES.IDLE]: { src: "../../assets/NPCSprites/Kitties-Sheet.png", frameCount: 2, frameRow: 3, totalRows: 3, frameSpeed: 2, loop: true }
                }
            }
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
    "bar": {
            imageSrc: '../assets/Tilemaps/prologue/barTilemap.png',
            jsonDataSrc: '../data/maps/prologue/barTilemap.json',
            playerDefaultSpawn: { x: 350, y: 150 },
            npcs: [
            ],
            items: [
                {
                    x: 192, y: 134, 
                    name: "gin",
                    dialogueKey: "grab_bar_bottle", 
                    animationConfig: {
                        [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/GinBottle.png", frameCount: 1, frameSpeed: 1, loop: true }
                    },
                }
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
        }
};