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
        this.gameBoard = this.createBoard(coordinates);
    }

    // Additional methods here...
    createBoard(coordinates) {
        return new GameBoard(coordinates); // Assuming GameBoard can accept coordinates
    }

}

export class ComputerPlayer extends Player {
    constructor(name, token){
        super(name, token);
        this.gameBoard = this.createBoard();
    }

    makeMove(){
        // Logic for computer's move
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        return { x, y };
    }
    createBoard() {
        return new GameBoard();
    }

    // Additional methods here...
}