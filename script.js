// Variables
const moveSound = new Audio('cellmove.mp3');
const GameoverSound = new Audio('gameover.mp3');
const winSound = new Audio('gamewin.mp3');
const newgamebtn = document.getElementById('newgame');
const board = document.getElementById('board');
const bestscore = document.getElementById('bestscore');
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

let startX, startY, distX, distY;
let threshold = 10; // Minimum distance traveled to be considered a swipe

let highscore = localStorage.getItem('bestscore');
let highscorevalue = 0;
let storedHighscore = localStorage.getItem('bestscore');
if (storedHighscore !== null) {
    highscorevalue = JSON.parse(storedHighscore);
}
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
newgamebtn.addEventListener('click' , function(){window.location.reload()})
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
//for swipe
board.addEventListener('touchstart', function(e) {
    const touch = e.changedTouches[0];
    startX = touch.pageX;
    startY = touch.pageY;
});

board.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (!startX || !startY) return;

    const touch = e.changedTouches[0];
    distX = touch.pageX - startX;
    distY = touch.pageY - startY;
});

board.addEventListener('touchend', function(e) {
    if (Math.abs(distX) > threshold || Math.abs(distY) > threshold) {
        if (Math.abs(distX) > Math.abs(distY)) {
            if (distX > 0) {
                console.log('Swiped right');
                shiftCellsRight();
                // Perform action for swipe right
            } else {
                console.log('Swiped left');
                shiftCellsLeft();
                // Perform action for swipe left
            }
        } else {
            if (distY > 0) {
                console.log('Swiped down');
                shiftCellsDown();
                // Perform action for swipe down
            } else {
                console.log('Swiped up');
                shiftCellsUp();
                // Perform action for swipe up
            }
        }
    }

    startX = startY = distX = distY = 0;
});
//done for swipe
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
            if (cells[index].innerHTML === '2048') {
                checkWinCondition();
            }
            if (cells[index].innerHTML === cells[aboveIndex].innerHTML && cells[index].innerHTML !== '') {
                let newValue = parseInt(cells[index].innerHTML) * 2;
                cells[index].innerHTML = newValue.toString();
                cells[aboveIndex].innerHTML = '';
                cells[aboveIndex].style.backgroundColor = '';
                // Update the color based on the new value
                cells[index].style.backgroundColor = data.find(d => d.number == newValue).color;
                // Increase the score based on the new value
                cscore += newValue;
                if (cscore > highscorevalue) {
                    highscorevalue = cscore;
                    localStorage.setItem("bestscore", JSON.stringify(highscorevalue));
                    bestscore.innerHTML = highscorevalue;
                }

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
    score.innerText = `${cscore}`;
    checkGameOver();
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
            if (cells[index].innerHTML === '2048') {
                checkWinCondition();
            }
            if (cells[index].innerHTML === cells[belowIndex].innerHTML && cells[index].innerHTML !== '') {
                let newValue = parseInt(cells[index].innerHTML) * 2;
                cells[index].innerHTML = newValue.toString();
                cells[belowIndex].innerHTML = '';
                cells[belowIndex].style.backgroundColor = '';
                // Update the color based on the new value
                cells[index].style.backgroundColor = data.find(d => d.number == newValue).color;
                // Increase the score based on the new value
                cscore += newValue;
                if (cscore > highscorevalue) {
                    highscorevalue = cscore;
                    localStorage.setItem("bestscore", JSON.stringify(highscorevalue));
                    bestscore.innerHTML = highscorevalue;
                }
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

        // Log final state of the column for debugging
        for (let row = 0; row < 4; row++) {
            let index = row * 4 + col;
            let cell = cells[index];
            console.log(`Cell ${index}:`, cell.style.backgroundColor, cell.innerHTML);
        }
    }

    // Generate a new cell
    score.innerText = `${cscore}`;
    checkGameOver();
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
            let rightIndex = row * 4 + col + 1;

            if (cells[index].innerHTML === cells[rightIndex].innerHTML && cells[index].innerHTML !== '') {
                let newValue = parseInt(cells[index].innerHTML) * 2;
                cells[index].innerHTML = newValue.toString();
                cells[rightIndex].innerHTML = '';
                cells[rightIndex].style.backgroundColor = '';
                // Update the color based on the new value
                cells[index].style.backgroundColor = data.find(d => d.number == newValue).color;
                // Increase the score based on the new value
                cscore += newValue;
                if (cscore > highscorevalue) {
                    highscorevalue = cscore;
                    localStorage.setItem("bestscore", JSON.stringify(highscorevalue));
                    bestscore.innerHTML =highscorevalue;
                }
                if (cells[index].innerHTML === '2048') {
                    checkWinCondition();
                }
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

        // Log final state of the row for debugging
        for (let col = 0; col < 4; col++) {
            let index = row * 4 + col;
            let cell = cells[index];
            console.log(`Cell ${index}:`, cell.style.backgroundColor, cell.innerHTML);
        }
    }

    // Generate a new cell
    score.innerText = `${cscore}`;
    checkGameOver();
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
            let leftIndex = row * 4 + col - 1;

            if (cells[index].innerHTML === cells[leftIndex].innerHTML && cells[index].innerHTML !== '') {
                let newValue = parseInt(cells[index].innerHTML) * 2;
                cells[index].innerHTML = newValue.toString();
                cells[leftIndex].innerHTML = '';
                cells[leftIndex].style.backgroundColor = '';
                // Update the color based on the new value
                cells[index].style.backgroundColor = data.find(d => d.number == newValue).color;
                // Increase the score based on the new value
                cscore += newValue;
                if (cscore > highscorevalue) {
                    highscorevalue = cscore;
                    localStorage.setItem("bestscore", JSON.stringify(highscorevalue));
                    bestscore.innerHTML =highscorevalue;
                }
                if (cells[index].innerHTML === '2048') {
                    checkWinCondition();
                }
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

        // Log final state of the row for debugging
        for (let col = 0; col < 4; col++) {
            let index = row * 4 + col;
            let cell = cells[index];
            console.log(`Cell ${index}:`, cell.style.backgroundColor, cell.innerHTML);
        }
    }

    // Generate a new cell
    score.innerText = `${cscore}`;
    checkGameOver();
    generateanewcell();
    moveSound.play();
}

// Initialize high score
try {
    highscorevalue = JSON.parse(bestscore);
} catch (e) {
    console.error("Invalid highscore value in localStorage, resetting to 0");
    localStorage.setItem('bestscore', JSON.stringify(highscorevalue));
}

bestscore.innerHTML = highscorevalue;
function checkWinCondition() {
    cells.forEach(cell => {
        if (cell.innerHTML === '2048') {
            winSound.play();
            alert('Congratulations, You won the game!');
        }
    });
}
function checkGameOver() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === '') {
            return; // Empty cell found, game is not over
        }
        // Check for possible merges in the same row
        if (i % 4 < 3 && cells[i].innerHTML === cells[i + 1].innerHTML) {
            return; // Merge possible, game is not over
        }
        // Check for possible merges in the same column
        if (i < 12 && cells[i].innerHTML === cells[i + 4].innerHTML) {
            return; // Merge possible, game is not over
        }
    }
    // If no empty cells and no possible merges
    GameoverSound.play();
    alert('Game Over!!!');
}

