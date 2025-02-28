document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed."); // Debugging

    const runButton = document.getElementById("run-code");
    const codeInput = document.getElementById("code-input");
    const titleInput = document.getElementById("code-title");
    const output = document.getElementById("output");
    const saveButton = document.getElementById("save-code");
    const savedCodesList = document.getElementById("saved-codes");
    
    
    // Load saved code snippets and add only new ones
    fetch("https://raw.githubusercontent.com/vorkvoyd/portfolio-repo/main/saved-code.json")
        .then(response => response.json())
        .then(data => {
            const savedCodesList = document.getElementById("saved-codes");
            if (savedCodesList) {
                const existingTitles = new Set(Array.from(savedCodesList.children).map(li => li.textContent.trim()));
                data.snippets.forEach(snippet => {
                    if (!existingTitles.has(snippet.title)) {
                        let li = document.createElement("li");
                        li.innerHTML = `
                            <span>${snippet.title}</span>
                            <button class="load-code">Load</button>
                        `;
                        li.querySelector(".load-code").addEventListener("click", function () {
                            codeInput.value = snippet.code.join("\n");
                            titleInput.value = snippet.title;
                        });
                        savedCodesList.appendChild(li);
                    }
                });
            }
        })
        .catch(error => console.error("Error loading saved snippets:", error));   
    
    let savedCodes = JSON.parse(localStorage.getItem("savedCodes")) || [];
    
    function renderSavedCodes() {
        savedCodesList.innerHTML = "";
        savedCodes.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span>${item.title}</span>
                <button class="load-code" data-index="${index}">Load</button>
                <button class="delete-code" data-index="${index}">Delete</button>
            `;
            savedCodesList.appendChild(li);
        });
    }

    // Capture console.log and display it in the output
    (function () {
        const oldLog = console.log;
        console.log = function (...messages) {
            messages.forEach(message => {
                output.textContent += message + "\n";
            });
            oldLog.apply(console, messages);
        };
    })();

    runButton.addEventListener("click", function () {
        output.textContent = ""; // Clear output before running new code
        try {
            let result = eval(codeInput.value);
            if (result !== undefined) {
                console.log(result); // Print return values if any
            }
        } catch (error) {
            console.log("Error: " + error.message);
        }
    });

    function renderSavedCodes() {
        savedCodesList.innerHTML = "";
        savedCodes.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span>${item.title}</span>
                <button class="load-code" data-index="${index}">Load</button>
                <button class="delete-code" data-index="${index}">Delete</button>
            `;
            savedCodesList.appendChild(li);
        });
    }

    saveButton.addEventListener("click", function () {
        if (codeInput.value.trim()) {
            let title = titleInput && titleInput.value.trim() ? titleInput.value : `Snippet ${savedCodes.length + 1}`;
            savedCodes.push({ title: title, code: codeInput.value });
            localStorage.setItem("savedCodes", JSON.stringify(savedCodes));
            renderSavedCodes();
            // if (titleInput) titleInput.value = "";
            // codeInput.value = "";
        }
    });

    savedCodesList.addEventListener("click", function (e) {
        if (e.target.classList.contains("load-code")) {
            let index = e.target.dataset.index;
            if (titleInput) titleInput.value = savedCodes[index].title;
            codeInput.value = savedCodes[index].code;
        }
        if (e.target.classList.contains("delete-code")) {
            let index = e.target.dataset.index;
            savedCodes.splice(index, 1);
            localStorage.setItem("savedCodes", JSON.stringify(savedCodes));
            renderSavedCodes();
        }
    });

    // Prevent Tab Key from Leaving the Code Input Box
    if (codeInput) {
        codeInput.addEventListener("keydown", function (e) {
            if (e.key === "Tab") {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 1;
            }
        });
    }



    renderSavedCodes();
});
