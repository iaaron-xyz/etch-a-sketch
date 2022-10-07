/***************************************************
 * GET DOM ELEMENTS and SETTING VARIABLES
 */

//const board = document.getElementById("board");
const gridBoard = document.getElementById("grid-board");

// Grid size initial value
let gridSide = 16;


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
        // create the cell
        const div = document.createElement("div");
        div.classList.add("cell");
        // Append the child node with the inline CSS
        div.style.cssText = `height: ${parseInt(gridHeight.slice(0, 3))/gridSide}px;
                            width: ${parseInt(gridHeight.slice(0, 3))/gridSide}px;`;
        // test
        div.innerHTML = i+1;
        gridBoard.appendChild(div);
    }
}

function changeSize(buttonId) {
    // NNx -> NN
    const newDimension = parseInt(buttonId.slice(0,2));
    // Remove all the current cells
    gridBoard.textContent = '';
    // Insert a new number of cells
    createGrid(newDimension);
}


/*************************************************
 * APPLY CHANGES TO THE DOM
 */

createGrid(gridSide);