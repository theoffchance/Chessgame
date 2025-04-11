// declarations
const chessBoardElements = [];
const chessBoard = [];
const columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H"]
const testOutput = document.getElementById('testOutput');
let activePiece = null;
let whiteKingOrRookMoved = false;
let blackKingOrRookMoved = false;
let colorTurn = "white";
let turnCounter = 1;

const pieces = [
    // white pawns
    { id: 0, x: 1, y: 0, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false },
    { id: 1, x: 1, y: 1, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false },
    { id: 2, x: 1, y: 2, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false },
    { id: 3, x: 1, y: 3, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false },
    { id: 4, x: 1, y: 4, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false },
    { id: 5, x: 1, y: 5, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false },
    { id: 6, x: 1, y: 6, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false },
    { id: 7, x: 1, y: 7, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false },
    // black pawns
    { id: 8, x: 6, y: 0, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false },
    { id: 9, x: 6, y: 1, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false },
    { id: 10, x: 6, y: 2, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false },
    { id: 11, x: 6, y: 3, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false },
    { id: 12, x: 6, y: 4, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false },
    { id: 13, x: 6, y: 5, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false },
    { id: 14, x: 6, y: 6, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false },
    { id: 15, x: 6, y: 7, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false },
    // rooks
    { id: 16, x: 0, y: 0, type: "rook", color: "white", alive: true, char: "♜" },
    { id: 17, x: 0, y: 7, type: "rook", color: "white", alive: true, char: "♜" },
    { id: 18, x: 7, y: 0, type: "rook", color: "black", alive: true, char: "♜" },
    { id: 19, x: 7, y: 7, type: "rook", color: "black", alive: true, char: "♜" },
    // knights
    { id: 20, x: 0, y: 1, type: "knight", color: "white", alive: true, char: "♞" },
    { id: 21, x: 0, y: 6, type: "knight", color: "white", alive: true, char: "♞" },
    { id: 22, x: 7, y: 1, type: "knight", color: "black", alive: true, char: "♞" },
    { id: 23, x: 7, y: 6, type: "knight", color: "black", alive: true, char: "♞" },
    // bishops
    { id: 24, x: 0, y: 2, type: "bishop", color: "white", alive: true, char: "♝" },
    { id: 25, x: 0, y: 5, type: "bishop", color: "white", alive: true, char: "♝" },
    { id: 26, x: 7, y: 2, type: "bishop", color: "black", alive: true, char: "♝" },
    { id: 27, x: 7, y: 5, type: "bishop", color: "black", alive: true, char: "♝" },
    // queens
    { id: 28, x: 0, y: 3, type: "queen", color: "white", alive: true, char: "♛" },
    { id: 29, x: 7, y: 3, type: "queen", color: "black", alive: true, char: "♛" },
    // kings
    { id: 30, x: 0, y: 4, type: "king", color: "white", alive: true, char: "♚" },
    { id: 31, x: 7, y: 4, type: "king", color: "black", alive: true, char: "♚" }
];

const turns = [];

declareBoard();
goThroughBoard(clear);
setPieces();
goThroughBoard(draw);


function declareBoard() {
    for (let x = 0; x < 8; x++) {
        chessBoard.push([]);
        chessBoardElements.push([]);
        for (let y = 0; y < 8; y++) {
            chessBoard[x].push([""]);
            chessBoardElements[x].push(document.getElementById(`${x + 1}/${columnLetters[y]}`));
            chessBoardElements[x][y].addEventListener("click", () => clickedOn(x, y));
        }
    }
}

function goThroughBoard(callBack) {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            callBack(x, y);
        }
    }
}

function draw(x, y) {
    chessBoardElements[x][y].innerText = chessBoard[x][y];
}

function clear(x, y) {
    chessBoardElements[x][y].innerText = "";
    chessBoardElements[x][y].style = "";
    chessBoardElements[x][y].className = chessBoardElements[x][y].className === "whiteFieldWithFigure" || chessBoardElements[x][y].className === "whiteField" ? "whiteField" : "blackField";
}

function getPiece(x, y) {
    return pieces.find(piece => piece.alive && piece.x === x && piece.y === y) || null;
}

function clickedOn(x, y) {
    console.log("clickedOn(" + x + "," + y + ")" + getPiece(x, y)?.type + "," + chessBoardElements[x][y].className);
    if (activePiece) {
        if (getEligibleFields(activePiece, false).find(field => field[0] === x && field[1] === y)) {
            movePiece(x, y);
        } else {
            deselect();
        }
    } else if (getPiece(x, y)) {
        colorTurn === getPiece(x, y).color ? select(getPiece(x, y)) : false;
    }
    showTestOutput();
}

function select(piece) {
    activePiece = piece;
    chessBoardElements[piece.x][piece.y].style = `color: ${piece.color}; font-size: 3.8vw; background-color: rgb(23, 202, 193)`;
    showEligible(getEligibleFields(activePiece, false), piece);
}

function deselect() {
    hideEligible(getEligibleFields(activePiece, false));
    chessBoardElements[activePiece.x][activePiece.y].style = `color: ${activePiece.color}`
    activePiece = null;
}

function saveTurn(x, y) {
    const turn = { color: activePiece.color, idPiece: activePiece.id, type: activePiece.type,  fromX: activePiece.x, fromY: activePiece.y, toX: x, toY: y }
    turns.push(turn);
    console.log(turns[turns.length - 1]);
}

function movePiece(x, y) {
    console.log("movePiece(" + x + "," + y + ")" + activePiece.type);
    chessBoardElements[x][y].style = `color: ${activePiece.color}`
    chessBoard[activePiece.x][activePiece.y] = "";
    saveTurn(x, y);
    if (getPiece(x, y)) {
        pieces[getPiece(x, y).id].alive = false;
        pieces[activePiece.id].x = x;
        pieces[activePiece.id].y = y;
    } else {
        activePiece.type === "king" && y - activePiece.y === 2 ? castle(activePiece.color, "short") : false;
        activePiece.type === "king" && y - activePiece.y === -2 ? castle(activePiece.color, "long") : false;
        if (activePiece.type === "pawn" && turns.length > 2 && Math.abs(turns[turns.length - 2].fromX - turns[turns.length - 2].toX) === 2) {
            console.log("first if");
            const enPassant = activePiece.color === "white" ? getPiece(x - 1, y) : getPiece(x + 1, y);
            if (enPassant.id === turns[turns.length - 2].idPiece) {
                pieces[enPassant.id].alive = false;
                chessBoard[enPassant.x][enPassant.y] = "";
            }
        }
        pieces[activePiece.id].x = x;
        pieces[activePiece.id].y = y;
    }
    (activePiece.type === "king" || activePiece.type === "rook") && activePiece.color === "white" ? whiteKingOrRookMoved = true : false;
    (activePiece.type === "king" || activePiece.type === "rook") && activePiece.color === "black" ? blackKingOrRookMoved = true : false;
    hideEligible(getEligibleFields(activePiece, false));
    colorTurn = colorTurn === "white" ? "black" : "white";
    colorTurn === "white" ? turnCounter++ : false;
    activePiece = null;
    goThroughBoard(clear);
    setPieces();
    goThroughBoard(draw);
    /*
    if (getThreats(pieces[30]) === true || getThreats(pieces[31]) === true) {
        console.log("Check!");
    } else {
        console.log("No check.");
    }*/
}

function castle(color, length) {
    if (color === "white") {
        if (length === "short") {
            pieces[17].y = 5;
            chessBoard[0][7] = "";
        } else if (length === "long") {
            pieces[16].y = 3;
            chessBoard[0][0] = "";
        }
    } else if (color === "black") {
        if (length === "short") {
            pieces[19].y = 5;
            chessBoard[7][7] = "";
        } else if (length === "long") {
            pieces[18].y = 3;
            chessBoard[7][0] = "";
        }
    }
}

function setPieces() {
    pieces.forEach(piece => {
        if (piece.alive) {
            chessBoard[piece.x][piece.y] = piece.char;
            chessBoardElements[piece.x][piece.y].className = chessBoardElements[piece.x][piece.y].className === "whiteField" ? "whiteFieldWithFigure" : "blackFieldWithFigure";
            chessBoardElements[piece.x][piece.y].style = `color: ${piece.color}`;
        }
    });
}

function getThreats(p) {
    console.log("getThreats(" + p.type + ")");
    for (const piece of pieces) {
        if (piece.color !== p.color) {
            const underThreat = getEligibleFields(piece, true).find((field) => field[0] === p.x && field[1] === p.y);
            // console.log(underThreat);
            if (underThreat) { return true; }
        }
    }
    return false;
}

function getEligibleFields(piece, threating) {
    let eligibleFields = [];
    // BAUERN weiß
    if (piece.type === "pawn" && piece.color === "white") {
        let isUnderThreat = false;
        getPiece(piece.x + 1, piece.y) === null ? eligibleFields.push([piece.x + 1, piece.y]) : false;  // Standard zugreichweite, wenn keine Figur im weg ist
        const diagonalRight = getPiece(piece.x + 1, piece.y + 1);
        const right = getPiece(piece.x, piece.y + 1);
        if ((diagonalRight && diagonalRight.color !== piece.color) || (right && turns.length > 0 && turns[turns.length - 1].idPiece === right.id && Math.abs(turns[turns.length - 1].fromX - turns[turns.length - 1].toX) === 2)) {  // eine Figur diagonal+ oder eine enPassant figur rechts?
            eligibleFields.push([piece.x + 1, piece.y + 1]); // wenn sie schwarz ist darf geschlagen werden
            diagonalRight ? isUnderThreat = true : false;
        }
        const diagonalLeft = getPiece(piece.x + 1, piece.y - 1);
        const left = getPiece(piece.x, piece.y - 1);
        if (diagonalLeft && diagonalLeft.color !== piece.color || (left && turns.length > 0 && turns[turns.length - 1].idPiece === left.id && Math.abs(turns[turns.length - 1].fromX - turns[turns.length - 1].toX) === 2)) {  // eine Figur diagonal- oder eine enPassant figur links?
            eligibleFields.push([piece.x + 1, piece.y - 1]); // wenn sie schwarz ist darf geschlagen werden
            diagonalLeft ? isUnderThreat = true : false;
        }
        if (piece.x === 1 && getPiece(piece.x + 1, piece.y) === null && getPiece(piece.x + 2, piece.y) === null && isUnderThreat === false) {
            eligibleFields.push([piece.x + 2, piece.y]);    // Grundlinien-Bauern dürfen zwei Felder ziehen, wenn keine Figur im weg ist und Bauer nicht bedroht ist
        }  
    }
    // BAUERN schwarz
    if (piece.type === "pawn" && piece.color === "black") {
        let isUnderThreat = false;
        getPiece(piece.x - 1, piece.y) === null ? eligibleFields.push([piece.x - 1, piece.y]) : false;  // Standard zugreichweite, wenn keine Figur im weg ist
        const diagonalRight = getPiece(piece.x - 1, piece.y + 1);
        const right = getPiece(piece.x, piece.y + 1);
        if (diagonalRight && diagonalRight.color !== piece.color || (right && turns.length > 0 && turns[turns.length - 1].idPiece === right.id && Math.abs(turns[turns.length - 1].fromX - turns[turns.length - 1].toX) === 2)) {  // eine Figur diagonal+?
            eligibleFields.push([piece.x - 1, piece.y + 1]); // wenn sie weiß ist darf geschlagen werden
            diagonalRight ? isUnderThreat = true : false;
        }
        const diagonalLeft = getPiece(piece.x - 1, piece.y - 1);
        const left = getPiece(piece.x, piece.y - 1);
        if (diagonalLeft && diagonalLeft.color !== piece.color || (left && turns.length > 0 && turns[turns.length - 1].idPiece === left.id && Math.abs(turns[turns.length - 1].fromX - turns[turns.length - 1].toX) === 2)) {  // eine Figur diagonal-?
            eligibleFields.push([piece.x - 1, piece.y - 1]); // wenn sie schwarz ist darf geschlagen werden
            diagonalLeft ? isUnderThreat = true : false;
        }
        if (piece.x === 6 && getPiece(piece.x - 1, piece.y) === null && getPiece(piece.x - 2, piece.y) === null && isUnderThreat === false) {
            eligibleFields.push([piece.x - 2, piece.y]);    // Grundlinien-Bauern dürfen zwei Felder ziehen, wenn keine Figur im weg ist und Bauer nicht bedroht ist
        }
    }
    // PFERDE
    if (piece.type === "knight") {
        if (piece.x + 2 < 8 && piece.y + 1 < 8) {
            getPiece(piece.x + 2, piece.y + 1) === null || getPiece(piece.x + 2, piece.y + 1).color !== piece.color ? eligibleFields.push([piece.x + 2, piece.y + 1]) : false;
        }
        if (piece.x + 2 < 8 && piece.y - 1 >= 0) {
            getPiece(piece.x + 2, piece.y - 1) === null || getPiece(piece.x + 2, piece.y - 1).color !== piece.color ? eligibleFields.push([piece.x + 2, piece.y - 1]) : false;
        }
        if (piece.x - 2 >= 0 && piece.y + 1 < 8) {
            getPiece(piece.x - 2, piece.y + 1) === null || getPiece(piece.x - 2, piece.y + 1).color !== piece.color ? eligibleFields.push([piece.x - 2, piece.y + 1]) : false;
        }
        if (piece.x - 2 >= 0 && piece.y - 1 >= 0) {
            getPiece(piece.x - 2, piece.y - 1) === null || getPiece(piece.x - 2, piece.y - 1).color !== piece.color ? eligibleFields.push([piece.x - 2, piece.y - 1]) : false;
        }
        if (piece.x + 1 < 8 && piece.y + 2 < 8) {
            getPiece(piece.x + 1, piece.y + 2) === null || getPiece(piece.x + 1, piece.y + 2).color !== piece.color ? eligibleFields.push([piece.x + 1, piece.y + 2]) : false;
        }
        if (piece.x + 1 < 8 && piece.y - 2 >= 0) {
            getPiece(piece.x + 1, piece.y - 2) === null || getPiece(piece.x + 1, piece.y - 2).color !== piece.color ? eligibleFields.push([piece.x + 1, piece.y - 2]) : false;
        }
        if (piece.x - 1 >= 0 && piece.y + 2 < 8) {
            getPiece(piece.x - 1, piece.y + 2) === null || getPiece(piece.x - 1, piece.y + 2).color !== piece.color ? eligibleFields.push([piece.x - 1, piece.y + 2]) : false;
        }
        if (piece.x - 1 >= 0 && piece.y - 2 >= 0) {
            getPiece(piece.x - 1, piece.y - 2) === null || getPiece(piece.x - 1, piece.y - 2).color !== piece.color ? eligibleFields.push([piece.x - 1, piece.y - 2]) : false;
        }
    }
    // LÄUFER
    if (piece.type === "bishop") {
        eligibleFields = checkDiagonals(eligibleFields, piece);
    }
    // TÜRME
    if (piece.type === "rook") {
        eligibleFields = checkUpAndDown(eligibleFields, piece);
    }
    // damen
    if (piece.type === "queen") {
        eligibleFields = checkUpAndDown(eligibleFields, piece);
        eligibleFields.concat(checkDiagonals(eligibleFields, piece));
    }
    // könige
    if (piece.type === "king") {
        // oben/unten/rechts/links
        if (piece.x + 1 < 8) {
            getPiece(piece.x + 1, piece.y) === null || getPiece(piece.x + 1, piece.y).color !== piece.color ? eligibleFields.push([piece.x + 1, piece.y]) : false;
        }
        if (piece.x - 1 >= 0) {
            getPiece(piece.x - 1, piece.y) === null || getPiece(piece.x - 1, piece.y).color !== piece.color ? eligibleFields.push([piece.x - 1, piece.y]) : false;
        }
        if (piece.y + 1 < 8) {
            getPiece(piece.x, piece.y + 1) === null || getPiece(piece.x, piece.y + 1).color !== piece.color ? eligibleFields.push([piece.x, piece.y + 1]) : false;
        }
        if (piece.y - 1 >= 0) {
            getPiece(piece.x, piece.y - 1) === null || getPiece(piece.x, piece.y - 1).color !== piece.color ? eligibleFields.push([piece.x, piece.y - 1]) : false;
        }
        // diagonalen
        if (piece.x + 1 < 8 && piece.y + 1 < 8) {
            getPiece(piece.x + 1, piece.y + 1) === null || getPiece(piece.x + 1, piece.y + 1).color !== piece.color ? eligibleFields.push([piece.x + 1, piece.y + 1]) : false;
        }
        if (piece.x + 1 < 8 && piece.y - 1 >= 0) {
            getPiece(piece.x + 1, piece.y - 1) === null || getPiece(piece.x + 1, piece.y - 1).color !== piece.color ? eligibleFields.push([piece.x + 1, piece.y - 1]) : false;
        }
        if (piece.x - 1 >= 0 && piece.y - 1 >= 0) {
            getPiece(piece.x - 1, piece.y - 1) === null || getPiece(piece.x - 1, piece.y - 1).color !== piece.color ? eligibleFields.push([piece.x - 1, piece.y - 1]) : false;
        }
        if (piece.x - 1 >= 0 && piece.y + 1 < 8) {
            getPiece(piece.x - 1, piece.y + 1) === null || getPiece(piece.x - 1, piece.y + 1).color !== piece.color ? eligibleFields.push([piece.x - 1, piece.y + 1]) : false;
        }
        console.log(whiteKingOrRookMoved + activePiece.type + threating);
        if (whiteKingOrRookMoved === false && activePiece.type === "king" && threating === false) { // Rochade für weiß
            console.log("first if");
            if (getThreats(piece) === false && piece.color === "white" && piece.x === 0) {
                console.log("second if");
                if (getPiece(0, 5) === null && getPiece(0, 6) === null) { // kurze Rochade
                    console.log("third if");
                    const dummy = createDummy(0, 6, "dummy", "white");
                    console.log(getThreats(dummy));
                    getThreats(dummy) === false ? eligibleFields.push([0, 6]) : false;
                } 
                if (getPiece(0, 3) === null && getPiece(0, 2) === null && getPiece(0, 1) === null) { // lange Rochade
                    const dummy = createDummy(0, 2, "dummy", "white");
                    getThreats(dummy) === false ? eligibleFields.push([0, 2]) : false;
                } 
            }
        }
        if (blackKingOrRookMoved === false && activePiece.type === "king" && threating === false) { // Rochade für schwarz
            console.log("first if");
            if (getThreats(piece) === false && piece.color === "black" && piece.x === 7) {
                console.log("second if");
                if (getPiece(7, 5) === null && getPiece(7, 6) === null) { // kurze Rochade
                    console.log("third if");
                    const dummy = createDummy(7, 6, "dummy", "black");
                    console.log(getThreats(dummy));
                    getThreats(dummy) === false ? eligibleFields.push([7, 6]) : false;
                } 
                if (getPiece(7, 3) === null && getPiece(7, 2) === null && getPiece(7, 1) === null) { // lange Rochade
                    const dummy = createDummy(7, 2, "dummy", "black");
                    getThreats(dummy) === false ? eligibleFields.push([7, 2]) : false;
                } 
            }
        }
    }
    return eligibleFields;
}

function hideEligible(fields) {
    fields.forEach(field => {
        if (getPiece(field[0], field[1]) === null) {
            chessBoardElements[field[0]][field[1]].innerText = ``;
            chessBoardElements[field[0]][field[1]].className = chessBoardElements[field[0]][field[1]].className === "whiteFieldWithFigure" || chessBoardElements[field[0]][field[1]].className === "whiteField" ? "whiteField" : "blackField";
        } else {
            chessBoardElements[field[0]][field[1]].style = `color: ${getPiece(field[0], field[1]).color}`; 
        }
    });
}

function showEligible(fields) {
    fields.forEach(field => {
        if (chessBoardElements[field[0]][field[1]].innerText === "") {
            chessBoardElements[field[0]][field[1]].innerText = `•`;
            chessBoardElements[field[0]][field[1]].className = chessBoardElements[field[0]][field[1]].className === "whiteField" ? "whiteFieldWithFigure" : "blackFieldWithFigure";
        } else {
            chessBoardElements[field[0]][field[1]].style = `color: ${getPiece(field[0], field[1]).color}; background-color: rgb(205, 58, 80);` 
        }
    })
}

function checkDiagonals(array, piece) {
    let x = piece.x + 1;
    let y = piece.y + 1;
    let pieceEncountered = false;
    while (pieceEncountered === false && x < 8 && y < 8) {
        if (getPiece(x, y)) {
            if (getPiece(x, y).color !== piece.color) {
                array.push([x, y]);
            }
            pieceEncountered = true;
        } else {
            array.push([x, y]);
            x++;
            y++;
        }
    }
    // diagonal links oben
    x = piece.x + 1;
    y = piece.y - 1;
    pieceEncountered = false;
    while (pieceEncountered === false && x < 8 && y >= 0) {
        if (getPiece(x, y)) {
            if (getPiece(x, y).color !== piece.color) {
                array.push([x, y]);
            }
            pieceEncountered = true;
        } else {
            array.push([x, y]);
            x++;
            y--;
        }
    }
    // diagonal rechts unten
    x = piece.x - 1;
    y = piece.y + 1;
    pieceEncountered = false;
    while (pieceEncountered === false && x >= 0 && y < 8) {
        if (getPiece(x, y)) {
            if (getPiece(x, y).color !== piece.color) {
                array.push([x, y]);
            }
            pieceEncountered = true;
        } else {
            array.push([x, y]);
            x--;
            y++;
        }
    }
    // diagonal links unten
    x = piece.x - 1;
    y = piece.y - 1;
    pieceEncountered = false;
    while (pieceEncountered === false && x >= 0 && y >= 0) {
        if (getPiece(x, y)) {
            if (getPiece(x, y).color !== piece.color) {
                array.push([x, y]);
            }
            pieceEncountered = true;
        } else {
            array.push([x, y]);
            x--;
            y--;
        }
    }
    return array;
}

function checkUpAndDown(array, piece) {
    // oben
    let x = piece.x + 1;
    let pieceEncountered = false;
    while (pieceEncountered === false && x < 8) {
        if (getPiece(x, piece.y)) {
            if (getPiece(x, piece.y).color !== piece.color) {
                array.push([x, piece.y]);
            }
            pieceEncountered = true;
        } else {
            array.push([x, piece.y]);
            x++;
        }
    }
    // unten
    x = piece.x - 1;
    pieceEncountered = false;
    while (pieceEncountered === false && x >= 0) {
        if (getPiece(x, piece.y)) {
            if (getPiece(x, piece.y).color !== piece.color) {
                array.push([x, piece.y]);
            }
            pieceEncountered = true;
        } else {
            array.push([x, piece.y]);
            x--;
        }
    }
    // rechts
    let y = piece.y + 1;
    pieceEncountered = false;
    while (pieceEncountered === false && y < 8) {
        if (getPiece(piece.x, y)) {
            if (getPiece(piece.x, y).color !== piece.color) {
                array.push([piece.x, y]);
            }
            pieceEncountered = true;
        } else {
            array.push([piece.x, y]);
            y++;
        }
    }
    // links
    y = piece.y - 1;
    pieceEncountered = false;
    while (pieceEncountered === false && y >= 0) {
        if (getPiece(piece.x, y)) {
            if (getPiece(piece.x, y).color !== piece.color) {
                array.push([piece.x, y]);
            }
            pieceEncountered = true;
        } else {
            array.push([piece.x, y]);
            y--;
        }
    }
    return array;
}

function createDummy(x, y, type, color) {
    console.log("createDummy(" + x + y + type + color + ")");
    const dummy = { x: x, y: y, type: type, color: color };
    return dummy; 
}


function showTestOutput() {
    testOutput.innerHTML = "Turn: " + turnCounter + `   activePiece: <span id="activePiece">` + JSON.stringify(activePiece) + "</span><br>";
    turns.forEach(turn => {
        testOutput.innerText += JSON.stringify(turn) + "\n";
    })
    /*
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            testOutput.innerText += "Element " + x + "," + y + " = " + JSON.stringify(getPiece(x, y)) + "\n";
        }
    }*/
    testOutput.innerText += "Anzahl Elemente = " + chessBoardElements[0].length.toString();
}

showTestOutput();

/*


 [ [], [], [], [], [], ]














*/
