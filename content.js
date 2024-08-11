(function() {
    // Predefined XPath options
    const xpathOptions = {
        "title": "//div[contains(@class, '')]//h1[contains(@id, '')]",
        "long description": "//p[1]",
        "primary image": "//div[contains(@class, '')]//img//@src",
        "sku": "//footer//a",
        "product type": "//footer//a",
        "meta image": "//footer//a",
        "meta title": "//footer//a",
    };

    // Check if the panel already exists
    let panel = document.getElementById('xpath-search-panel');

    // If the panel exists, toggle its visibility
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    } else {
        // If the panel doesn't exist, create it
        panel = document.createElement('div');
        panel.id = 'xpath-search-panel';
        panel.style.display = 'block'; // Initially display the panel
        panel.innerHTML = `
            <div id="panel-header">
                <select id="xpathDropdown">
                    <option value="">Select an XPath...</option>
                    ${Object.keys(xpathOptions).map(option => `<option value="${xpathOptions[option]}">${option}</option>`).join('')}
                </select>
                <input type="text" id="xpathInput" placeholder="Enter XPath or select from above" />
                <button id="searchBtn">Search</button>
                <div id="result"></div>
            </div>
        `;
        document.body.appendChild(panel);

        // Load previous state from localStorage
        document.getElementById("xpathInput").value = localStorage.getItem("xpathInput") || "";
        document.getElementById("result").innerText = localStorage.getItem("result") || "";

        // Update input field when a dropdown option is selected
        document.getElementById("xpathDropdown").addEventListener("change", function() {
            document.getElementById("xpathInput").value = this.value;
        });

        // Add event listener for the search button
        document.getElementById("searchBtn").addEventListener("click", () => {
            const xpath = document.getElementById("xpathInput").value;

            // Execute the XPath search
            try {
                const result = document.evaluate(
                    xpath,
                    document,
                    null,
                    XPathResult.STRING_TYPE,
                    null
                ).stringValue;

                const resultText = result || "No data found at the specified XPath.";
                document.getElementById("result").innerText = resultText;

                // Save state to localStorage
                localStorage.setItem("xpathInput", xpath);
                localStorage.setItem("result", resultText);
            } catch (e) {
                document.getElementById("result").innerText = `Error: ${e.message}`;
            }
        });
    }
})();
