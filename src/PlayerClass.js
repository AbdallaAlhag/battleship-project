import { GameBoard } from "./GameBoardClass";

export class Player {
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }

}

export class RealPlayer extends Player {
    constructor(name, token, coordinates) {
        super(name, token);
        this.gameBoard = this.createBoard(coordinates); // this returns new GameBoard
    }

    // Additional methods here...
    createBoard(coordinates) {
        return new GameBoard(coordinates); // Assuming GameBoard can accept coordinates
    }

}

export class ComputerPlayer extends Player {
    constructor(name, token) {
        super(name, token);
        this.gameBoard = this.createBoard();
        this.nextHit = [];
    }

    createBoard() {
        return new GameBoard();
    }
    // Enemy GameBoard = Player's gameboard on screen, so the human player
    makeMove(enemyGameBoard) {
        // Logic for computer's move
        let x, y
        if (this.nextHit.length === 0) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } else {
            [x, y] = this.nextHit.pop();
        }

        this.checkHit(x, y, enemyGameBoard.board);
        return { x, y, };
    }


    checkHit(x, y, board) {
        if (board[x][y] > 0) {
            if (x + 1 < 10) {
                this.nextHit.push([x + 1, y])
            }
            if (x - 1 >= 0) {
                this.nextHit.push([x - 1, y])
            }
            if (y + 1 < 10) {
                this.nextHit.push([x, y + 1])
            }
            if (y - 1 >= 0) {
                this.nextHit.push([x, y - 1])
            }
        }
    }

    checkSunk(x, y, enemyGameBoard, ship){
        const enemy = enemyGameBoard;

        // function shipSunk(){
        //     while (this.nextHit.length !== 0){
        //         [x, y] = this.nextHit.pop();
        //         enemy.receiveAttack(x,y)
        //     }
        // }
        if (enemy.board[x][y] === -1){
            switch (ship) {
                case 5:
                    if (enemy.carrier.isSunk()){
                        this.nextHit.length = 0;
                    }
                    return 
                case 4:
                    if (enemy.battleship.isSunk()){
                        this.nextHit.length = 0;
                    }
                    return 
                case 3:
                    if (enemy.destroyer.isSunk()){
                        this.nextHit.length = 0;
                    }
                    return 
                case 2:
                    if (enemy.submarine.isSunk()){
                        this.nextHit.length = 0;
                    }
                    return 
                case 1:
                    if (enemy.patrolBoat.isSunk()){
                        this.nextHit.length = 0;
                    }
                    return 
                default:
                    return false;
            }
        }
    }
    // Additional methods here...
}