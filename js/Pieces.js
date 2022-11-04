class PiecesController {
    constructor(board) {
        this.board = board;
        this.pieces = [];

        // this.highlightPieceMovement(this.board.findSquareById('52').piece)
    }

    highlightPieceMovement(piece) {

        piece.movements.forEach(mov => {
            mov.nodes.forEach(node => {
                node.highlight()
            })
        })
    }

    hidePieceMovement(piece) {
        piece.movements.forEach(mov => {
            mov.nodes.forEach(node => {
                node.hide()
            })
        })
    }

    move(piece, destiny) {
        let relevantNode = piece.movements.filter(mov => {
            return mov.nodes.includes(destiny)
        })

        piece.movements = [];

        console.log(relevantNode);
    }

    createNewPiece(color, position) {

        let square = this.board.findSquareByPosition(position);
        let piece = new Piece(color, square, this);
        square.piece = piece;
        if (color === 'red') {
            square.image = "/images/red.png"
        } else {
            square.image = "/images/black.png"
        }
        this.pieces.push(piece)
    }
}

class Piece {
    constructor(color, square, pController) {
        this.color = color;
        this.king = false;
        this.square = square;
        this.position = square.position;
        this.piecesController = pController;
        this.movements = [];
        this.calculateMovements();
    }
    calculateMovements() {
        if (this.square.id === 52) {
            let leftPos = [this.square.position[0] - 1, this.square.position[1] - 1];
            let rightPos = [this.square.position[0] - 1, this.square.position[1] + 1];
            let leftSquare = this.piecesController.board.findSquareByPosition(leftPos);
            let rightSquare = this.piecesController.board.findSquareByPosition(rightPos);

            let leftMov = new Movement(this, leftSquare);
            let rightMov = new Movement(this, rightSquare);
            this.movements.push(leftMov);
            this.movements.push(rightMov);

        }
    }


}