var numSelected = null;
var tileSelected = null;
var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function () {
    setGame();
};

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9X9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.innerText = board[r][c];
            if (board[r][c] != "-") {
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (board[r][c] == "-" || board[r][c] == numSelected.id) {
            if (isSafe(r, c, numSelected.id)) {
                board[r] = board[r].substr(0, c) + numSelected.id + board[r].substr(c + 1);
                this.innerText = numSelected.id;
                if (isSolved()) {
                    alert("Congratulations! Sudoku Solved!");
                }
            } else {
                errors += 1;
                document.getElementById("errors").innerText = errors;
            }
        }
    }
}

function isSafe(row, col, num) {
    return (
        isSafeInRow(row, num) &&
        isSafeInCol(col, num) &&
        isSafeInBox(row - (row % 3), col - (col % 3), num)
    );
}

function isSafeInRow(row, num) {
    for (let c = 0; c < 9; c++) {
        if (board[row][c] == num) {
            return false;
        }
    }
    return true;
}

function isSafeInCol(col, num) {
    for (let r = 0; r < 9; r++) {
        if (board[r][col] == num) {
            return false;
        }
    }
    return true;
}

function isSafeInBox(startRow, startCol, num) {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[startRow + r][startCol + c] == num) {
                return false;
            }
        }
    }
    return true;
}

function isSolved() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] == "-") {
                return false;
            }
        }
    }
    return true;
}
