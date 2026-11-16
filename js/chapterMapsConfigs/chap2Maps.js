import { NPC_STATES } from "../Npc.js";

export const chapter2Maps = {
    "trainStation2": {
        imageSrc: '../assets/Tilemaps/chap2/trainStation2.png',
        jsonDataSrc: '../data/maps/chap2/trainStation2.json',
        playerDefaultSpawn: { x: 305, y: 227 },
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
                        { type: "CHANGE_MAP", targetMap: "opalDream", x: 317, y: 240 },
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
        playerDefaultSpawn: { x: 305, y: 227 },
        npcs: [],
        items: [
        ],
        triggers: [
            /*{
                x: 520, y: 318, width: 40, height: 48,
                targetMap: "hotelLobby",
                targetPlayerX: 188, targetPlayerY: 353,
            },*/
        ]
    },
}