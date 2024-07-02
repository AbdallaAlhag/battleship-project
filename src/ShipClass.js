export class Ship{
    constructor(length, hitNumber, sink){
        this.length = length;
        this.hitNumber = hitNumber;
        this.sink = sink;
    }
    hit(){
        this.hitNumber += 1; 
    }
    isSunk(){
        if (this.hitNumber === this.length){
            this.sink = true;
            return this.sink;
        } else {
            return this.sink;
        }
    }
}
