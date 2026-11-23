import { NPC_STATES } from "../Npc.js";

export const chapter3Maps = {

     "asylumLobby":{
        imageSrc: '../assets/Tilemaps/chap3/AsylumLobby.png',
        jsonDataSrc: '../data/maps/chap3/asylumLobby.json',
        playerDefaultSpawn: { x: 346, y: 288 },
        npcs:[
            {
                x: 346, y: 185, key: "asylum_lobby_convo", interactable: true,
                dialogueVariants: [
                    {flag: "vincentyap", key: "vincent_repeat"}
                ],
                animationConfig: {
                    [NPC_STATES.IDLE]: {src: "../../assets/NPCSprites/Vincent-Sheet.png", frameCount: 2, frameSpeed: 4, loop: true}
                }
            },
        ],
        items: [
            {
                x: 456, y: 96, 
                name: "arrows_notice_board",
                pickup: false,
                visible: false,
                dialogueKey: "arrow_notice_board",
            }
        ],
        triggers: [
            {
                //up
               x: 336, y: 50, width: 48, height: 48,
               targetMap: "asylum1",
               targetPlayerX: 346, targetPlayerY: 288,
               requiredFlag: "arrows"
            },
            {
                //upblock
                x: 336, y: 50, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "arrows",
                repeatable: true
            },
            {
                //left
                x: 168, y: 240, width: 40, height: 48,
                targetMap: "asylumLobby",
                targetPlayerX: 346, targetPlayerY: 288,
                requiredFlag:"arrows"
            },
            {
                //leftblock
                x: 168, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "arrows",
                repeatable: true
            },
            {
                //down
                x: 336, y: 367, width: 48, height: 48,
                dialogueKey: "asylum_door_block",
                repeatable: true
            },
            {
                //downblock
            },
            {
                //right
                 x: 512, y: 240, width: 48, height: 48,
                targetPlayerX: 245, targetPlayerY: 220,
                targetMap:"asylumLobby",
                requiredFlag:"arrows"
                
            },
            {
                //rightblock
                x: 500, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "arrows",
                repeatable: true

            }
        ],
    },
    "asylum1": {
        imageSrc: '../assets/Tilemaps/chap3/asylum1.png',
        jsonDataSrc:'../data/maps/chap3/asylum1.json',
        playerDefaulSpawn: { x: 346, y: 288},
        npcs:[],
        items:[],
        triggers:[
             {
                //up
               x: 336, y: 50, width: 48, height: 48,
               targetMap: "asylumLobby",
               targetPlayerX: 346, targetPlayerY: 288,
               //requiredFlag: ""
            },
           /*{
                //upblock
                x: 336, y: 50, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //left
                x: 168, y: 240, width: 40, height: 48,
                targetMap: "asylumLobby",
                targetPlayerX: 450, targetPlayerY: 220,
               // targetPlayerX: 346, targetPlayerY: 288,
                //requiredFlag:""
            },
            /*{
                //leftblock
                x: 168, y: 240, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //down
                x: 336, y: 367, width: 48, height: 48,
                targetMap: "asylumLobby",
                targetPlayerX: 346, targetPlayerY: 144,
            },
            /*{
                //downblock
                x: 336, y: 367, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //right
                 x: 512, y: 240, width: 48, height: 48,
                targetPlayerX: 245, targetPlayerY: 220,
                targetMap:"asylum2",
                //requiredFlag:""
                
            },
            /*{
                //rightblock
                x: 500, y: 240, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true

            }*/
        ]

    },
    "asylum2": {
        imageSrc: '../assets/Tilemaps/chap3/asylum2.png',
        jsonDataSrc:'../data/maps/chap3/asylum2.json',
        playerDefaulSpawn: { x: 346, y: 288},
        npcs:[],
        items:[],
        triggers:[
             {
                //up
               x: 336, y: 50, width: 48, height: 48,
               targetMap: "asylum3",
               targetPlayerX: 346, targetPlayerY: 300,
               //requiredFlag: ""
            },
           /*{
                //upblock
                x: 336, y: 50, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //left
                x: 168, y: 240, width: 40, height: 48,
                targetMap: "asylum1",
                targetPlayerX: 450, targetPlayerY: 220,
                //requiredFlag:""
            },
            /*{
                //leftblock
                x: 168, y: 240, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //down
                x: 336, y: 367, width: 48, height: 48,
                targetMap: "asylumLobby",
                targetPlayerX: 346, targetPlayerY: 288,
            },
            /*{
                //downblock
                x: 336, y: 367, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //right
                 x: 512, y: 240, width: 48, height: 48,
                targetPlayerX: 346, targetPlayerY: 288,
                targetMap:"asylumLobby",
                //requiredFlag:""
                
            },
            /*{
                //rightblock
                x: 500, y: 240, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true

            }*/
        ]

    },
    "asylum3": {
        imageSrc: '../assets/Tilemaps/chap3/asylum3.png',
        jsonDataSrc:'../data/maps/chap3/asylum3.json',
        playerDefaulSpawn: { x: 346, y: 288},
        npcs:[],
        items:[],
        triggers:[
             {
                //up
               x: 336, y: 50, width: 48, height: 48,
               targetMap: "asylum4",
               targetPlayerX: 346, targetPlayerY: 300,
               //requiredFlag: ""
            },
           /*{
                //upblock
                x: 336, y: 50, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //left
                x: 168, y: 240, width: 40, height: 48,
                targetMap: "asylumLobby",
                targetPlayerX: 346, targetPlayerY: 288,
                //requiredFlag:""
            },
            /*{
                //leftblock
                x: 168, y: 240, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //down
                x: 336, y: 367, width: 48, height: 48,
                targetMap: "asylum2",
                targetPlayerX: 346, targetPlayerY: 144,
            },
            /*{
                //downblock
                x: 336, y: 367, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //right
                 x: 512, y: 240, width: 48, height: 48,
                targetPlayerX: 346, targetPlayerY: 288,
                targetMap:"asylumLobby",
                //requiredFlag:""
                
            },
            /*{
                //rightblock
                x: 500, y: 240, width: 48, height: 48,
                dialogueKey: "_board_block",
                disabledByFlag: "",
                repeatable: true

            }*/
        ]

    },
    "asylum4": {
        imageSrc: '../assets/Tilemaps/chap3/asylum4.png',
        jsonDataSrc:'../data/maps/chap3/asylum4.json',
        playerDefaulSpawn: { x: 346, y: 288},
        npcs:[],
        items:[
            {
                x: 504, y: 168,
                name:"pipes_notice_board",
                dialogueKey: "pipes_notice_board",
                pickup: false,
                visible: false,

            }
        ],
        triggers:[
             {
                //up
               x: 336, y: 50, width: 48, height: 48,
               targetMap: "asylumLobby",
               targetPlayerX: 346, targetPlayerY: 288,
               requiredFlag: "pipes"
            },
           {
                //upblock
                x: 336, y: 50, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "pipes",
                repeatable: true
            },
            {
                //left
                x: 168, y: 240, width: 40, height: 48,
                targetMap: "asylumLobby",
                targetPlayerX: 346, targetPlayerY: 288,
                requiredFlag:"pipes"
            },
            {
                //leftblock
                x: 168, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "pipes",
                repeatable: true
            },
            {
                //down
                x: 336, y: 367, width: 48, height: 48,
                targetMap: "asylum3",
                targetPlayerX: 346, targetPlayerY: 144,
                requiredFlag: "pipes"
            },
            {
                //downblock
                x: 336, y: 367, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "pipes",
                repeatable: true
            },
            {
                //right
                 x: 512, y: 240, width: 48, height: 48,
                targetPlayerX: 245, targetPlayerY: 220,
                targetMap:"asylum5",
                requiredFlag:"pipes"
                
            },
            {
                //rightblock
                x: 500, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "pipes",
                repeatable: true

            }
        ]

    },
    "asylum5": {
        imageSrc: '../assets/Tilemaps/chap3/asylum5.png',
        jsonDataSrc:'../data/maps/chap3/asylum5.json',
        playerDefaulSpawn: { x: 346, y: 288},
        npcs:[],
        items:[],
        triggers:[
             {
                //up
               x: 336, y: 50, width: 48, height: 48,
               targetMap: "asylum6",
               targetPlayerX: 346, targetPlayerY: 300,
               //requiredFlag: ""
            },
           /*{
                //upblock
                x: 336, y: 50, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //left
                x: 168, y: 240, width: 40, height: 48,
                targetMap: "asylum4",
                targetPlayerX: 450, targetPlayerY: 220,
                //requiredFlag:""
            },
            /*{
                //leftblock
                x: 168, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //down
                x: 336, y: 367, width: 48, height: 48,
                targetMap: "asylumLobby",
                targetPlayerX: 346, targetPlayerY: 288,
            },
            /*{
                //downblock
                x: 336, y: 367, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //right
                 x: 512, y: 240, width: 48, height: 48,
                targetPlayerX: 346, targetPlayerY: 288,
                targetMap:"asylumLobby",
                //requiredFlag:""
                
            },
            /*{
                //rightblock
                x: 500, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true

            }*/
        ]

    },
    "asylum6": {
        imageSrc: '../assets/Tilemaps/chap3/asylum6.png',
        jsonDataSrc:'../data/maps/chap3/asylum6.json',
        playerDefaulSpawn: { x: 346, y: 288},
        npcs:[],
        items:[],
        triggers:[
             {
                //up
               x: 336, y: 50, width: 48, height: 48,
               targetMap: "asylum7",
               targetPlayerX: 346, targetPlayerY: 300,
               //requiredFlag: ""
            },
           /*{
                //upblock
                x: 336, y: 50, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //left
                x: 168, y: 240, width: 40, height: 48,
                targetMap: "asylumLobby",
                targetPlayerX: 346, targetPlayerY: 288,
                //requiredFlag:""
            },
            /*{
                //leftblock
                x: 168, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //down
                x: 336, y: 367, width: 48, height: 48,
                targetMap: "asylum5",
                targetPlayerX: 346, targetPlayerY: 144,
            },
            /*{
                //downblock
                x: 336, y: 367, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //right
                 x: 512, y: 240, width: 48, height: 48,
                targetPlayerX: 346, targetPlayerY: 288,
                targetMap:"asylumLobby",
                //requiredFlag:""
                
            },
            /*{
                //rightblock
                x: 500, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true

            }*/
        ]

    },
    "asylum7": {
        imageSrc: '../assets/Tilemaps/chap3/asylum7.png',
        jsonDataSrc:'../data/maps/chap3/asylum7.json',
        playerDefaulSpawn: { x: 346, y: 288},
        npcs:[],
        items:[
            {
                x: 192, y: 288,
                name:"bodies_notice_board",
                dialogueKey: "bodies_notice_board",
                pickup: false,
                visible: false,
            }
        ],
        triggers:[
             {
                //up
               x: 336, y: 50, width: 48, height: 48,
               targetMap: "asylumLobby",
               targetPlayerX: 346, targetPlayerY: 288,
               requiredFlag: "bodies"
            },
           {
                //upblock
                x: 336, y: 50, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "bodies",
                repeatable: true
            },
            {
                //left
                x: 168, y: 240, width: 40, height: 48,
                targetMap: "asylum8",
                targetPlayerX: 450, targetPlayerY: 220,
                requiredFlag:"bodies"
            },
            {
                //leftblock
                x: 168, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "bodies",
                repeatable: true
            },
            {
                //down
                x: 336, y: 367, width: 48, height: 48,
                targetMap: "asylum6",
                targetPlayerX: 346, targetPlayerY: 144,
                requiredFlag:"bodies"
            },
            {
                //downblock
                x: 336, y: 367, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "bodies",
                repeatable: true
            },
            {
                //right
                 x: 512, y: 240, width: 48, height: 48,
                targetPlayerX: 346, targetPlayerY: 288,
                targetMap:"asylumLobby",
                requiredFlag:"bodies"
                
            },
            {
                //rightblock
                x: 500, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "bodies",
                repeatable: true

            }
        ]

    },
    "asylum8": {
        imageSrc: '../assets/Tilemaps/chap3/asylum8.png',
        jsonDataSrc:'../data/maps/chap3/asylum8.json',
        playerDefaulSpawn: { x: 346, y: 288},
        npcs:[],
        items:[],
        triggers:[
             {
                //up
               x: 336, y: 50, width: 48, height: 48,
               targetMap: "asylumLobby",
               targetPlayerX: 346, targetPlayerY: 288,
               //requiredFlag: ""
            },
           /*{
                //upblock
                x: 336, y: 50, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //left
                x: 168, y: 240, width: 40, height: 48,
                targetMap: "asylum9",
                targetPlayerX: 450, targetPlayerY: 220,
                //requiredFlag:""
            },
            /*{
                //leftblock
                x: 168, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //down
                x: 336, y: 367, width: 48, height: 48,
                targetMap: "asylumLobby",
                targetPlayerX: 346, targetPlayerY: 288,
            },
            /*{
                //downblock
                x: 336, y: 367, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true
            },*/
            {
                //right
                x: 512, y: 240, width: 48, height: 48,
                targetPlayerX: 245, targetPlayerY: 220,
                targetMap:"asylum7",
                //requiredFlag:""
                
            },
            /*{
                //rightblock
                x: 500, y: 240, width: 48, height: 48,
                dialogueKey: "notice_board_block",
                disabledByFlag: "",
                repeatable: true

            }*/
        ]

    },
    "asylum9": {
        imageSrc: '../assets/Tilemaps/chap3/asylum9.png',
        jsonDataSrc:'../data/maps/chap3/asylum9.json',
        playerDefaulSpawn: { x: 346, y: 288},
        npcs:[
            /*{
                x: 264, y: 288, key: "grace_confrontation", interactable: true,
                animationConfig: {
                    [NPC_STATES.IDLE]: {src: "../../assets/NPCSprites/GraceGWHAT-Sheet.png", frameCount: 2, frameRow: 1, totalRows: 3, frameSpeed: 4, loop: true},
                }
            }*/
        ],
        items:[],
        triggers:[
            {
                x: 512, y: 240, width: 48, height: 48,
                dialogueKey: "asylum_door_block",
                repeatable: true
            }
        ]

    },
}