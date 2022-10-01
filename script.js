// Get DOM elements
//const board = document.getElementById("board");
const gridBoard = document.getElementById("grid-board");

// Get style properties
//let windowWidth = window.innerWidth;
//let windowHeight = window.innerHeight;
const gridHeight = getComputedStyle(gridBoard).height;
console.log(gridHeight.slice(0,3));

// Define starting variables
let gridSide = 16;
let gridArea = gridSide*gridSide;

// Define functions
function createGrid() {
    for (let i = 0; i < gridArea; i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.style.cssText = `height: ${parseInt(gridHeight.slice(0, 3))/gridSide}px;
                             width: ${parseInt(gridHeight.slice(0, 3))/gridSide}px;`;
        // test
        div.innerHTML = i+1;
        gridBoard.appendChild(div);
    }
}


// Apply to the DOM
createGrid();