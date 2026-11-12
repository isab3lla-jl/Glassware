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
        items: [], //4 i think
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
        items: [], //4 i think
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
                x: 168, y: 144, width: 48, height: 64, //not set (ask twin)
                requiredFlag: "readGracePapers", // not set yet
                flagRequired: "idk", // unsure if it will be necesary, maybe not
                cutscene: [
                    //{ type: "STAND", who: "grace", direction: "DOWN", time: 2000 }, //not set yet
                ]
            },
            {
                x: 264, y: 440, width: 192, height: 40,
                targetMap: "crossStreet",
                targetPlayerX: 360, targetPlayerY: 85,
            }
        ]
    },
    "finleyStreet": {
        imageSrc: '../assets/Tilemaps/chap1/finleyStreet.png',
        jsonDataSrc: '../data/maps/chap1/finleyStreet.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [], //finley
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
        npcs: [], //kitty and bennet
        items: [],
        triggers: [
            {
                x: 264, y: 0, width: 192, height: 40,
                targetMap: "crossStreet",
                targetPlayerX: 360, targetPlayerY: 320,
            },
        ]
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
            }
        ]
    },
    "graceHouse": {
        imageSrc: '../assets/Tilemaps/chap1/graceHouse.png',
        jsonDataSrc: '../data/maps/chap1/graceHouse.json',
        playerDefaultSpawn: { x: 360, y: 50 },
        npcs: [],
        items: [], //1 readable
        triggers: [
            {
                x: 337, y: 360, width: 46, height: 55,
                targetMap: "graceStreet",
                targetPlayerX: 116, targetPlayerY: 320,
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
                    x: 384, y: 120, 
                    name: "gin",
                    dialogueKey: "grabbed_gin", 
                    /*animationConfig: {
                        [NPC_STATES.IDLE]: { src: "./assets/ItemSprites/Coins.png", frameCount: 1, frameSpeed: 1, loop: true }
                    },*/
                    //triggerFlag: "grabbedMoney"
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