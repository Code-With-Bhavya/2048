// Variables
const moveSound = new Audio('cellmove.mp3');
const board = document.getElementById('board');
const score = document.getElementById('currentscore');
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
let cscore = 0;
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
        emptycells[rcell].style.backgroundColor = data[0].color;
        emptycells[rcell].innerHTML = data[0].number;
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

        // Combine cells with the same value
        for (let row = 3; row > 0; row--) {
            let index = row * 4 + col;
            let aboveIndex = (row - 1) * 4 + col;

            if (cells[index].innerHTML === cells[aboveIndex].innerHTML && cells[index].innerHTML !== '') {
                let newValue = parseInt(cells[index].innerHTML) * 2;
                cells[index].innerHTML = newValue.toString();
                cells[aboveIndex].innerHTML = '';
                cells[aboveIndex].style.backgroundColor = '';
                // Update the color based on the new value
                cells[index].style.backgroundColor = data.find(d => d.number == newValue).color;
            }
        }

        // Move cells to the bottom again after combining
        columnCells = [];
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

        newPosition = 3;
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

    // Generate a new cell
    cscore += 10;
    score.innerText = `${cscore}`;
    generateanewcell();
    moveSound.play();
}

function shiftCellsUp() {
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

        // Move cells to the top of the column
        let newPosition = 0;
        for (let i = 0; i < columnCells.length; i++) {
            let index = newPosition * 4 + col;
            cells[index].style.backgroundColor = columnCells[i].color;
            cells[index].innerHTML = columnCells[i].value;
            newPosition++;
        }

        // Combine cells with the same value
        for (let row = 0; row < 3; row++) {
            let index = row * 4 + col;
            let belowIndex = (row + 1) * 4 + col;

            if (cells[index].innerHTML === cells[belowIndex].innerHTML && cells[index].innerHTML !== '') {
                let newValue = parseInt(cells[index].innerHTML) * 2;
                cells[index].innerHTML = newValue.toString();
                cells[belowIndex].innerHTML = '';
                cells[belowIndex].style.backgroundColor = '';
                // Update the color based on the new value
                cells[index].style.backgroundColor = data.find(d => d.number == newValue).color;
            }
        }

        // Move cells to the top again after combining
        columnCells = [];
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

        newPosition = 0;
        for (let i = 0; i < columnCells.length; i++) {
            let index = newPosition * 4 + col;
            cells[index].style.backgroundColor = columnCells[i].color;
            cells[index].innerHTML = columnCells[i].value;
            newPosition++;
        }
    }

    // Generate a new cell
    cscore+=10;
    score.innerText = `${cscore}`;
    generateanewcell();
    moveSound.play();
}
function shiftCellsLeft() {
    for (let row = 0; row < 4; row++) {
        let rowCells = [];
        for (let col = 0; col < 4; col++) {
            let index = row * 4 + col;
            let cell = cells[index];
            let color = cell.style.backgroundColor;
            let value = cell.innerHTML;

            if (color !== '' && value !== '') {
                rowCells.push({ color, value }); // Collect non-empty cells
                cell.style.backgroundColor = ''; // Clear the cell
                cell.innerHTML = ''; // Clear the value
            }
        }

        // Move cells to the left of the row
        let newPosition = 0;
        for (let i = 0; i < rowCells.length; i++) {
            let index = row * 4 + newPosition;
            cells[index].style.backgroundColor = rowCells[i].color;
            cells[index].innerHTML = rowCells[i].value;
            newPosition++;
        }

        // Combine cells with the same value
        for (let col = 0; col < 3; col++) {
            let index = row * 4 + col;
            let nextIndex = row * 4 + col + 1;

            if (cells[index].innerHTML === cells[nextIndex].innerHTML && cells[index].innerHTML !== '') {
                let newValue = parseInt(cells[index].innerHTML) * 2;
                cells[index].innerHTML = newValue.toString();
                cells[nextIndex].innerHTML = '';
                cells[nextIndex].style.backgroundColor = '';
                // Update the color based on the new value
                cells[index].style.backgroundColor = data.find(d => d.number == newValue).color;
            }
        }

        // Move cells to the left again after combining
        rowCells = [];
        for (let col = 0; col < 4; col++) {
            let index = row * 4 + col;
            let cell = cells[index];
            let color = cell.style.backgroundColor;
            let value = cell.innerHTML;

            if (color !== '' && value !== '') {
                rowCells.push({ color, value }); // Collect non-empty cells
                cell.style.backgroundColor = ''; // Clear the cell
                cell.innerHTML = ''; // Clear the value
            }
        }

        newPosition = 0;
        for (let i = 0; i < rowCells.length; i++) {
            let index = row * 4 + newPosition;
            cells[index].style.backgroundColor = rowCells[i].color;
            cells[index].innerHTML = rowCells[i].value;
            newPosition++;
        }
    }

    // Generate a new cell
    cscore+=10;
    score.innerText = `${cscore}`;
    generateanewcell();
    moveSound.play();
}
function shiftCellsRight() {
    for (let row = 0; row < 4; row++) {
        let rowCells = [];
        for (let col = 0; col < 4; col++) {
            let index = row * 4 + col;
            let cell = cells[index];
            let color = cell.style.backgroundColor;
            let value = cell.innerHTML;

            if (color !== '' && value !== '') {
                rowCells.push({ color, value }); // Collect non-empty cells
                cell.style.backgroundColor = ''; // Clear the cell
                cell.innerHTML = ''; // Clear the value
            }
        }

        // Move cells to the right of the row
        let newPosition = 3;
        for (let i = rowCells.length - 1; i >= 0; i--) {
            let index = row * 4 + newPosition;
            cells[index].style.backgroundColor = rowCells[i].color;
            cells[index].innerHTML = rowCells[i].value;
            newPosition--;
        }

        // Combine cells with the same value
        for (let col = 3; col > 0; col--) {
            let index = row * 4 + col;
            let prevIndex = row * 4 + col - 1;

            if (cells[index].innerHTML === cells[prevIndex].innerHTML && cells[index].innerHTML !== '') {
                let newValue = parseInt(cells[index].innerHTML) * 2;
                cells[index].innerHTML = newValue.toString();
                cells[prevIndex].innerHTML = '';
                cells[prevIndex].style.backgroundColor = '';
                // Update the color based on the new value
                cells[index].style.backgroundColor = data.find(d => d.number == newValue).color;
                
            }
        }

        // Move cells to the right again after combining
        rowCells = [];
        for (let col = 0; col < 4; col++) {
            let index = row * 4 + col;
            let cell = cells[index];
            let color = cell.style.backgroundColor;
            let value = cell.innerHTML;

            if (color !== '' && value !== '') {
                rowCells.push({ color, value }); // Collect non-empty cells
                cell.style.backgroundColor = ''; // Clear the cell
                cell.innerHTML = ''; // Clear the value
            }
        }

        newPosition = 3;
        for (let i = rowCells.length - 1; i >= 0; i--) {
            let index = row * 4 + newPosition;
            cells[index].style.backgroundColor = rowCells[i].color;
            cells[index].innerHTML = rowCells[i].value;
            newPosition--;
        }
    }

    // Generate a new cell
    cscore+=10;
    score.innerText = `${cscore}`;
    generateanewcell();
    moveSound.play();
}


