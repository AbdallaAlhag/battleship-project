import { RealPlayer, ComputerPlayer } from "./PlayerClass";
import { welcomePage } from "./welcomePage";



export function GameController(player1, player2, player1Coord) {
    const players = [
        new RealPlayer(player1.name, player1.token, player1Coord),
        new ComputerPlayer(player2.name, player2.token)
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    };

    const playRound = (row = 0, col = 0) => {
        if (activePlayer == players[0]) {
            players[1].gameBoard.receiveAttack(row, col)
            if (players[1].gameBoard.gameOver()) {
                return true;
            }
        } else {
            let x, y;
            do {
                ({ x, y } = players[1].makeMove());
            } while (players[0].gameBoard.board[x][y] < 0)

            players[0].gameBoard.receiveAttack(x, y)
            if (players[0].gameBoard.gameOver()) {
                return true;
            }
        }
        switchPlayerTurn();
        return false
    }

    const getActivePlayer = () => activePlayer.name;

    return {
        players,
        playRound,
        getActivePlayer,
    }
}


export function ScreenController(userName = 'Player1', coordinate) {
    const p1 = { name: userName, token: '1' };
    const p2 = { name: 'Computer', token: '2' };
    let cheatActive = false;
    createGameContainer()

    const gameController = GameController(p1, p2, coordinate);


    const updateScreen = () => {
        // const turn = document.querySelector('#turn')
        // turn.textContent = `${gameController.getActivePlayer()}'s turn`

        displayBoard(gameController.players[0], '#board1');
        displayBoard(gameController.players[1], '#board2');

    }

    // const board1 = document.querySelector('#board1')
    updateScreen();
    createCheats(gameController);


    function displayBoard(player, boardChoice) {
        const boardDiv = document.querySelector(boardChoice);

        // reset the board
        boardDiv.textContent = ''

        const board = player.gameBoard.board



        board.forEach((row, rowIndex) => {
            row.forEach((grid, colIndex) => {
                const gridButton = document.createElement('button');
                gridButton.classList.add('grid');
                gridButton.id = `grid-${player.token}`
                gridButton.dataset.col = colIndex;
                gridButton.dataset.row = rowIndex;

                gridButton.textContent = grid; //board[row][grid];
                if (grid == -1) {
                    gridButton.style.background = 'red';
                    gridButton.textContent = 'hit'
                } else if (grid == -2) {
                    gridButton.style.background = 'blue';
                    gridButton.textContent = 'miss'
                }

                // if (cheatActive && board[rowIndex][colIndex] > 0 && boardChoice === '#board2') {
                if (cheatActive && board[rowIndex][colIndex] > 0) {
                    gridButton.style.background = 'green';
                }

                boardDiv.appendChild(gridButton);
            })
        })

        function clickHandlerBoard(e) {
            const row = e.target.dataset.row;
            const col = e.target.dataset.col;

            if (!row && !col || player.gameBoard.board[row][col] < 0) return;

            // Call it twice ? since one is a computer's turn
            if (gameController.playRound(row, col) || gameController.playRound()) {
                alert('game over');
            } else {
                updateScreen();
            }
        }

        // Remove existing click event listeners to avoid duplication
        boardDiv.replaceWith(boardDiv.cloneNode(true));
        const newBoardDiv = document.querySelector(boardChoice);

        if (newBoardDiv.id === 'board2') {
            newBoardDiv.addEventListener("click", clickHandlerBoard);
        }

    }

    function createCheats(gameController) {
        const cheatButton = document.querySelector('#cheat-button')
        cheatButton.addEventListener('click', () => {
            cheatActive = !cheatActive; // Toggle cheat mode state
            displayBoard(gameController.players[1], '#board2'); // Update board display after toggling cheat mode

        })

    }

}


function createGameContainer() {
    // Create container div

    const container = document.createElement('div');
    container.classList.add('board-container');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('game-button-container');

    const cheatButton = document.createElement('button');
    cheatButton.id = 'cheat-button';
    cheatButton.textContent = 'CheatCodes'

    const resetButton = document.createElement('button');
    resetButton.id = 'reset-button';
    resetButton.textContent = 'Reset';

    resetButton.addEventListener('click', () => {
        welcomePage();
    })


    buttonContainer.appendChild(cheatButton);
    buttonContainer.appendChild(resetButton);

    const board1Container = document.createElement('div');
    board1Container.classList.add('inner-board-container');
    // Create board1 div
    const board1 = document.createElement('div');
    board1.classList.add('board');
    board1.id = 'board1';

    const text1 = document.createElement('p');
    text1.textContent = "Player's Board";

    board1Container.appendChild(board1)
    board1Container.appendChild(text1)


    const board2Container = document.createElement('div');
    board2Container.classList.add('inner-board-container');
    // Create board2 div
    const board2 = document.createElement('div');
    board2.classList.add('board');
    board2.id = 'board2';


    const text2 = document.createElement('p');
    text2.textContent = "Computer's Board";

    board2Container.appendChild(board2);
    board2Container.appendChild(text2);

    // Append elements to container
    container.appendChild(board1Container);
    container.appendChild(board2Container);

    // Append container to the document body or another desired parent element

    const screen = document.querySelector('.screen');
    screen.classList.remove('welcome');
    screen.classList.add('game');
    screen.textContent = '';
    screen.appendChild(container);
    screen.appendChild(buttonContainer);
}


