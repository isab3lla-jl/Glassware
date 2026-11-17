export const CHAPTERS = {
    PROLOGUE: "PROLOGUE",
    CHAPTER_1: "CHAPTER_1",
    CHAPTER_2: "CHAPTER_2",
    CHAPTER_3: "CHAPTER_3"
};

export const START_CHAPTER = CHAPTERS.PROLOGUE; 

const CHAPTER_ORDER = Object.values(CHAPTERS);

export default class ChapterManager {
    constructor() {
        this.currentChapter = START_CHAPTER;
        
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
            grabbedMoney: false,
            //act 1 flags
            finleyFound: false,
            talkedToFinley: false,
            graceDoorDialogue: false,
            checkedGraceDoor:false,
            talkedBennetCat: false,
            talkedToBennetHouse: false,
            lockpicksGrabbed: false,
            ginGrabbed: false,
            givenGin: false,
            locksmithSkills: false,
            graceDoorOpened: false,
            readGracePapers: false,
            sawTrainCutscene: false,
            //act 2 flags
            enterHotel: false,
            talkedToMary: false,
            nightmare: false,
            nightmareyap1: false,
            lanternyap: false,
            ginyap: false,
            cigarettesyap: false,
            riddle1correct: false,
            riddle2correct: false,
            riddle3correct: false,
            endscreen: false,
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

    checkFlags(flags) {
        const list = Array.isArray(flags) ? flags : [flags];
        return list.every(f =>
            f.startsWith("!") ? !this.getFlag(f.slice(1)) : this.getFlag(f)
        );
    }

    resolveDialogueKey(baseKey, variants = []) {
        for (const variant of variants) {
            const matches = variant.flags
                ? this.checkFlags(variant.flags)
                : this.getFlag(variant.flag) === (variant.value ?? true);

            if (matches) return variant.key;
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
        this.currentChapter = START_CHAPTER;
        this.flags = { ...this.defaultFlags };
    }
}
