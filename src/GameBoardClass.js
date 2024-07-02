import { Ship } from './ShipClass.js'; // Adjust the path as per your project structure

export class GameBoard {

    constructor(coord=[]) {
        this.ships = 5; // 5 pieces
        this.board = []
        this.createBoard(coord);
        this.carrier = new Ship(5, 0, false);
        this.battleship = new Ship(4, 0, false);
        this.destroyer = new Ship(3, 0, false);
        this.submarine = new Ship(2, 0, false);
        this.patrolBoat = new Ship(1, 0, false);
    }

    // Temp board, 10 x 10
    createBoard(coord) {

        this.board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

        if (coord.length === 0) {
            for (let i = 1; i <= 5; i++) {
                this.getShipsRandomLocation(i);
            }
        } else {
            for (let j = 0; j < coord.length; j++) {
                    const x = coord[j][0];
                    const y = coord[j][1]
                    this.board[x][y] = Number(coord[j][2]);
                }
        }

    }




    getShipsRandomLocation(length) {
        // const x = Math.floor(Math.random() * 10);
        // const y = Math.floor(Math.random() * 10);
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);

        while (col + length > 10 || !this.isAvailable(row, col, col + length)) {
            col = Math.floor(Math.random() * 10);
            row = Math.floor(Math.random() * 10);
        }

        for (let i = col; i < col + length; i++) {
            this.board[row][i] = length;
        }

    }
    isAvailable(row, start, end) {
        for (let i = start; i <= end; i++) {
            if (this.board[row][i] !== 0) {
                return false;
            }
        }
        return true
    }

    // -1 hit, -2 is miss
    receiveAttack(x, y) {
        if (this.board[x][y] > 0) {
            if (this.checkShip(this.board[x][y])) {
                this.ships -= 1
            }
            this.board[x][y] = -1
        } else if (this.board[x][y] === 0) {
            this.board[x][y] = -2
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