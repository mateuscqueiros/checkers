class EventEmitter {
    constructor(board) {
        this.board = board;
    }

    squareClick(squareId) {
        this.board.manageSquareClick(squareId);
    }

    pieceMove(piece, destiny) {
        this.board.findSquareById(piece.square.id);
        piece.piecesController.move(piece, destiny)
    }
}