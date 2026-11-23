import { CHAPTERS } from "./chapterManager.js";

export const QUESTS = {
    [CHAPTERS.PROLOGUE]: [
        {
            id: "go_home",
            type: "main",
            key: "quest_go_home",
            hideWhen: ["sawRoomCutscene"]
        },
        {
            id: "find_key",
            type: "side",
            key: "quest_find_key",
            showWhen: ["checkedDoor"],
            doneWhen: ["grabbedKey"],
            hideWhen: ["sawRoomCutscene"]
        },
        {
            id: "get_vial",
            type: "main",
            key: "quest_get_vial",
            showWhen: ["sawRoomCutscene"]
        },
        {
            id: "find_finley",
            type: "main",
            key: "quest_find_finley",
            showWhen: ["sawRoomCutscene"]
        },
    ],
    [CHAPTERS.CHAPTER_1]: [
        {
            id: "get_vial",
            type: "main",
            key: "quest_get_vial",
        },
        {
            id: "find_finley",
            type: "main",
            key: "quest_find_finley",
            hideWhen: ["finleyFound"]
        },
        {
            id: "talk_to_finley",
            type: "main",
            key: "quest_talk_to_finley",
            showWhen: ["finleyFound"],
            hideWhen: ["talkedToFinley"]
        },
        {
            id: "find_grace_house",
            type: "main",
            key: "quest_find_grace_house",
            showWhen: ["talkedToFinley"],
            //hideWhen: ["graceDoorOpened"]
            hideWhen: ["checkedGraceDoor"]
        },
        {
            id: "resuelve_open_grace_door",
            type: "main",
            key: "quest_open_grace_door",
            showWhen: ["checkedGraceDoor"],
            //hideWhen: ["checkedGraceDoor"]
            hideWhen: ["graceDoorOpened"]
        },
        {
            id: "find_bennet",
            type: "side",
            key: "quest_find_bennet",
            showWhen: ["checkedGraceDoor"],
            hideWhen: ["talkedBennetCat"]
        },
        {
            id: "talk_to_bennet",
            type: "side",
            key: "quest_talk_to_bennet",
            showWhen: ["talkedBennetCat"],
            hideWhen: ["talkedToBennetHouse"]
        },
        {
            id: "get_bottle",
            type: "side",
            key: "quest_get_bottle",
            showWhen: ["talkedToBennetHouse"],
            doneWhen: ["ginGrabbed"],
            hideWhen: ["graceDoorOpened"]
        },
        {
            id: "get_lockpicks",
            type: "side",
            key: "quest_get_lockpicks",
            showWhen: ["talkedToBennetHouse"],
            doneWhen: ["lockpicksGrabbed"],
            hideWhen: ["graceDoorOpened"]
        },
        {
            id: "open_thief_door_fr",
            key: "quest_open_thief_door_fr",
            showWhen: ["locksmithSkills"],
            hideWhen: ["graceDoorOpened"]
        },
        {
            id: "look_for_clues",
            type: "main",
            key: "quest_look_for_clues",
            showWhen: ["graceDoorOpened"],
            hideWhen: ["readGracePapers"]
        },
        {
            id: "go_to_assylum",
            type: "main",
            key: "quest_go_to_assylum",
            showWhen: ["readGracePapers"]
        },
        {
            id: "go_to_train_station",
            type: "side",
            key: "quest_go_to_train_station",
            showWhen: ["readGracePapers"],
            hideWhen: ["sawTrainCutscene"]
        },
        {
            id: "get_off_train",
            type: "side",
            key: "quest_get_off_train",
            showWhen: ["sawTrainCutscene"]
        },
    ],
    [CHAPTERS.CHAPTER_2]: [
        {
            id: "get_vial",
            type: "main",
            key: "quest_get_vial",
        },
        {
            id: "go_to_assylum",
            type: "main",
            key: "quest_go_to_assylum",
        },
        {
            id: "place_to_sleep",
            type: "main",
            key: "quest_place_to_sleep",
            hideWhen:["enterHotel"]
        },
        {
            id: "go_to_sleep",
            type: "main",
            key: "quest_go_to_sleep",
            showWhen: ["enterHotel"],
            hideWhen: ["nightmare"]
        },
        {
            id: "get_out",
            type: "main",
            key: "quest_get_out",
            showWhen: ["nightmare"],
            hideWhen: ["riddle3correct"]
        },
        {
            id: "quest_choose",
            type: "main",
            key: "quest_choose",
            showWhen: ["lanternyap"]
        },
        {
            id: "riddle1option1",
            type: "side",
            key: "quest_obj_lantern",
            showWhen: ["lanternyap"],
            hideWhen: ["riddle1correct"]
        },
        {
            id: "riddle1option2",
            type: "side",
            key: "quest_obj_soap",
            showWhen: ["lanternyap"],
            hideWhen: ["riddle1correct"]
        },
        {
            id: "riddle1option3",
            type: "side",
            key: "quest_obj_broom",
            showWhen: ["lanternyap"],
            hideWhen: ["riddle1correct"]
        },
        {
            id: "riddle2option1",
            type: "side",
            key: "quest_obj_money",
            showWhen: ["ginyap"],
            hideWhen: ["riddle2correct"]
        },
        {
            id: "riddle2option2",
            type: "side",
            key: "quest_obj_food",
            showWhen: ["ginyap"],
            hideWhen: ["riddle2correct"]
        },
        {
            id: "riddle3option3",
            type: "side",
            key: "quest_obj_gin",
            showWhen: ["ginyap"],
            hideWhen: ["riddle2correct"]
        },
        {
            id: "riddle3option1",
            type: "side",
            key: "quest_obj_love",
            showWhen: ["cigarettesyap"],
            hideWhen: ["riddle3correct"]
        },
        {
            id: "riddle3option2",
            type: "side",
            key: "quest_obj_cigarettes",
            showWhen: ["cigarettesyap"],
            hideWhen: ["riddle3correct"]
        },
        {
            id: "riddle3option3",
            type: "side",
            key: "quest_obj_book",
            showWhen: ["cigarettesyap"],
            hideWhen: ["riddle3correct"]
        },
    ],
    [CHAPTERS.CHAPTER_3]: [
        {
            id: "get_vial",
            type: "main",
            key: "quest_get_vial",
        },
        {
            id: "asylum_maze",
            type: "main",
            key: "quest_maze",
            showWhen: ["arrows"]
        }
    ]
};