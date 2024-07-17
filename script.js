// Variables
const moveSound = new Audio('cellmove.mp3');
const cell1 = document.getElementById('cell1');
const cell2 = document.getElementById('cell2');
const cell3 = document.getElementById('cell3');
const cell4 = document.getElementById('cell4');
const cell5 = document.getElementById('cell5');
const cell6 = document.getElementById('cell6');
const cell7 = document.getElementById('cell7');
const cell8 = document.getElementById('cell8');
const cell9 = document.getElementById('cell9');
const cell10 = document.getElementById('cell10');
const cell11 = document.getElementById('cell11');
const cell12 = document.getElementById('cell12');
const cell13 = document.getElementById('cell13');
const cell14 = document.getElementById('cell14');
const cell15 = document.getElementById('cell15');
const cell16 = document.getElementById('cell16');
const cells = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13, cell14, cell15, cell16];
const data = [
    { color: '#eee4da', number: '2' },
    { color: '#eee1c9', number: '4' },
    { color: '#f3b27a', number: '8' },
    { color: '#f69664', number: '16' },
    { color: '#f77c5f', number: '32' },
    { color: '#f75f3b', number: '64' },
    { color: '#edd073', number: '128' },
    { color: '#edd073', number: '256' },
    { color: '#edd073', number: '512' },
    { color: '#edd073', number: '1024' },
    { color: '#edd073', number: '2048' }
];

// Game Loop
gameEngine();

// Game Logic
function randomnumber(a, b) { // get any random number between a, b
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function gameEngine() {


    let firstrandom = randomnumber(0, 15);
    let secondrandom;
    do {
        secondrandom = randomnumber(0, 15);
    } while (firstrandom === secondrandom);

    cells[firstrandom].style.backgroundColor = data[0].color;
    cells[firstrandom].innerHTML = data[0].number;
    cells[secondrandom].style.backgroundColor = data[0].color;
    cells[secondrandom].innerHTML = data[0].number;
}

// Event Listener
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            shiftCellsUp();
            break;
        case 'ArrowDown':
            shiftCellsDown();
            break;
        case 'ArrowLeft':
            shiftCellsLeft();
            break;
        case 'ArrowRight':
            shiftCellsRight();
            break;
        default:
            break;
    }
});

// Function to shift cells down
function generateanewcell() {
    let emptycells = cells.filter(cell => cell.style.backgroundColor === '');
    if (emptycells.length !== 0) {
        let rcell = randomnumber(0, emptycells.length - 1);
        let rdata = randomnumber(0, 1);
        emptycells[rcell].style.backgroundColor = data[rdata].color;
        emptycells[rcell].innerHTML = data[rdata].number;
    }

}
function shiftCellsDown() {
    for (let col = 0; col < 4; col++) {
        let columnCells = [];
        for (let row = 0; row < 4; row++) {
            let index = row * 4 + col;
            let cell = cells[index];
            let color = cell.style.backgroundColor;
            let value = cell.innerHTML;

            if (color !== '' && value !== '') {
                columnCells.push({ color, value }); // Collect non-empty cells
                cell.style.backgroundColor = ''; // Clear the cell
                cell.innerHTML = ''; // Clear the value
            }
        }


        // Move cells to the bottom of the column
        let newPosition = 3;
        for (let i = columnCells.length - 1; i >= 0; i--) {
            let index = newPosition * 4 + col;
            cells[index].style.backgroundColor = columnCells[i].color;
            cells[index].innerHTML = columnCells[i].value;
            newPosition--;
        }

        // Log final state of the column for debugging
        for (let row = 0; row < 4; row++) {
            let index = row * 4 + col;
            let cell = cells[index];
            console.log(`Cell ${index}:`, cell.style.backgroundColor, cell.innerHTML);
        }
    }
    generateanewcell();
    moveSound.play();
};

// Placeholder functions for other directions
function shiftCellsUp() {
    console.log("Shifting cells up..."); // Debugging message

    for (let col = 0; col < 4; col++) { // Loop through each column
        let columnCells = []; // Array to store non-empty cells in this column

        for (let row = 0; row < 4; row++) { // Loop through each cell in the column
            let index = row * 4 + col; // Calculate the index of the cell
            let cell = cells[index];
            let color = cell.style.backgroundColor;
            let value = cell.innerHTML;

            if (color !== '' && value !== '') { // If the cell is not empty
                columnCells.push({ color, value }); // Add the cell to columnCells
                cell.style.backgroundColor = ''; // Clear the cell's background
                cell.innerHTML = ''; // Clear the cell's value
            }
        }

        // Log the collected cells for debugging
        console.log(`Column ${col}:`, columnCells);

        let newPosition = 0; // Start from the top of the column
        for (let i = 0; i < columnCells.length; i++) { // Place collected cells from top to bottom
            let index = newPosition * 4 + col; // Calculate the index to place the cell
            cells[index].style.backgroundColor = columnCells[i].color; // Set the cell's background color
            cells[index].innerHTML = columnCells[i].value; // Set the cell's value
            newPosition++; // Move down to the next available position
        }

        // Log the final state of the column for debugging
        console.log(`Final state of Column ${col}:`);
        for (let row = 0; row < 4; row++) {
            let index = row * 4 + col;
            let cell = cells[index];
            console.log(`Cell ${index}:`, cell.style.backgroundColor, cell.innerHTML);
        }
    }
    generateanewcell();
    moveSound.play(); // Play the move sound
}
function shiftCellsLeft() {
    console.log("Shifting cells left..."); // Debugging message

    for (let row = 0; row < 4; row++) { // Loop through each row
        let rowCells = []; // Array to store non-empty cells in this row

        for (let col = 0; col < 4; col++) { // Loop through each cell in the row
            let index = row * 4 + col; // Calculate the index of the cell
            let cell = cells[index];
            let color = cell.style.backgroundColor;
            let value = cell.innerHTML;

            if (color !== '' && value !== '') { // If the cell is not empty
                rowCells.push({ color, value }); // Add the cell to rowCells
                cell.style.backgroundColor = ''; // Clear the cell's background
                cell.innerHTML = ''; // Clear the cell's value
            }
        }

        // Log the collected cells for debugging
        console.log(`Row ${row}:`, rowCells);

        let newPosition = 0; // Start from the left of the row
        for (let i = 0; i < rowCells.length; i++) { // Place collected cells from left to right
            let index = row * 4 + newPosition; // Calculate the index to place the cell
            cells[index].style.backgroundColor = rowCells[i].color; // Set the cell's background color
            cells[index].innerHTML = rowCells[i].value; // Set the cell's value
            newPosition++; // Move right to the next available position
        }

        // Log the final state of the row for debugging
        console.log(`Final state of Row ${row}:`);
        for (let col = 0; col < 4; col++) {
            let index = row * 4 + col;
            let cell = cells[index];
            console.log(`Cell ${index}:`, cell.style.backgroundColor, cell.innerHTML);
        }
    }
    generateanewcell();
    moveSound.play(); // Play the move sound
}
function shiftCellsRight() {
    console.log("Shifting cells right..."); // Debugging message

    for (let row = 0; row < 4; row++) { // Loop through each row
        let rowCells = []; // Array to store non-empty cells in this row

        for (let col = 0; col < 4; col++) { // Loop through each cell in the row
            let index = row * 4 + col; // Calculate the index of the cell
            let cell = cells[index];
            let color = cell.style.backgroundColor;
            let value = cell.innerHTML;

            if (color !== '' && value !== '') { // If the cell is not empty
                rowCells.push({ color, value }); // Add the cell to rowCells
                cell.style.backgroundColor = ''; // Clear the cell's background
                cell.innerHTML = ''; // Clear the cell's value
            }
        }

        // Log the collected cells for debugging
        console.log(`Row ${row}:`, rowCells);

        let newPosition = 3; // Start from the right of the row
        for (let i = rowCells.length - 1; i >= 0; i--) { // Place collected cells from right to left
            let index = row * 4 + newPosition; // Calculate the index to place the cell
            cells[index].style.backgroundColor = rowCells[i].color; // Set the cell's background color
            cells[index].innerHTML = rowCells[i].value; // Set the cell's value
            newPosition--; // Move left to the next available position
        }

        // Log the final state of the row for debugging
        console.log(`Final state of Row ${row}:`);
        for (let col = 0; col < 4; col++) {
            let index = row * 4 + col;
            let cell = cells[index];
            console.log(`Cell ${index}:`, cell.style.backgroundColor, cell.innerHTML);
        }
    }
    generateanewcell();
    moveSound.play(); // Play the move sound
}

