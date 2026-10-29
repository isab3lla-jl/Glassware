let dialogueDatabase = {};

export async function loadDialogueData() {
  try {
    const response = await fetch("./data/yapmaxxing.json");
    dialogueDatabase = await response.json();
    console.log("Dialogues loaded.");
  } catch (error) {
    console.error("Error while loading dialogue", error);
  }
}

export default class DialogueManager {
    constructor() {
        this.isActive = false;
        this.currentConversation = null;
        this.currentIndex = 0;
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

    nextLine() {
        if (!this.isActive) return;

        this.currentIndex++;
        if (this.currentIndex >= this.currentConversation.length) {
            this.endDialogue();
        }
    }

    endDialogue() {
        this.isActive = false;
        this.currentConversation = null;
        this.currentIndex = 0;
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

        ctx.fillStyle = "rgba(10, 10, 25, 0.9)"; 
        ctx.strokeStyle = "#ffffff";             
        ctx.lineWidth = 3;
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

        ctx.fillStyle = "#ffae00";               
        ctx.font = "bold 18px monospace";
        ctx.fillText(currentLine.speaker, boxX + 25, boxY + 35);

        ctx.fillStyle = "#ffffff";
        ctx.font = "16px monospace";
        
        const paddingX = 25;
        const maxTextWidth = boxWidth - (paddingX * 2);
        
        const wrappedLines = this.getWrappedLines(ctx, currentLine.text, maxTextWidth);

        const startY = boxY + 70; 
        const lineHeight = 24;    

        for (let i = 0; i < wrappedLines.length; i++) {
            ctx.fillText(wrappedLines[i], boxX + paddingX, startY + (i * lineHeight));
        }
        
        ctx.fillStyle = "#888888";
        ctx.font = "12px monospace";
        ctx.fillText("[Enter to continue]", boxX + boxWidth - 180, boxY + boxHeight - 15);
    }
}