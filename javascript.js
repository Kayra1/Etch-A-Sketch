function redrawGrid() {
    // Get the tag that contains the grid
    gridHead = document.getElementById("grid-container");

    // Settings for the grid:
    let gridSize = gridHead.getAttribute("gridsize");
    
    // Remove whatever was inside the grid
    eraseGrid();

    // Redraw an empty gird
    drawGrid(gridSize);

    // Hover listeners are added on mousedown
    // Hover listeners are removed on mouseup
    addHoverListener();
}

function drawGrid(gridSize) {
    for (let gridRow = 0; gridRow < gridSize; gridRow++) {
        // A row container for styling the grid
        let gridRowDiv = document.createElement('div');
        gridRowDiv.setAttribute('class', 'gridRow');
        gridRowDiv.setAttribute('id', `row-${gridRow + 1}`);

        // Fill this row with columns
        for (let gridCol = 0; gridCol < gridSize; gridCol++) {
            let gridSlotDiv = document.createElement('div');
            gridSlotDiv.setAttribute('class','gridSlotDiv')
            gridSlotDiv.setAttribute('id',`${gridRow + 1}-${gridCol + 1}`);

            // Set the dimensions of the box depending on the grid size to fit on the screen
            gridSlotDiv.style.height = `${(100 / gridSize) - 0.3}vmin`;
            gridSlotDiv.style.width = `${(100 / gridSize) - 0.3}vmin`;

            // Add the div to the row
            gridRowDiv.appendChild(gridSlotDiv);
        }

        // Add the row to the document
        gridHead.appendChild(gridRowDiv);
    }
}

function eraseGrid() {
    // Remove all children
    if (gridHead.hasChildNodes()) {
        gridHead.innerHTML = "";
    }
}

function addHoverListener(){
    
    document.addEventListener('mousedown', HoverListenerAdder);
    document.addEventListener('mouseup', HoverListenerRemover);

}

function HoverListenerAdder(){
    // Paint when hovered on
    const paintables = document.querySelectorAll('.gridSlotDiv');

    paintables.forEach((element) => {
        element.addEventListener('mouseover', function() {
            this.style.backgroundColor = "red";
        });
    });
}

function HoverListenerRemover() {
    // Easier to just clone everything to remove all the listeners
    let oldGrid = document.getElementById("grid-container");
    let newGrid = oldGrid.cloneNode(true);
    oldGrid.parentNode.replaceChild(newGrid, oldGrid);
}

function removeHoverListener(){
    document.removeEventListener('mousedown', HoverListenerAdder);
    document.removeEventListener('mouseup', HoverListenerRemover);
}

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


    // Append these settings to the content div
    settingsBox.appendChild(gridSizeQ);
    settingsBox.appendChild(gridSizeInput);

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
    // Update Settings
    let gridSize = document.getElementById('grid-size').value;
    console.log(gridSize);


    let gridHead = document.getElementById('grid-container');
    gridHead.setAttribute('gridsize', `${gridSize}`);

    // Find the modal (there will always be one)
    mountedModal = document.getElementsByClassName("modal is-active");
    
    // Remove it
    mountedModal[0].remove();

    // Restart painting mode
    addHoverListener();
}