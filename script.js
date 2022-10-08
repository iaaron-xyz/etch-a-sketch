/***************************************************
 * GET DOM ELEMENTS and SETTING VARIABLES
 */

//const board = document.getElementById("board");
const gridBoard = document.getElementById("grid-board");
const cellsToBlackColor = document.getElementById("cells-to-black-color");
const cellsToRandomColor = document.getElementById("cells-to-random-color");
const cellsToBaseColor = document.getElementById("cells-to-base-color");
const clearBoard = document.getElementById("clear-board");

// Grid size initial value
let gridSide = 16;
// Current color active
let boardVariables = {"sideSize":gridSide, "black": true, "random": false};

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
        div.classList.add("cell");
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

function changeCellColor() {
    // cells variable has to be assigned after creating the cells
    // otherwise will return an empy node list
    let cells = document.querySelectorAll(".cell");

    // Set color to black
    if (boardVariables.black == true) {
        for (let i=0; i<cells.length; i++) {
            cells[i].onclick = function(e) {
                console.log(e.path[0].id);
                e.target.style.backgroundColor="black";
            }
        }
    }
    // Set colors to random
    else if (boardVariables.random == true) {
        for (let i=0; i<cells.length; i++) {
            cells[i].onclick = function(e) {
                console.log(e.path[0].id);
                e.target.style.backgroundColor=generateRandomBackgroundColor();
            }
        }
    }
    // Otherwise "erase", set cells color to the grid color
    else {
        for (let i=0; i<cells.length; i++) {
            cells[i].onclick = function(e) {
                console.log(e.path[0].id);
                e.target.style.backgroundColor="white";
            }
        }
    }
}

function setBoardToBaseColor() {
    console.log(boardVariables);
    setBoardSize(boardVariables.sideSize);

}

function generateRandomBackgroundColor() {
    const randomRGB = `rgb(${setRandomRange(0,255)}, ${setRandomRange(0,255)}, ${setRandomRange(0,255)})`
    return randomRGB;
}
function setRandomRange(lowerLimit,  upperLimit) {
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
})
cellsToBaseColor.addEventListener("click", () => {
    boardVariables.black = false;
    boardVariables.random = false;
    console.log(boardVariables);
})

// Paint the board cells when clicked
gridBoard.addEventListener("click", changeCellColor, onmousedown="return false");

// clear the board to its original state
clearBoard.addEventListener("click", setBoardToBaseColor);