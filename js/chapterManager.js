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
            hasTalkedToElder: false
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

    /*advanceChapter(nextChapter) {
        if (CHAPTERS[nextChapter]) {
            this.currentChapter = nextChapter;
            console.log(`[New chapter unlocked: ${this.currentChapter}!`);
        }
    }*/
}
