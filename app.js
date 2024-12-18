const historyList = document.getElementById("historyList");

function analyzeText() {
    const text = document.getElementById("inputText").value;
    const outputDiv = document.getElementById("output");

    if (!text) {
        outputDiv.innerHTML = "<p>Please enter some text to analyze.</p>";
        return;
    }

    const lexicalAmbiguities = {
        "bank": ["a financial institution", "the side of a river"],
        "bat": ["a flying mammal", "sports equipment"],
        "lead": ["to guide", "a type of metal"]
    };

    const structuralPatterns = [
        { pattern: /with\s[a-zA-Z]+/g, explanation: "Possible prepositional phrase attachment ambiguity." }
    ];

    let result = "<h2>Analysis:</h2>";

    // Check for lexical ambiguities
    result += "<h3>Lexical Ambiguities:</h3>";
    let lexicalFound = false;
    for (let word in lexicalAmbiguities) {
        if (text.includes(word)) {
            lexicalFound = true;
            result += `<p class="tooltip"><strong>${word}</strong>: ${lexicalAmbiguities[word].join(" / ")}<span class="tooltiptext">Multiple meanings detected</span></p>`;
        }
    }
    if (!lexicalFound) {
        result += "<p>No lexical ambiguities detected.</p>";
    }

    // Check for structural ambiguities
    result += "<h3>Structural Ambiguities:</h3>";
    let structuralFound = false;
    structuralPatterns.forEach(patternObj => {
        if (patternObj.pattern.test(text)) {
            structuralFound = true;
            result += `<p>${patternObj.explanation}</p>`;
        }
    });
    if (!structuralFound) {
        result += "<p>No structural ambiguities detected.</p>";
    }

    outputDiv.innerHTML = result;

    addToHistory(text);
}

function addToHistory(text) {
    const li = document.createElement("li");
    li.textContent = text;
    li.onclick = () => {
        document.getElementById("inputText").value = text;
        analyzeText();
    };
    historyList.appendChild(li);
}

function exportAnalysis() {
    const outputContent = document.getElementById("output").innerText;
    const blob = new Blob([outputContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analysis.txt";
    a.click();
    URL.revokeObjectURL(url);
}
