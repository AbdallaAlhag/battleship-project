// Import the Ship class
// const Ship = require('./createShip'); // Adjust the path as per your project structure
import { Ship } from './ShipClass.js'; // Adjust the path as per your project structure
import { GameBoard } from './GameBoardClass.js';
import { RealPlayer, ComputerPlayer } from './PlayerClass.js';

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
        expect(game.ROW).toBe(10);
        expect(game.COL).toBe(10);
    });

    test('receives attack', () => {
        game.receiveAttack(0, 2);
        expect(game.board[0][2]).toBe(-1)
    });

    test('attacks carrier and checks if it is sunk', () => {
        const gameboard = new GameBoard();
        gameboard.receiveAttack(0, 2);
        expect(gameboard.carrier.hitNumber).toBe(1);
        expect(gameboard.carrier.isSunk()).toBe(false);

        for (let i = 3; i <= 6; i++) {
            gameboard.receiveAttack(0, i);
        }
        expect(gameboard.carrier.isSunk()).toBe(true);
    });

    test('carrier is sunk after 5 hits', () => {
        const gameboard = new GameBoard();
        for (let i = 2; i <= 6; i++) {
            gameboard.receiveAttack(0, i);
        }
        expect(gameboard.carrier.isSunk()).toBe(true);
        expect(gameboard.gameOver()).toBe(false);
    });

    test('game over when all ships are sunk', () => {
        const gameboard = new GameBoard();
        const attacks = [
            [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], // carrier
            [3, 1], [4, 1], [5, 1], [6, 1], // battleship
            [6, 3], [6, 4], [6, 5], // destroyer
            [3, 6], [4, 6], // submarine
            [2, 4], // patrolBoat
        ];

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