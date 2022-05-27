"use strict";

function halfBoldText(text) {
    // Split into words
    const words = text.trim().split(" ");
    
    // Loop through words
    for (let i = 0; i < words.length; i++) {
        // Strip punctuation
        const strippedWord = words[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

        // Bold the word
        words[i] = words[i].replace(strippedWord, boldWord(strippedWord));

        
    }

    return words.join(" ");
}

function boldWord(word) {
    var ret = "";
    switch (word.length) {
        case 0:
            break;
        case 1, 2:
            if(word = "") console.log("word is empty");
            ret= `<b>${word}</b>`;
            if(ret = "<b></b>") console.log("ret is empty");
            break;
        
        case 3:
            ret = `<b>${word.substring(0, 1)}</b>${word.substring(1)}`;

        default:
            // Bold half the word
            const half = Math.ceil(word.length / 2);
            ret = `<b>${word.substring(0, half)}</b>${word.substring(half)}`;

            break;
    }
    return ret;
}

// Traverse the dom and find and replace the text
function traverseAndReplace(element) {
    for (let node of element.childNodes) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                // Ignore some tags
                if (["style", "script", "img", "a", "table", "code"].includes(node.tagName.toLowerCase())) {
                    continue;
                }
                traverseAndReplace(node);
                break;
            case Node.TEXT_NODE:
                const text = node.textContent;
                if (text.length == 0) break;
                const newText = halfBoldText(text);
                const newNode = document.createElement("span");
                newNode.innerHTML = newText;
                element.replaceChild(newNode, node);
                break;
            case Node.DOCUMENT_NODE:
                traverseAndReplace(node);
                break;
        }
    }
}

console.log("Half bolding this page");
traverseAndReplace(document.body);