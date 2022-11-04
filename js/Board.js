class Controller {
    constructor(element) {
        this.board = [];
        this.element = element;
        this.eventEmitter = new EventEmitter(this);
        this.createNewBoard();
        this.piecesController = new PiecesController(this);
        this.populateNewBoard();

        this.selected = null;

    }

    findSquareById(id) {
        let square = this.board.filter(square => {
            return square.id === id
        })[0];

        return square
    }

    findSquareByPosition(position) {
        let square = this.board.filter(square => {
            return square.row === position[0] && square.column === position[1]
            // return position === square.position
        })[0]

        return square
    }

    manageSquareClick(squareId) {
        let square = this.findSquareById(squareId);

        if (square.piece) {
            if (this.selected) {
                if (square.piece === this.selected) {
                    // "Hide" Piece selected is piece clicked
                    this.selected = null;
                    this.piecesController.hidePieceMovement(square.piece);
                    console.log("Deselecionar")
                } else {
                    // "Change" Square clicked with a piece is not the same as the selected piece
                    this.piecesController.hidePieceMovement(this.selected);
                    this.selected = square.piece;
                    this.piecesController.highlightPieceMovement(square.piece);
                    console.log("Troca")
                }

            } else {
                // "First click" No piece selected
                this.selected = square.piece;
                this.piecesController.highlightPieceMovement(square.piece);
                console.log("Selecionar")
            }
        } else {
            if (square.isHighlighted) {
                // "Move" Click on highlighted square (movement)
                console.log("Mover")
                this.eventEmitter.pieceMove(this.selected, square)
                this.selected = null;
            } else {
                if (this.selected) {
                    // "Deselect click on blank" Click on blank square and a piece is selected
                    this.piecesController.hidePieceMovement(this.selected)
                    this.selected = null;
                    console.log("Deselecionar 2")
                } else {
                    // Nothing is selected and click is blank
                    console.log("Nada")
                }
            }
        }

    }

    log(message) {
        document.querySelector("#message").innerHTML = message;
    }

    createNewBoard() {
        const table = document.querySelector("table#checkers-board");
        let tableHeadNumber = 8;
        let tableHeadLetter = 0;
        const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
        let count = 0;
        for (let i = 0; i < 8; i++) {
            table.appendChild(document.createElement("tr"));
        }
        const trs = document.querySelectorAll("table#checkers-board > tr");
        for (let i = 0; i < 8; i++) {
            let t = trs[i];
            for (let j = 0; j < 8; j++) {
                let td = document.createElement("td");
                let img = document.createElement("div");
                img.setAttribute("draggable", "draggable");
                img.classList.add("img");
                td.appendChild(img);
                td.id = Number(i.toString() + j.toString());
                t.appendChild(td);
                if (j === 0) {
                    let span = document.createElement("span");
                    span.innerHTML = tableHeadNumber;
                    span.classList.add("head-number-span");
                    td.classList.add("head-number");

                    td.appendChild(span);
                    tableHeadNumber -= 1;
                }
                if (i === 7) {
                    let span = document.createElement("span");
                    span.innerHTML = letters[tableHeadLetter];
                    span.classList.add("head-letter-span");
                    td.classList.add("head-letter");
                    td.appendChild(span);
                    tableHeadLetter += 1;
                }
                let square = new Square(i, j, count, this.piecesController, this);
                this.board.push(square);
            }
        }
    }

    populateNewBoard() {
        this.piecesController.createNewPiece("red", [0, 1]);
        this.piecesController.createNewPiece("red", [0, 3]);
        this.piecesController.createNewPiece("red", [0, 5]);
        this.piecesController.createNewPiece("red", [0, 7]);
        this.piecesController.createNewPiece("red", [1, 0]);
        this.piecesController.createNewPiece("red", [1, 2]);
        this.piecesController.createNewPiece("red", [1, 4]);
        this.piecesController.createNewPiece("red", [1, 6]);
        this.piecesController.createNewPiece("red", [2, 1]);
        this.piecesController.createNewPiece("red", [2, 3]);
        this.piecesController.createNewPiece("red", [2, 5]);
        this.piecesController.createNewPiece("red", [2, 7]);

        this.piecesController.createNewPiece("black", [7, 0]);
        this.piecesController.createNewPiece("black", [7, 2]);
        this.piecesController.createNewPiece("black", [7, 4]);
        this.piecesController.createNewPiece("black", [7, 6]);
        this.piecesController.createNewPiece("black", [6, 1]);
        this.piecesController.createNewPiece("black", [6, 3]);
        this.piecesController.createNewPiece("black", [6, 5]);
        this.piecesController.createNewPiece("black", [6, 7]);
        this.piecesController.createNewPiece("black", [5, 0]);
        this.piecesController.createNewPiece("black", [5, 2]);
        this.piecesController.createNewPiece("black", [5, 4]);
        this.piecesController.createNewPiece("black", [5, 6]);
    }

}