export function dragAndDropBoard() {
    // Create container div
    createScreen();
    fillOutBoard();
    createShips();
}


function createScreen(){
    const container = document.createElement('div');
    container.classList.add('outer-board-container');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('game-button-container');

    const shipContainer = document.createElement('div');
    shipContainer.classList.add('ship-container');

    const randomizeButton = document.createElement('button');
    randomizeButton.id = 'randomize';
    randomizeButton.textContent = 'Randomize'

    const rotateButton = document.createElement('button');
    rotateButton.id = 'rotate';
    rotateButton.textContent = 'Rotate';

    const finishButton = document.createElement('button');
    finishButton.id = 'finish';
    finishButton.textContent = 'Finish';

    buttonContainer.appendChild(randomizeButton);
    buttonContainer.appendChild(rotateButton);
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
}

function fillOutBoard() {
    const boardDiv = document.querySelector('#board'); 
    console.log(boardDiv)

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

            gridButton.textContent = grid; //board[row][grid];


            boardDiv.appendChild(gridButton);
        })
    })
    
    
}

function createShips(){
    const shipContainer = document.querySelector('.ship-container');
    const grids = document.querySelectorAll('.grid')

    for (let i = 1; i < 6; i ++){
        const ship = document.createElement('div');
        ship.classList.add('ship');
        ship.id = `ship-${i}`
        ship.draggable = true;

        ship.addEventListener('drag', dragging)
        ship.addEventListener('dragstart', dragStart)

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

    function dragStart(e){
        beingDragged = e.target
        console.log('dragging has started on ' + beingDragged.id)
    }
    
    function dragging(e){
        console.log(beingDragged.id + ' is being dragged');
    }
    
    function dragOver(e){
        e.preventDefault()
        console.log("you are dragging something over " + e.target.classList);
    }
    
    function dragEnter(e){
        e.target.classList.add('highlight');
        console.log("you are entering the space of " + e.target.classList);
    }
    
    function dragLeave(e){
        console.log("you are leaving the space of " + e.target.classList);
        e.target.classList.remove('highlight');
    }
    
    function dragDrop(e){
        e.target.append(beingDragged);
        e.target.classList.remove('highlight');
    }
    
    function dragEnd(e){
        e.target.classList.add('target');
        setTimeout(() => e.target.classList.remove("target"),500)
        console.log("the drag has ended in   " + e.target.classList);
    }
}

