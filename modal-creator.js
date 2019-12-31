function launchModal(){
    // Stop painting functionality

    removeHoverListener();

    // Create the original settings modal
    let settings = document.createElement("div");
    let darkBackground = document.createElement("div");
    let closeModal = document.createElement("button");
    let modalContent = document.createElement("div");

    settings.setAttribute("class","modal is-active");
    darkBackground.setAttribute("class","modal-background");
    modalContent.setAttribute("class", "modal-content");
    closeModal.setAttribute("class", "modal-close is-large");
    closeModal.setAttribute("onclick", "removeModal()");

    // Append background first
    settings.appendChild(darkBackground);

    // Create the content
    let settingsBox = document.createElement("div");
    let settingsForm = document.createElement("form");
    settingsBox.setAttribute("class", "box");


    // Grid Size
    let gridSizeQ = document.createElement("p");
    gridSizeQ.innerText = "What is your preferred grid size?";
    let gridSizeInput = document.createElement("input");
    gridSizeInput.setAttribute("class", "input is-rounded");
    gridSizeInput.setAttribute("id", "grid-size");
    gridSizeInput.setAttribute("type", "number");
    gridSizeInput.setAttribute("placeholder", "16");

    // Color
    let gridColorQ = document.createElement("p");
    gridColorQ.innerText = "Pick a color you like";
    let gridColorInput = document.createElement("input");
    gridColorInput.setAttribute("class", "input is-rounded");
    gridColorInput.setAttribute("id", "pen-color");
    gridColorInput.setAttribute("type", "color");
    gridColorInput.setAttribute("placeholder", "#ff0000");    



    // Append these settings to the content div
    settingsBox.appendChild(gridSizeQ);
    settingsBox.appendChild(gridSizeInput);

    settingsBox.appendChild(gridColorQ);
    settingsBox.appendChild(gridColorInput);

    modalContent.appendChild(settingsBox);

    // Append the content div to the settings modal second
    settings.appendChild(modalContent);

    // Append close button to the end
    settings.appendChild(closeModal);

    // Add this modal to the root of the grid
    gridHead = document.getElementById("grid-container");
    gridHead.appendChild(settings);
}

function removeModal() {
    // Save Settings
    let gridHead = document.getElementById('grid-container');

    // Grid Size
    let gridSize = document.getElementById('grid-size').value;
    gridHead.setAttribute('gridsize', `${gridSize}`);

    // Pen color
    let gridColor = document.getElementById('pen-color').value;
    gridHead.setAttribute('swatchcolor', `${gridColor}`);

    // Find the modal (there will always be only one)
    mountedModal = document.getElementsByClassName("modal is-active");
    
    // Remove it
    mountedModal[0].remove();

    // Restart painting mode
    addHoverListener();
}