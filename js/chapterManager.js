export const CHAPTERS = {
    PROLOGUE: "PROLOGUE",
    CHAPTER_1: "CHAPTER_1",
    CHAPTER_2: "CHAPTER_2",
    CHAPTER_3: "CHAPTER_3"
};

export default class ChapterManager {
    constructor() {
        this.currentChapter = CHAPTERS.PROLOGUE;
        
        this.flags = {
            talkedToBennet: false,
            doorDialogue: false,
            checkedDoor: false,
            grabbedKey: false,
            sawRoomCutscene: false
        };
    }

    getFlag(flagName) {
        return this.flags[flagName] || false;
    }

    setFlag(flagName, value = true) {
        if (flagName in this.flags) {
            this.flags[flagName] = value;
            console.log(`Flag '${flagName}' has been updated to: ${value}`);
        }
    }

    resolveDialogueKey(baseKey, variants = []) {
        for (const variant of variants) {
            const expected = variant.value ?? true;
            if (this.getFlag(variant.flag) === expected) {
                return variant.key;
            }
        }
        return baseKey;
    }

    /*advanceChapter(nextChapter) {
        if (CHAPTERS[nextChapter]) {
            this.currentChapter = nextChapter;
            console.log(`[New chapter unlocked: ${this.currentChapter}!`);
        }
    }*/
}
