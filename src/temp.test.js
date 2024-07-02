// Import the Ship class
// const Ship = require('./createShip'); // Adjust the path as per your project structure
import { Ship } from './ShipClass.js'; // Adjust the path as per your project structure
import { GameBoard } from './GameBoardClass.js';
import { RealPlayer, ComputerPlayer } from './PlayerClass.js';
import { GameController, ScreenController } from "./controller.js";


describe('Ship class', () => {
    let ship;

    beforeEach(() => {
        // Reset ship instance before each test
        ship = new Ship(5, 0, false);
    });

    test('constructor sets properties correctly', () => {
        expect(ship.length).toBe(5);
        expect(ship.hitNumber).toBe(0);
        expect(ship.sink).toBe(false);
    });

    test('hit method increments hitNumber', () => {
        ship.hit();
        expect(ship.hitNumber).toBe(1);
    });

    // Add more tests as needed for other methods or edge cases
    test('isSunk method test if hitNumber is equal to length', () => {
        ship.isSunk();
        expect(ship.sink).toBe(false);
    });

});

describe('Game Board Class', () => {
    let game;

    beforeEach(() => {
        // Reset ship instance before each test
        game = new GameBoard();
    });

    test('constructor sets properties correctly', () => {
        expect(game.ships).toBe(5);
        expect(game.board).toBeDefined();
    });

    test('receives attack', () => {
        game.receiveAttack(0, 2);
        const val = game.board[0][2];
        expect(val === -1 || val === -2).toBe(true)
    });

    // test('attacks carrier and checks if it is sunk', () => {
    //     const gameboard = new GameBoard();
    //     gameboard.carrier.
    //     gameboard.receiveAttack(0, 2);
    //     expect(gameboard.carrier.hitNumber).toBe(1);
    //     expect(gameboard.carrier.isSunk()).toBe(false);

    //     for (let i = 3; i <= 6; i++) {
    //         gameboard.receiveAttack(0, i);
    //     }
    //     expect(gameboard.carrier.isSunk()).toBe(true);
    // });

    // test('carrier is sunk after 5 hits', () => {
    //     const gameboard = new GameBoard();
    //     for (let i = 2; i <= 6; i++) {
    //         gameboard.receiveAttack(0, i);
    //     }
    //     expect(gameboard.carrier.isSunk()).toBe(true);
    //     expect(gameboard.gameOver()).toBe(false);
    // });

    test('game over when all ships are sunk', () => {
        const gameboard = new GameBoard();
        const attacks = [];
        const board = gameboard.board;

        for (let r = 0; r < 10; r++){
            for (let c = 0; c < 10; c++){
                if (board[r][c] !== 0){
                    attacks.push([r,c])
                }
            }
        }

        for (const [x, y] of attacks) {
            gameboard.receiveAttack(x, y);
        }
        expect(gameboard.gameOver()).toBe(true);
    });
})

describe('Player Class', () => {
    let player;
    let computer;

    beforeEach(() => {
        // Reset ship instance before each test
        player = new RealPlayer('Abdalla', 1);
        computer = new ComputerPlayer('Megatron30000', 2);
    });

    test('Player class properly initializes', () => {
        expect(player.name).toMatch('Abdalla');
        expect(player.token).toBe(1);
        expect(player.gameBoard).toBeDefined();
    });

    test('Computer class properly initializes', () => {
        expect(computer.name).toMatch('Megatron30000');
        expect(computer.token).toBe(2);
        expect(computer.gameBoard).toBeDefined();
    });

});


// GameController Test 
describe('GameController', () => {
    let gameController;
    let player1;
    let player2;

    beforeEach(() => {
        player1 = { name: 'Player1', token: '1' };
        player2 = { name: 'Computer', token: '2' };
        gameController = GameController(player1, player2);
    });

    test('should initialize players correctly', () => {
        expect(gameController.players[0].name).toBe('Player1');
        expect(gameController.players[0].token).toBe('1');
        expect(gameController.players[1].name).toBe('Computer');
        expect(gameController.players[1].token).toBe('2');
    });

    test('should switch player turns', () => {
        const initialActivePlayer = gameController.getActivePlayer();
        gameController.playRound();
        const newActivePlayer = gameController.getActivePlayer();
        expect(initialActivePlayer).not.toBe(newActivePlayer);
    });

    test('should handle game over scenario', () => {
        gameController.players[1].gameBoard.ships = 0; // Mock game over scenario
        const isGameOver = gameController.playRound();
        expect(isGameOver).toBe(true);
    });
});

// screenController test
describe('ScreenController', () => {
    let screen;

    beforeEach(() => {
        document.body.innerHTML = '<div class="screen"></div>';
        screen = document.querySelector('.screen');
    });

    test('should create game container and append elements', () => {
        ScreenController('Player1');
        expect(screen.querySelector('.board-container')).not.toBeNull();
        expect(screen.querySelector('#board1')).not.toBeNull();
        expect(screen.querySelector('#board2')).not.toBeNull();
    });

    test('should handle welcomePage reset', () => {
        ScreenController('Player1');
        const resetButton = screen.querySelector('#reset-button');
        resetButton.click();
        expect(screen.classList.contains('.welcome')).not.toBeNull();
    });
});

