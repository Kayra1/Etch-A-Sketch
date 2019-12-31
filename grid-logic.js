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

    // Get the color from the grid container
    let color = document.getElementById("grid-container").getAttribute("swatchcolor");
    console.log(color);

    paintables.forEach((element) => {
        element.addEventListener('mouseover', function() {
            this.style.backgroundColor = `${color}`;
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

