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
    ],
    [CHAPTERS.CHAPTER_1]: []
};