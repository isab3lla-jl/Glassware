export const CHAPTERS = {
    PROLOGUE: "PROLOGUE",
    CHAPTER_1: "CHAPTER_1",
    CHAPTER_2: "CHAPTER_2",
    CHAPTER_3: "CHAPTER_3"
};

const CHAPTER_ORDER = Object.values(CHAPTERS);

export default class ChapterManager {
    constructor() {
        this.currentChapter = CHAPTERS.PROLOGUE;
        
        this.defaultFlags = {
            //tutorial flags
            tutorialMove: false,
            tutorialInteract: false,
            tutorialQuest: false,
            //prologue flags
            talkedToBennet: false,
            graceTurn: false,
            doorDialogue: false,
            checkedDoor: false,
            grabbedKey: false,
            sawRoomCutscene: false,
            grabbedMoney: false
        };


        this.flags = { ...this.defaultFlags };
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

    advanceChapter(nextChapter = null) {
        if (!nextChapter) {
            const i = CHAPTER_ORDER.indexOf(this.currentChapter);
            nextChapter = CHAPTER_ORDER[i + 1];
        }

        if (!nextChapter || !(nextChapter in CHAPTERS)) {
            console.warn(`Can't advance to chapter "${nextChapter}".`);
            return false;
        }

        this.currentChapter = nextChapter;
        console.log(`New chapter unlocked: ${this.currentChapter}`);
        return true;
    }

    reset() {
        this.currentChapter = CHAPTERS.PROLOGUE;
        this.flags = { ...this.defaultFlags };
    }
}
