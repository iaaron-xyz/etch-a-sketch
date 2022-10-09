/***************************************************
 * GET DOM ELEMENTS and SETTING VARIABLES
 */

//const board = document.getElementById("board");
const gridBoard = document.getElementById("grid-board");
const cellsToBlackColor = document.getElementById("cells-to-black-color");
const cellsToRandomColor = document.getElementById("cells-to-random-color");
const cellsToBaseColor = document.getElementById("cells-to-base-color");
const clearBoard = document.getElementById("clear-board");
const slider = document.getElementById("slider");
const outputSliderValue = document.getElementById("output-slider-value");
const toggleGrid = document.getElementById("toggle-grid");

// Grid size initial value
let gridSide = 16;
// Current color active
let boardVariables = {"sideSize":gridSide, "black": true, "random": false, "gridLines": 0};

/***************************************************
 * FUNCTIONS
 */

function createGrid(gridSide) {
    // Get the grid dimensions in pixels
    const gridHeight = getComputedStyle(gridBoard).height;
    // Total cell to insert into the grid
    const gridArea = gridSide*gridSide;

    // Append the divs (cells)
    for (let i = 0; i < gridArea; i++) {
        // create the cell in the virtual DOM
        const div = document.createElement("div");
        // with or withou grid-lines?
        if (boardVariables.gridLines%2 == 1) {
            div.classList.add("cell");
            div.classList.add("show-grid");
        }
        else {
            div.classList.add("cell");
        }
        // Append the child node with the inline CSS
        div.style.cssText = `height: ${parseInt(gridHeight.slice(0, 3))/gridSide}px;
                            width: ${parseInt(gridHeight.slice(0, 3))/gridSide}px;`;
        // insert id cell
        div.setAttribute("id", `cell${i+1}`)
        // Create the cell in the actual DOM
        gridBoard.appendChild(div);
    }
}

function setBoardSize(buttonId) {
    let newDimension;
    // NNx -> NN
    if (typeof buttonId === "string") {
        newDimension = parseInt(buttonId.slice(0,2));
    }
    else {
        newDimension = buttonId;
    }
    // update board variables
    boardVariables.sideSize = newDimension;
    // Remove all the current cells
    gridBoard.textContent = '';
    // Insert a new number of cells
    createGrid(newDimension);
}

function startDrawing(event) {
    event.preventDefault(); // tell the browser we handle that event
    // console.log("start drawing");
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mouseover', colorCell));
}
function stopDrawing(event) {
    event.preventDefault(); // tell the browser we handle that event
    // console.log("stop drawing");
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('mouseover', colorCell));
}
function colorCell(event) {
    event.preventDefault(); // tell the browser we handle that event
    if (boardVariables.black === true) {
        event.target.style.backgroundColor = "black";
    }
    else if (boardVariables.random === true) {
        event.target.style.backgroundColor = chooseRandomRGB();
    }
    else {
        event.target.style.backgroundColor = "white";
    }
}

function toggleGridLines() {
    const cells = document.querySelectorAll('.cell');
    boardVariables.gridLines += 1;
    cells.forEach(cell => cell.classList.toggle("show-grid"));
}

function setBoardToBaseColor() {
    console.log(boardVariables);
    setBoardSize(boardVariables.sideSize);
}
function chooseRandomRGB() {
    const randomColor = `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`
    return randomColor;
}
function randomInt(lowerLimit,  upperLimit) {
    if (lowerLimit < upperLimit) {
        return Math.floor(lowerLimit + (Math.random()*upperLimit))
    }
    else {
        console.error("lowerLimit must be lower than upperLimit.");
    }
}


/*************************************************
 * APPLY CHANGES TO THE DOM
 */
// Generate the grid when page load for the first time
createGrid(gridSide);

// Set the current state of color to use
cellsToBlackColor.addEventListener("click", () => {
    boardVariables.black = true;
    boardVariables.random = false;
    console.log(boardVariables);
});
cellsToRandomColor.addEventListener("click", () => {
    boardVariables.black = false;
    boardVariables.random = true;
    console.log(boardVariables);
});
cellsToBaseColor.addEventListener("click", () => {
    boardVariables.black = false;
    boardVariables.random = false;
    console.log(boardVariables);
});

// Paint the board cells while LMB down
gridBoard.addEventListener('mousedown', startDrawing);
gridBoard.addEventListener('mouseup', stopDrawing);

// clear the board to its original state
clearBoard.addEventListener("click", setBoardToBaseColor);

// Add/remove the gridlines
toggleGrid.addEventListener("click", toggleGridLines);

// Display the initial value of the slider
outputSliderValue.innerHTML = slider.value;
value = slider.value; // ¿¿¿ why the heck works without referencing outputSliderValue ???
// Update and display the value of the slider dynamically
slider.oninput = function() {
    outputSliderValue.innerHTML = this.value;
    value = this.value;// ¿¿¿ why the heck works without referencing outputSliderValue ???
}
// Change the grid size based on the slider value
outputSliderValue.addEventListener("click", () => {
    setBoardSize(parseInt(this.value));
})