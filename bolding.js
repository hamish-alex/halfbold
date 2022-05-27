"use strict";



function halfBoldText(text) {
    // Split into words
    const words = text.split(" ");
    
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
        case 1, 2:
            ret= `<b>${word}</b>`;
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

// const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// console.log(halfBoldText(text));

// Traverse the dom and find and replace the text
function traverseAndReplace(element) {
    for (let node of element.childNodes) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
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

traverseAndReplace(document.body);