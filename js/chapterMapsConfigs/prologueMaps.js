export const prologueMaps = {
    "bar": {
        imageSrc: '../assets/Tilemaps/prologue/barTilemap.png',
        jsonDataSrc: '../data/maps/prologue/barTilemap.json',
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
        imageSrc: '../assets/Tilemaps/prologue/barStreetTilemap.png',
        jsonDataSrc: '../data/maps/prologue/barStreetTilemap.json',
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
    }
};