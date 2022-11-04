class Movement {
    constructor(piece, destiny) {
        this.piece = piece;
        this.destiny = destiny;
        this.nodes = [];
        this.captured = [];
        this.promote = false;

        this.addNodes();
    }

    addNodes() {
        this.nodes.push(this.destiny)
    }

    useMovement() {

    }

}