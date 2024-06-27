import { Ship } from './ShipClass.js'; // Adjust the path as per your project structure

export class GameBoard {
    constructor() {
        this.ships = 5; // 5 pieces
        this.ROW = 10;
        this.COL = 10;
        this.board = []

        this.createBoard();
        this.carrier = new Ship(5, 0, false);
        this.battleship = new Ship(4, 0, false);
        this.destroyer = new Ship(3, 0, false);
        this.submarine = new Ship(2, 0, false);
        this.patrolBoat = new Ship(1, 0, false);
    }
    // Temp board
    createBoard() {
        this.board = [[0, 0, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 2, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 2, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 3, 3, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    }
    receiveAttack(x, y) {
        if (this.board[x][y] != 0) {
            if (this.checkShip(this.board[x][y])) {
                this.ships -= 1
            }
            this.board[x][y] = -1
        }
    }

    checkShip(val) {
        switch (val) {
            case 5:
                this.carrier.hit();
                return this.carrier.isSunk();
            case 4:
                this.battleship.hit();
                return this.battleship.isSunk();
            case 3:
                this.destroyer.hit();
                return this.destroyer.isSunk();
            case 2:
                this.submarine.hit();
                return this.submarine.isSunk();
            case 1:
                this.patrolBoat.hit();
                return this.patrolBoat.isSunk();
            default:
                return false;
        }
    }

    gameOver() {
        if (this.ships === 0) {
            return true
        }
        return false
    }
}