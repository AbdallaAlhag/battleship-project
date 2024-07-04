import { RealPlayer, ComputerPlayer } from "./PlayerClass";
import { welcomePage } from "./welcomePage";
import blasting from './asset/blasting.png';
import dust from './asset/dust.png';
import ship1 from './asset/ship1.png';
import ship2 from './asset/ship2.png';
import ship3 from './asset/ship3.png';
import ship4 from './asset/ship4.png';
import ship5 from './asset/ship5.png';

// import terrorism from './asset/terrorism.gif'



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
                ({ x, y } = players[1].makeMove(players[0].gameBoard));
            } while (players[0].gameBoard.board[x][y] < 0)
            
            const ship = players[0].gameBoard.board[x][y]
            players[0].gameBoard.receiveAttack(x, y);
            // check if we sunk to clear our next hit and not waste turns
            players[1].checkSunk(x,y,players[0].gameBoard,ship);
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
        displayBoard(gameController.players[0], '#board1');
        displayBoard(gameController.players[1], '#board2');
    }

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

                if (grid == -1) {
                    gridButton.style.background = '#da2323';
                    gridButton.style.backgroundImage = `url(${blasting})`;
                    gridButton.style.backgroundSize = "cover";
                    gridButton.style.backgroundPosition = "center";
                    gridButton.style.backgroundRepeat = "no-repeat";

                } else if (grid == -2) {
                    gridButton.style.backgroundImage = `url(${dust})`;
                    gridButton.style.backgroundSize = "cover";
                    gridButton.style.backgroundPosition = "center";
                    gridButton.style.backgroundRepeat = "no-repeat";
                }

                // if (cheatActive && board[rowIndex][colIndex] > 0 && boardChoice === '#board2') {
                if (cheatActive && board[rowIndex][colIndex] > 0) {
                    // gridButton.style.background = '#DA8923';
                    gridButton.style.background = '#008B8B';
                    // gridButton.style.background = '#2E8B57';



                    styleShipBackground(gridButton, board[rowIndex][colIndex])
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
                updateScreen();
                setTimeout(() => {
                    alert('Game Over! Press reset to start over'), 2000
                });
                // removeEventlistener(gameController.players[1], '#board2')
            } else {
                updateScreen();
            }
        }


        function styleShipBackground(button, val) {
            button.style.backgroundSize = "cover";
            button.style.backgroundPosition = "center";
            button.style.backgroundRepeat = "no-repeat";
            switch (val) {
                case 5:
                    button.style.backgroundImage = `url(${ship5})`;
                    return
                case 4:
                    button.style.backgroundImage = `url(${ship4})`;
                    return
                case 3:
                    button.style.backgroundImage = `url(${ship3})`;
                    return
                case 2:
                    button.style.backgroundImage = `url(${ship2})`;
                    return
                case 1:
                    button.style.backgroundImage = `url(${ship1})`;
                    return
                default:
                    return
            }
        }

        // Remove existing click event listeners to avoid duplication
        boardDiv.replaceWith(boardDiv.cloneNode(true));
        const newBoardDiv = document.querySelector(boardChoice);

        if (newBoardDiv.id === 'board2' && gameController.players[1].gameBoard.gameOver() === false && gameController.players[1].gameBoard.gameOver() === false) {
            newBoardDiv.addEventListener("click", clickHandlerBoard);
        }

        // function removeEventlistener(player,boardChoice){
        //     const boardDiv = document.querySelector(boardChoice);
        //     const board = player.gameBoard.board;
        //     // boardDiv.removeEventListener('click',clickHandlerBoard);
    
        //     board.forEach((row, rowIndex) => {
        //         row.forEach((grid, colIndex) => {
        //             const gridButton = boardDiv.querySelector(`[data-col="${colIndex}"][data-row="${rowIndex}"]`)
        //             gridButton.removeEventListener('click',clickHandlerBoard);
        //         })
        //     })
        // }

    }

    
    function createCheats(gameController) {
        const cheatButton = document.querySelector('#cheat-button')
        cheatButton.addEventListener('click', () => {
            cheatActive = !cheatActive; // Toggle cheat mode state
            displayBoard(gameController.players[1], '#board2'); // Update board display after toggling cheat mode
            displayBoard(gameController.players[0], '#board1');
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
    screen.classList.remove('create');
    screen.classList.add('game');
    screen.textContent = '';
    screen.appendChild(container);
    screen.appendChild(buttonContainer);
}


