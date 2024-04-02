// ==UserScript==
// @name         BlS family Form auto fill
// @namespace    http://your.namespace.com
// @version      1.0
// @description  BlS family Form auto fill
// @author       Mohamed Elkorady
// @match        http://*/*
// @match        https://*/*
// ==/UserScript==

(function() {
    'use strict';

    // URL of the JSON file on GitHub
    const jsonUrl = 'https://raw.githubusercontent.com/username/repository/main/users.json';

    // Fetch the JSON data from GitHub
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Create buttons for each subkey
            for (const mainKey in data) {
                const subKeys = data[mainKey];
                for (const subKey in subKeys) {
                    const button = document.createElement('button');
                    button.textContent = subKey;
                    button.style.backgroundColor = 'blue'; // Set background color
                    button.style.color = 'white'; // Set text color
                    button.style.fontFamily = 'Arial, sans-serif'; // Set font family
                    button.style.fontSize = '14px'; // Set font size
                    button.style.padding = '8px 16px'; // Set padding
                    button.style.border = 'none'; // Remove border
                    button.style.borderRadius = '4px'; // Add border radius
                    button.style.cursor = 'pointer'; // Add pointer cursor
                    button.style.zIndex = 5000;

                    const needed_key = data[mainKey][subKey];
                    button.addEventListener('click', () => {
                        for (const i in needed_key) {
                            let prop = Object.keys(needed_key[i])[0]; // Get the property name
                            let value = needed_key[i][prop]; // Get the property value
                            const element = document.querySelector(`#${prop}`);
                            if (element) {
                                // Check the type of the element and set its value accordingly
                                if (element.type === 'radio') {
                                    // If it's a radio button, check if its value matches the JSON value
                                    element.checked = true;
                                } else if (element.tagName === 'SELECT') {
                                    // If it's a select dropdown, set the selected option
                                    const options = element.options;
                                    for (const option of options) {
                                        if (option.value === value) {
                                            option.selected = true;
                                        }
                                    }
                                } else {
                                    // For other input types, simply set the value
                                    element.value = value;
                                }
                            }
                        }
                    });
                    document.body.appendChild(button); // Append button to body
                }
            }
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
})();
