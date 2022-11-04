class Square {
    constructor(x, y, index, controller, board) {
        this.position = [x, y];
        this.board = board;
        this.controller = controller;
        this.index = index;
        this.id = Number(x.toString() + y.toString());
        this.row = x;
        this.column = y;
        this.img = "";
        this.isHighlighted = false;
        this.isCaptureHighlighted = false;
        this.element = document.getElementById(this.id);
        this.piece = null;

        this.eventClick()
    }

    eventClick() {
        this.element.addEventListener("click", () => {
            this.board.eventEmitter.squareClick(this.id)
        })
    }

    hide() {
        this.element.classList.remove("h-move");
        this.isHighlighted = false;
    }

    highlight() {
        if (!this.piece) {
            this.element.classList.add("h-move");
            this.isHighlighted = true;
        }
    }

    hideCapture() {
        this.element.classList.remove("h-capture");
        this.isCaptureHighlighted = false;
    }

    addCapture() {
        this.element.classList.add("h-capture");
        this.isCaptureHighlighted = true;
    }

    set image(img) {
        this.img = img;
        this.element.childNodes[0].style.backgroundImage = `url(${img})`;
    }

    get image() {
        return this.img
    }
}