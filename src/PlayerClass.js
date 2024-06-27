import { GameBoard } from "./GameBoardClass";

export class Player {
    constructor(name, token) {
        this.name = name;
        this.token = token;
        this.gameBoard = this.createBoard();
    }

    createBoard() {
        return new GameBoard();
    }
}

export class realPlayer extends Player {
    constructor(name, token) {
        super(name, token);
    }

    // Additional methods here...
}

export class ComputerPlayer extends Player {
    constructor(name, token){
        super(name, token);
    }

    makeMove(){
        // Logic for computer's move
    }

    // Additional methods here...
}