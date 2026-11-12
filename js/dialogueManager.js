let dialogueDatabase = {};

export async function loadDialogueData(lang) {
    if (lang === "es") {
        try {
            const response = await fetch("./data/dialogues/palabreria.json");
            dialogueDatabase = await response.json();
        } catch (error) {
            console.error("Error while loading dialogue", error);
        }
    } else if (lang === "en") {
        try {
            const response = await fetch("./data/dialogues/yapmaxxing.json");
            dialogueDatabase = await response.json();
        } catch (error) {
            console.error("Error while loading dialogue", error);
        }
    }
}

export function getEntry(key) {
    return dialogueDatabase[key];
}

export default class DialogueManager {
    constructor() {
        this.isActive = false;
        this.currentConversation = null;
        this.currentIndex = 0;
    }

    async loadFont() {
        const pixelFont = new FontFace(
            'PixelifySans',
            'url(./assets/fonts/PixelifySans-VariableFont_wght.ttf)'
        );
        
        const loadedFont = await pixelFont.load();
        document.fonts.add(loadedFont);
    }

    startDialogue(conversationKey) {
        if (!dialogueDatabase[conversationKey]) {
        console.warn(`Conversation' ${conversationKey}' is not in JSON.`);
        return;
        }
        this.isActive = true;
        this.currentConversation = dialogueDatabase[conversationKey];
        this.currentIndex = 0;
    }

    nextLine(gameInstance) {
        if (!this.isActive) return;

        this.currentIndex++;
        if (this.currentIndex >= this.currentConversation.length) {
            this.checkDialogueTriggers(gameInstance);
            this.endDialogue();
        }
    }

    checkDialogueTriggers(gameInstance) {
        if (!gameInstance || !gameInstance.chapterManager || !this.currentConversation) return;

        const lastLine = this.currentConversation[this.currentConversation.length - 1];
        
        if (lastLine) {
            if (lastLine.triggerFlag) {
                gameInstance.chapterManager.setFlag(lastLine.triggerFlag, true);
            }
            if (lastLine.triggerChapter) {
                gameInstance.advanceChapter(lastLine.triggerChapter);
            }
        }
    }

    endDialogue() {
        this.isActive = false;
        this.currentConversation = null;
        this.currentIndex = 0;

        const event = new CustomEvent("dialogue_finished");
        document.dispatchEvent(event);
    }

    getCurrentLine() {
        if (!this.isActive) return null;
        return this.currentConversation[this.currentIndex];
    }

    getWrappedLines(ctx, text, maxWidth) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = "";

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && i > 0) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }

        lines.push(currentLine);
        return lines;
    }

    drawDialogue(ctx, canvasWidth, canvasHeight) {
        if (!this.isActive) return;

        const currentLine = this.getCurrentLine();
        if (!currentLine) return;

        const boxWidth = canvasWidth * 0.9;
        const boxHeight = 140;
        const boxX = (canvasWidth - boxWidth) / 2;
        const boxY = canvasHeight - boxHeight - 20;

        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.strokeStyle = "#eeeeee";             
        ctx.lineWidth = 3;
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

        ctx.fillStyle = "#ff9500";               
        ctx.font = "20px 'PixelifySans'";
        ctx.fillText(currentLine.speaker, boxX + 25, boxY + 35);

        ctx.fillStyle = "#eeeeee";
        ctx.font = "16px 'PixelifySans'";
        
        const paddingX = 25;
        const maxTextWidth = boxWidth - (paddingX * 2);
        
        const wrappedLines = this.getWrappedLines(ctx, currentLine.text, maxTextWidth);

        const startY = boxY + 70; 
        const lineHeight = 24;    

        for (let i = 0; i < wrappedLines.length; i++) {
            ctx.fillText(wrappedLines[i], boxX + paddingX, startY + (i * lineHeight));
        }
        
        ctx.fillStyle = "#888888";
        ctx.font = "12px 'PixelifySans'";
        ctx.fillText("[Enter or space to continue]", boxX + boxWidth - 220, boxY + boxHeight - 15);
    }
}