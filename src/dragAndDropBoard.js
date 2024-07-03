import { ScreenController } from "./controller";

export function dragAndDropBoard(name) {
    // Create container div
    createScreen(name);
    fillOutBoard();
    createShips();
}


function createScreen(name) {
    const container = document.createElement('div');
    container.classList.add('outer-board-container');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('game-button-container');

    const shipContainer = document.createElement('div');
    shipContainer.classList.add('ship-container');

    const randomizeButton = document.createElement('button');
    randomizeButton.id = 'randomize';
    randomizeButton.textContent = 'Randomize'

    randomizeButton.addEventListener('click', () => {
        dragAndDropBoard();
        randomizeBoard()
    });

    const resetButton = document.createElement('button');
    resetButton.id = 'reset';
    resetButton.textContent = 'Reset';

    resetButton.addEventListener('click', () => {
        dragAndDropBoard();
    });

    const finishButton = document.createElement('button');
    finishButton.id = 'finish';
    finishButton.textContent = 'Finish';



    buttonContainer.appendChild(randomizeButton);
    buttonContainer.appendChild(resetButton);
    buttonContainer.appendChild(finishButton);


    const boardContainer = document.createElement('div');
    boardContainer.classList.add('inner-board-container');
    // Create board div
    const board = document.createElement('div');
    board.classList.add('board');
    board.id = 'board';

    const text1 = document.createElement('p');
    text1.textContent = "Player's Board";

    boardContainer.appendChild(board)
    boardContainer.appendChild(text1)


    // Append elements to container
    container.appendChild(boardContainer);
    container.appendChild(shipContainer)

    // Append container to the document body or another desired parent element

    const screen = document.querySelector('.screen');
    screen.classList.remove('welcome');
    screen.classList.remove('game');
    screen.classList.add('create');
    screen.textContent = '';

    screen.appendChild(container);
    screen.appendChild(buttonContainer);
    
    
    finishButton.addEventListener('click', () => {
        // Gather player's board coordinate
        // if ship-container is empty, don't allow user to continue forward

        const coordinate = []
        for (let i = 0; i < board.children.length; i++) {
            const childElement = board.children[i];
            const ship = childElement.querySelector('.cell')
            if (ship){
                coordinate.push([childElement.dataset.row, childElement.dataset.col, ship.dataset.shipNumber])
            }
        }
        if (!shipContainer.hasChildNodes()){
            ScreenController(name, coordinate);
        }
    });
}

function fillOutBoard() {
    const boardDiv = document.querySelector('#board');

    const createGrid = (rows, cols, value) => {
        return Array.from({ length: rows }, () => Array(cols).fill(value));
    }


    const board = createGrid(10, 10, 0);

    board.forEach((row, rowIndex) => {
        row.forEach((grid, colIndex) => {
            const gridButton = document.createElement('button');
            gridButton.classList.add('grid');
            gridButton.dataset.col = colIndex;
            gridButton.dataset.row = rowIndex;

            boardDiv.appendChild(gridButton);
        })
    })


}

function createShips() {
    const shipContainer = document.querySelector('.ship-container');
    const grids = document.querySelectorAll('.grid')

    for (let i = 1; i < 6; i++) {
        const ship = document.createElement('div');
        ship.classList.add('ship');
        ship.id = `ship-${i}`;
        ship.draggable = true;
        ship.dataset.size = i;

        for (let j = 1; j <= i; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.shipNumber = i;
            ship.appendChild(cell);
        }

        ship.addEventListener('drag', dragging);
        ship.addEventListener('dragstart', dragStart);
        shipContainer.appendChild(ship);
    }

    grids.forEach(grid => {
        grid.addEventListener('dragover', dragOver);
        grid.addEventListener('dragenter', dragEnter);
        grid.addEventListener('dragleave', dragLeave);
        grid.addEventListener('drop', dragDrop);
        grid.addEventListener('dragend', dragEnd);
    });

    let beingDragged;

    function dragStart(e) {
        beingDragged = e.target
        // console.log('dragging has started on ' + beingDragged.id)
    }

    function dragging(e) {
        // console.log(beingDragged.id + ' is being dragged');
    }

    function dragOver(e) {
        e.preventDefault()
        // console.log("you are dragging something over " + e.target.classList);
    }

    function dragEnter(e) {
        e.preventDefault(); // Prevent default to allow drop

        if (e.target.classList.contains('grid')) {
            e.target.classList.add('highlight');
            // console.log("you are entering the space of " + e.target.classList);
        }
    }

    function dragLeave(e) {

        if (e.target.classList.contains('grid')) {
            e.target.classList.remove('highlight');
            // console.log("you are leaving the space of " + e.target.classList);
        }
    }



    function dragDrop(e) {
        e.preventDefault();
        if (e.target.classList.contains('grid')) {
            e.target.classList.remove('highlight');
            const startCol = parseInt(e.target.dataset.col, 10);
            const startRow = parseInt(e.target.dataset.row, 10);
            const targetCell = e.target;

            // Ensure the ship fits within the grid
            const shipCells = beingDragged.querySelectorAll('.cell');
            if (isShipWithinBounds(targetCell, shipCells.length)) {
                for (let i = 0; i < shipCells.length; i++) {
                    const targetCell = document.querySelector(`[data-col="${startCol + i}"][data-row="${startRow}"]`);
                    // if (i === 0) {
                    //     targetCell.append(beingDragged);
                    // }
                    targetCell.appendChild(shipCells[i].cloneNode(true));
                }
                beingDragged.remove(); // Remove the original ship after placing it on the grid
            } else {
                // console.log('Ship does not fit within the grid bounds');
            }

        }
    }

    function dragEnd(e) {
        // console.log("the drag has ended in   " + e.target.classList);
    }


}

function isShipWithinBounds(startCell, shipLength) {
    const startCol = parseInt(startCell.dataset.col, 10);
    const startRow = parseInt(startCell.dataset.row, 10);
    // Check if the ship fits within the grid bounds horizontally
    if (startCol + shipLength >= 10 || startRow >= 10) {
        return false;
    }

    // Check each cell the ship will occupy for collisions with other ships
    for (let i = 0; i < shipLength; i++) {
        const targetCell = document.querySelector(`[data-col="${startCol + i}"][data-row="${startRow}"]`);
        if (targetCell.querySelector('.cell')) {
            return false; // Collision detected
        }
    }
    return true; // No collisions, ship can be placed
}

function randomizeBoard() {
    const shipArray = document.querySelectorAll('.ship')

    shipArray.forEach(ship => {
        let row, col, targetCell;

        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            targetCell = document.querySelector(`[data-col="${col}"][data-row="${row}"]`);
        } while (!isShipWithinBounds(targetCell, parseInt(ship.dataset.size, 10)));

        if (targetCell.classList.contains('grid')) {
            const startCol = col;
            const startRow = row;
            const shipCells = ship.querySelectorAll('.cell');
            for (let i = 0; i < shipCells.length; i++) {
                const cell = document.querySelector(`[data-col="${startCol + i}"][data-row="${startRow}"]`);
                if (cell) {
                    cell.appendChild(shipCells[i].cloneNode(true));
                }
            }
            ship.remove(); // Remove the original ship after placing it on the grid
        }
    })

}