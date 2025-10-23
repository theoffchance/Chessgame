// Arrays
const chessBoardElements = [];  // 2D-Array that contains all tiles as html-document-elements
const chessBoard = [];  // 2D-Array that contains only the strings that get displayed for every tile (piece char or empty string)
const columnLetters = ["a", "b", "c", "d", "e", "f", "g", "h"] // For converting coord-numbers to letters
const turns = [];   // Logs all turns (turns get stored as objects)

// Document-Elements
const testOutput = document.getElementById('testOutput');               // Text-Output-Element for debugging only
const capturedByWhite = document.getElementById('capturedByWhite');     // Displays black pieces that got captured
const capturedByBlack = document.getElementById('capturedByBlack');     // Displays white pieces that got captured
const player1Tag = document.getElementById('player1Tag');               // Player 1 "name" - only used to display "Victory/Defeat"
const player2Tag = document.getElementById('player2Tag');               // Player 2 "name" - only used to display "Victory/Defeat"
const pawnPopupElement = document.getElementById('pawnPopup');          // Popup that shows when a pawn reaches the last row
const pawnPopupQueen = document.getElementById('queen');                // Queen-Piece inside pawn-popup for selection
const pawnPopupRook = document.getElementById('rook');                  // Rook-Piece inside pawn-popup for selection
const pawnPopupKnight = document.getElementById('knight');              // Knight-Piece inside pawn-popup for selection
const pawnPopupBishop = document.getElementById('bishop');              // Bishop-Piece inside pawn-popup for selection
const player1TimerElement = document.getElementById('player1Timer');    
const player2TimerElement = document.getElementById('player2Timer');    
const player1ResignButton = document.getElementById('player1Resign');   
const player2ResignButton = document.getElementById('player2Resign');
const startPopupElement = document.getElementById('startPopup');        // Gamemode-selection-popup that shows on game start
const bullet1 = document.getElementById('bullet1');                     // Bullet-gamemodes
const bullet2 = document.getElementById('bullet2');
const bullet3 = document.getElementById('bullet3');
const blitz1 = document.getElementById('blitz1');                       // Blitz-gamemodes
const blitz2 = document.getElementById('blitz2');
const blitz3 = document.getElementById('blitz3');
const standard1 = document.getElementById('standard1');                 // Standard-gamemodes
const standard2 = document.getElementById('standard2');
const standard3 = document.getElementById('standard3');

// Dynamic variables
let activePiece = null;
let colorTurn = "none";
let turnCounter = 1;
let currEligibles = [];
let turnsString = "";
let player1Time = 900;
let player2Time = 900;
let increase = 0;
let player1TimerInterval, player2TimerInterval;
let onQueenClick, onRookClick, onKnightClick, onBishopClick;

// Audio
const moveSound = new Audio("./sound/movePiece.flac");
const captureSound = new Audio("./sound/capturePieceAlt.ogg");
const clickSound = new Audio("./sound/click.wav");
const victorySound = new Audio("./sound/victory.wav")
const checkSound = new Audio("./sound/check.wav");
const drawSound = new Audio("./sound/draw.flac");
const castleSound = new Audio("./sound/castle.wav");

// Pieces
const pieces = [
    // white pawns
    { id: 0, x: 1, y: 0, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 1, x: 1, y: 1, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 2, x: 1, y: 2, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 3, x: 1, y: 3, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 4, x: 1, y: 4, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 5, x: 1, y: 5, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 6, x: 1, y: 6, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 7, x: 1, y: 7, type: "pawn", color: "white", alive: true, char: "♟", enPassant: false, moves: 0 },
    // black pawns
    { id: 8, x: 6, y: 0, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 9, x: 6, y: 1, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 10, x: 6, y: 2, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 11, x: 6, y: 3, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 12, x: 6, y: 4, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 13, x: 6, y: 5, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 14, x: 6, y: 6, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false, moves: 0 },
    { id: 15, x: 6, y: 7, type: "pawn", color: "black", alive: true, char: "♟", enPassant: false, moves: 0 },
    // rooks
    { id: 16, x: 0, y: 0, type: "rook", color: "white", alive: true, char: "♜", moves: 0 },
    { id: 17, x: 0, y: 7, type: "rook", color: "white", alive: true, char: "♜", moves: 0 },
    { id: 18, x: 7, y: 0, type: "rook", color: "black", alive: true, char: "♜", moves: 0 },
    { id: 19, x: 7, y: 7, type: "rook", color: "black", alive: true, char: "♜", moves: 0 },
    // knights
    { id: 20, x: 0, y: 1, type: "knight", color: "white", alive: true, char: "♞", moves: 0 },
    { id: 21, x: 0, y: 6, type: "knight", color: "white", alive: true, char: "♞", moves: 0 },
    { id: 22, x: 7, y: 1, type: "knight", color: "black", alive: true, char: "♞", moves: 0 },
    { id: 23, x: 7, y: 6, type: "knight", color: "black", alive: true, char: "♞", moves: 0 },
    // bishops
    { id: 24, x: 0, y: 2, type: "bishop", color: "white", alive: true, char: "♝", moves: 0 },
    { id: 25, x: 0, y: 5, type: "bishop", color: "white", alive: true, char: "♝", moves: 0 },
    { id: 26, x: 7, y: 2, type: "bishop", color: "black", alive: true, char: "♝", moves: 0 },
    { id: 27, x: 7, y: 5, type: "bishop", color: "black", alive: true, char: "♝", moves: 0 },
    // queens
    { id: 28, x: 0, y: 3, type: "queen", color: "white", alive: true, char: "♛", moves: 0 },
    { id: 29, x: 7, y: 3, type: "queen", color: "black", alive: true, char: "♛", moves: 0 },
    // kings
    { id: 30, x: 0, y: 4, type: "king", color: "white", alive: true, char: "♚", moves: 0 },
    { id: 31, x: 7, y: 4, type: "king", color: "black", alive: true, char: "♚", moves: 0 }
];

// Initiation
declareBoard();
updateBoard();
startPopup();
player1ResignButton.onclick = () => victory("black");
player2ResignButton.onclick = () => victory("white");

function declareBoard() {   // Sets up chessBoard- and chessBoardElements-Array + adds EventListeners to every tile
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

function updateBoard() {    // Clears the board, sets all new pieces, then draws the board again.
    goThroughBoard(clear);
    setPieces();
    goThroughBoard(draw);
}

function goThroughBoard(callBack) {     // Goes through every tile on the board and performs given callBack-function
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            callBack(x, y);
        }
    }
}

function clear(x, y) {
    chessBoardElements[x][y].innerText = "";
    chessBoardElements[x][y].style = "";
    chessBoardElements[x][y].className = chessBoardElements[x][y].className === "whiteFieldWithFigure" || chessBoardElements[x][y].className === "whiteField" ? "whiteField" : "blackField";
}

function setPieces() {      // Saves symbol of all alive pieces in chessBoard-Array and updates their respective tile-element 
    pieces.forEach(piece => {
        if (piece.alive) {
            chessBoard[piece.x][piece.y] = piece.char;
            chessBoardElements[piece.x][piece.y].className = chessBoardElements[piece.x][piece.y].className === "whiteField" || chessBoardElements[piece.x][piece.y].className === "whiteFieldWithFigure" ? "whiteFieldWithFigure" : "blackFieldWithFigure";
            chessBoardElements[piece.x][piece.y].style = `color: ${piece.color}`;
        }
    });
}

function draw(x, y) {
    chessBoardElements[x][y].innerText = chessBoard[x][y];
}

function startPopup() {     // Start-popup for gamemode-selection
    const bullet1Click = () => startGame(bullet1);
    const bullet2Click = () => startGame(bullet2);
    const bullet3Click = () => startGame(bullet3);
    const blitz1Click = () => startGame(blitz1);
    const blitz2Click = () => startGame(blitz2);
    const blitz3Click = () => startGame(blitz3);
    const standard1Click = () => startGame(standard1);
    const standard2Click = () => startGame(standard2);
    const standard3Click = () => startGame(standard3);
    bullet1.addEventListener("click", bullet1Click);
    bullet2.addEventListener("click", bullet2Click);
    bullet3.addEventListener("click", bullet3Click);
    blitz1.addEventListener("click", blitz1Click);
    blitz2.addEventListener("click", blitz2Click);
    blitz3.addEventListener("click", blitz3Click);
    standard1.addEventListener("click", standard1Click);
    standard2.addEventListener("click", standard2Click);
    standard3.addEventListener("click", standard3Click);
    startPopupElement.style = "visibility: visible";
}

function startGame(mode) {  // Sets player times depending on the selected gamemode, enables white's first turn, hides the start-popup
    let time;
    switch (mode) {
        case bullet1:
            time = 60;
            increase = 0;
            break;
        case bullet2: 
            time = 60;
            increase = 1;
            break;
        case bullet3: 
            time = 120;
            increase = 1;
            break;
        case blitz1: 
            time = 180;
            increase = 0;
            break;
        case blitz2: 
            time = 180;
            increase = 2;
            break;
        case blitz3: 
            time = 300;
            increase = 0;
            break;
        case standard1: 
            time = 600;
            increase = 0;
            break;
        case standard2: 
            time = 900;
            increase = 10;
            break;
        case standard3: 
            time = 1800;
            increase = 0;
            break;
    }
    player1Time = time;
    player2Time = time;
    updateTime(time, 0);
    colorTurn = "white";
    startPopupElement.style = "visibility: hidden";
    player1ResignButton.style = "visibility: visible";
    player2ResignButton.style = "visibility: visible";
}

function updateTime(time, player) {     // Updates remaining time for player 1, 2 or 0 (both)
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time - minutes * 60).padStart(2, "0");
    if (player === 1) player1TimerElement.innerText = `${minutes}:${seconds}`;
    if (player === 2) player2TimerElement.innerText = `${minutes}:${seconds}`;
    if (player === 0) {
        player1TimerElement.innerText = `${minutes}:${seconds}`;
        player2TimerElement.innerText = `${minutes}:${seconds}`;
    }
}

function player1Timer() {
    if (player1Time > 0) {
        player1Time--;
        updateTime(player1Time, 1);
    } else {
        player1TimerElement.innerText = "00:00";
        clearInterval(player1TimerInterval);
        victory("black");
    }
}

function player2Timer() {
    if (player2Time > 0) {
        player2Time--;
        updateTime(player2Time, 2);
    } else {
        player2TimerElement.innerText = "00:00";
        clearInterval(player2TimerInterval);
        victory("white");
    }
}

function getPiece(x, y) {   // Returns alive piece that matches given coordinates, retrns null if no piece is found
    return pieces.find(piece => piece.alive && piece.x === x && piece.y === y) || null;
}

function removePiece(piece, kill) {
    if (kill) {
        pieces[piece.id].alive = false;
        chessBoard[piece.x][piece.y] = "";
        activePiece.color === "white" ? capturedByWhite.innerText += pieces[piece.id].char : capturedByBlack.innerText += pieces[piece.id].char;
    } else {
        chessBoard[piece.x][piece.y] = "";
    }
}

function clickedOn(x, y) {
    const clickedPiece = getPiece(x, y);
    console.log("clickedOn(" + x + "," + y + ")" + clickedPiece?.type + "," + chessBoardElements[x][y].className + clickedPiece?.id);
    if (activePiece) {
        if (currEligibles.find(field => field[0] === x && field[1] === y)) {
            movePiece(x, y);
        } else {
            deselect();
        }
    } else if (clickedPiece) {
        colorTurn === clickedPiece.color ? select(clickedPiece) : false;
    }
}

function select(piece) {
    clickSound.play();
    activePiece = piece;
    chessBoardElements[piece.x][piece.y].style = `color: ${piece.color}; font-size: 3.5vw; background-color: rgb(23, 202, 193)`;
    currEligibles = getEligibleFields(piece, false);
    showEligible(currEligibles, piece);
    console.log("moves: " + piece.moves);
}

function deselect() {
    clickSound.play();
    hideEligible(currEligibles);
    chessBoardElements[activePiece.x][activePiece.y].style = `color: ${activePiece.color}`
    activePiece = null;
}

function movePiece(x, y) {
    console.log("movePiece(" + x + "," + y + ")" + activePiece.type);
    chessBoardElements[x][y].style = `color: ${activePiece.color}`;
    removePiece(activePiece, false)
    const isPiece = getPiece(x, y);
    if (isPiece) {
        saveTurn(x, y, true);
        removePiece(isPiece, true);
        pieces[activePiece.id].x = x;
        pieces[activePiece.id].y = y;
        if (isPiece.type === "king") {
            victory(activePiece.color);
        } else {
            if (activePiece.type === "pawn" && activePiece.color === "white" && x === 7) {
                pawnPopup(pieces[activePiece.id]);
            } else if (activePiece.type === "pawn" && activePiece.color === "black" && x === 0) {
                pawnPopup(pieces[activePiece.id]);
            }
        }
        captureSound.play();
    } else {
        saveTurn(x, y, false);
        activePiece.type === "king" && y - activePiece.y === 2 ? castle(activePiece.color, "short") : false;
        activePiece.type === "king" && y - activePiece.y === -2 ? castle(activePiece.color, "long") : false;
        if (activePiece.type === "pawn" && turns.length > 2 && Math.abs(turns[turns.length - 2].fromX - turns[turns.length - 2].toX) === 2) {
            const enPassant = activePiece.color === "white" ? getPiece(x - 1, y) : getPiece(x + 1, y);
            if (enPassant && enPassant.id === turns[turns.length - 2].idPiece) {
                removePiece(enPassant, true);
            }
        }
        moveSound.play();
        pieces[activePiece.id].x = x;
        pieces[activePiece.id].y = y;
        if (activePiece.type === "pawn" && activePiece.color === "white" && x === 7) {
            pawnPopup(pieces[activePiece.id]);
        } else if (activePiece.type === "pawn" && activePiece.color === "black" && x === 0) {
            pawnPopup(pieces[activePiece.id]);
        }
    }
    pieces[activePiece.id].moves++;
    hideEligible(currEligibles);
    activePiece = null;
    if (colorTurn !== "none") {  
        if (colorTurn === "white") {
            player1Time += increase;
            updateTime(player1Time, 1);
            colorTurn = "black";
            clearInterval(player1TimerInterval);
            player2TimerInterval = setInterval(player2Timer, 1000);
        } else {
            player2Time += increase;
            updateTime(player2Time, 2);
            colorTurn = "white";
            clearInterval(player2TimerInterval);
            player1TimerInterval = setInterval(player1Timer, 1000);
        }
        if (colorTurn === "white" && turns.length > 1) turnCounter++;
    }
    updateBoard();
    logTurns();
    if (colorTurn === "white") {
        if (checkCheckmate("white") && checkCheck(pieces[30].x, pieces[30].y, pieces[30])) victory("black");
        if (checkCheckmate("white") && !checkCheck(pieces[30].x, pieces[30].y, pieces[30])) victory("none");
    } else if (colorTurn === "black") {
        if (checkCheckmate("black") && checkCheck(pieces[31].x, pieces[31].y, pieces[31])) victory("white");
        if (checkCheckmate("black") && !checkCheck(pieces[31].x, pieces[31].y, pieces[31])) victory("none");
    }
    if (checkCheck(pieces[30].x, pieces[30].y, pieces[30]) || checkCheck(pieces[31].x, pieces[31].y, pieces[31])) checkSound.play();
}

function saveTurn(x, y, capture) {
    const turn = { color: activePiece.color, idPiece: activePiece.id, type: activePiece.type,  fromX: activePiece.x, fromY: activePiece.y, toX: x, toY: y, captured: capture }
    turns.push(turn);
    turnsString += `(${turnCounter}) - `
    activePiece.color === "white" ? turnsString += `<span class="whitePiece">${activePiece.char}</span>` : turnsString += `<span class="blackPiece">${activePiece.char}</span>`
    turnsString += `${columnLetters[turn.fromY]}${turn.fromX + 1}`
    capture === true ? turnsString += `x${getPiece(turn.toX, turn.toY).char}` : turnsString += " - ";
    turnsString += `${columnLetters[turn.toY]}${turn.toX + 1}<br>`;
}

function getThreats(p) {
    for (const piece of pieces) {
        if (piece.color !== p.color && piece.alive) {
            const underThreat = getEligibleFields(piece, true).find((field) => field[0] === p.x && field[1] === p.y);
            if (underThreat) return true;
        }
    }
    return false;
}

function checkCheck(x, y, piece) {
    const isPiece = getPiece(x, y);
    const originX = piece.x;
    const originY = piece.y;
    if (isPiece && isPiece.id !== piece.id) pieces[isPiece.id].alive = false;
    pieces[piece.id].x = x;
    pieces[piece.id].y = y;
    const isCheck = piece.color === "white" ? getThreats(pieces[30]) : getThreats(pieces[31]);
    pieces[piece.id].x = originX;
    pieces[piece.id].y = originY;
    if (isPiece && isPiece.id !== piece.id) pieces[isPiece.id].alive = true;
    return isCheck;
}

function checkCheckmate(color) {
    const allEligibles = [];
    pieces.forEach(piece => {
        if (piece.color === color && piece.alive === true) {
            getEligibleFields(piece, false)?.forEach(field => allEligibles.push(field));
        }
    });
    console.clear();
    console.log(allEligibles.length);
    return allEligibles.length === 0 ? true : false;
}

function getEligibleFields(piece, threating) {
    let eligibleFields = [];
    switch (piece.type) {
        // PAWNS
        case "pawn":
            if (piece.color === "white") { // PAWNS white
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
            if (piece.color === "black") { // PAWNS black 
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
            break;
        // KNIGHTS
        case "knight":
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
            break;
        // BISHOPS
        case "bishop":
            eligibleFields = checkDiagonals(eligibleFields, piece);
            break;
        // ROOKS
        case "rook":
            eligibleFields = checkUpAndDown(eligibleFields, piece);
            break;
        // QUEENS
        case "queen":
            eligibleFields = checkUpAndDown(eligibleFields, piece);
            eligibleFields.concat(checkDiagonals(eligibleFields, piece));
            break;
        // KINGS
        case "king":
            // up/down/right/left
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
            // diagonals
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
            if (piece.id === 30 && piece.moves === 0 && threating === false) { // Castle for white
                if (getThreats(piece) === false) {
                    if (pieces[17].moves === 0 && getPiece(0, 5) === null && getPiece(0, 6) === null) { // short castle
                        const dummy1 = createDummy(0, 6, "dummy", "white");
                        const dummy2 = createDummy(0, 5, "dummy", "white");
                        getThreats(dummy1) === false && getThreats(dummy2) === false ? eligibleFields.push([0, 6]) : false;
                    } 
                    if (pieces[16].moves === 0 && getPiece(0, 3) === null && getPiece(0, 2) === null && getPiece(0, 1) === null) { // long castle
                        const dummy1 = createDummy(0, 2, "dummy", "white");
                        const dummy2 = createDummy(0, 3, "dummy", "white");
                        getThreats(dummy1) === false && getThreats(dummy2) === false ? eligibleFields.push([0, 2]) : false;
                    } 
                }
            }
            if (piece.id === 31 && piece.moves === 0 && threating === false) { // Castle for black
                if (getThreats(piece) === false) {
                    if (pieces[19].moves === 0 && getPiece(7, 5) === null && getPiece(7, 6) === null) { // short castle
                        const dummy1 = createDummy(7, 6, "dummy", "black");
                        const dummy2 = createDummy(7, 5, "dummy", "black");
                        getThreats(dummy1) === false && getThreats(dummy2) === false ? eligibleFields.push([7, 6]) : false;
                    } 
                    if (pieces[18].moves === 0 && getPiece(7, 3) === null && getPiece(7, 2) === null && getPiece(7, 1) === null) { // long castle
                        const dummy1 = createDummy(7, 2, "dummy", "black");
                        const dummy2 = createDummy(7, 3, "dummy", "black");
                        getThreats(dummy1) === false && getThreats(dummy2) === false ? eligibleFields.push([7, 2]) : false;
                    } 
                }
            }
            break;
        }
    if (threating === false) {
        console.log(JSON.stringify(eligibleFields.filter(field => checkCheck(field[0], field[1], piece))));
        eligibleFields = eligibleFields.filter(field => !checkCheck(field[0], field[1], piece));
    }
    return eligibleFields;
}

function hideEligible(fields) {
    fields.forEach(field => {
        const isPiece = getPiece(field[0], field[1]);
        if (isPiece === null) {
            chessBoardElements[field[0]][field[1]].innerText = ``;
            chessBoardElements[field[0]][field[1]].className = chessBoardElements[field[0]][field[1]].className === "whiteFieldWithFigure" || chessBoardElements[field[0]][field[1]].className === "whiteField" ? "whiteField" : "blackField";
        } else {
            chessBoardElements[field[0]][field[1]].style = `color: ${isPiece.color}`; 
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
    });
}

function checkDiagonals(array, piece) {
    // diagonal rechts oben
    let x = piece.x + 1;
    let y = piece.y + 1;
    let pieceEncountered = false;
    while (pieceEncountered === false && x < 8 && y < 8) {
        const isPiece = getPiece(x, y);
        if (isPiece) {
            if (isPiece.color !== piece.color) {
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
        const isPiece = getPiece(x, y);
        if (isPiece) {
            if (isPiece.color !== piece.color) {
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
        const isPiece = getPiece(x, y);
        if (isPiece) {
            if (isPiece.color !== piece.color) {
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
        const isPiece = getPiece(x, y);
        if (isPiece) {
            if (isPiece.color !== piece.color) {
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
        const isPiece = getPiece(x, piece.y);
        if (isPiece) {
            if (isPiece.color !== piece.color) {
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
        const isPiece = getPiece(x, piece.y);
        if (isPiece) {
            if (isPiece.color !== piece.color) {
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
        const isPiece = getPiece(piece.x, y);
        if (isPiece) {
            if (isPiece.color !== piece.color) {
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
        const isPiece = getPiece(piece.x, y);
        if (isPiece) {
            if (isPiece.color !== piece.color) {
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

function castle(color, length) {
    castleSound.play();
    if (color === "white") {
        if (length === "short") {
            pieces[17].y = 5;
            chessBoard[0][7] = "";
            pieces[17].moves++;
        } else if (length === "long") {
            pieces[16].y = 3;
            chessBoard[0][0] = "";
            pieces[16].moves++;
        }
    } else if (color === "black") {
        if (length === "short") {
            pieces[19].y = 5;
            chessBoard[7][7] = "";
            pieces[19].moves++;
        } else if (length === "long") {
            pieces[18].y = 3;
            chessBoard[7][0] = "";
            pieces[18].moves++;
        }
    }
}

function pawnPopup(pawn) {
    if (onQueenClick) pawnPopupQueen.removeEventListener("click", onQueenClick);
    if (onRookClick) pawnPopupRook.removeEventListener("click", onRookClick);
    if (onKnightClick) pawnPopupKnight.removeEventListener("click", onKnightClick);
    if (onBishopClick) pawnPopupBishop.removeEventListener("click", onBishopClick);
    onQueenClick = () => swapPawn(pawn, "queen", "♛");
    onRookClick = () => swapPawn(pawn, "rook", "♜");
    onKnightClick = () => swapPawn(pawn, "knight", "♞");
    onBishopClick = () => swapPawn(pawn, "bishop", "♝");
    pawnPopupQueen.className = "pieceContainerWhite";
    pawnPopupRook.className = "pieceContainerWhite";
    pawnPopupKnight.className = "pieceContainerWhite";
    pawnPopupBishop.className = "pieceContainerWhite";
    pawnPopupElement.style = "visibility: visible";
    pawnPopupQueen.addEventListener("click", onQueenClick);
    pawnPopupRook.addEventListener("click", onRookClick);
    pawnPopupKnight.addEventListener("click", onKnightClick);
    pawnPopupBishop.addEventListener("click", onBishopClick);
    if (pawn.color === "black") {
        pawnPopupQueen.className = "pieceContainerBlack";
        pawnPopupRook.className = "pieceContainerBlack";
        pawnPopupKnight.className = "pieceContainerBlack";
        pawnPopupBishop.className = "pieceContainerBlack";
        pawnPopupElement.style = `color: black; background-color: white; border-color: black`;
    }
    colorTurn = "none";
}

function swapPawn(pawn, pType, pChar) {
    pawnPopupElement.style = "visibility: hidden";
    pieces[pawn.id].alive = false;
    chessBoard[pawn.x][pawn.y] = "";
    const newPiece = { id: pieces.length, x: pawn.x, y: pawn.y, type: pType, color: pawn.color, alive: true, char: pChar };
    pieces.push(newPiece);
    console.log(`swapping(${pieces[pawn.id].alive}, ${pieces[pieces.length - 1].id}, ${pieces[pieces.length - 1].type})`);
    updateBoard();
    if (pawn.color === "white") {
        colorTurn = "black";
        clearInterval(player1TimerInterval);
        player2TimerInterval = setInterval(player2Timer, 1000);
    } else {
        colorTurn = "white";
        clearInterval(player2TimerInterval);
        player1TimerInterval = setInterval(player1Timer, 1000);
    }
    colorTurn === "white" && turns.length > 1 ? turnCounter++ : false;
}

function createDummy(x, y, type, color) {
    const dummy = { x: x, y: y, type: type, color: color, alive: true };
    return dummy; 
}

function logTurns() {
    turnLog.innerHTML = `<strong>Log:</strong><br>` + turnsString;
}

function victory(color) {
    switch (color) {
        case "white":
            victorySound.play();
            player1Tag.innerText += " (Victory)";
            player2Tag.innerText += " (Defeat)";
            break;
        case "black":
            victorySound.play();
            player1Tag.innerText += " (Defeat)";
            player2Tag.innerText += " (Victory)";
            break;
        case "none":
            drawSound.play();
            player1Tag.innerText += (" (Draw)");
            player2Tag.innerText += (" (Draw)");
            break;
    }
    console.log("victory(" + color + ")");
    colorTurn = "none";
    player1ResignButton.style = "visibility: hidden";
    player2ResignButton.style = "visibility: hidden";
    clearInterval(player1TimerInterval);
    clearInterval(player2TimerInterval);
}

function showTestOutput() {
    testOutput.innerHTML = "Turn: " + turnCounter + `   activePiece: <span id="activePiece">` + JSON.stringify(activePiece) + "</span><br>";
    /*
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            testOutput.innerText += "Element " + x + "," + y + " = " + JSON.stringify(getPiece(x, y)) + "\n";
        }
    }*/
    testOutput.innerText += "Anzahl Elemente = " + chessBoardElements[0].length.toString();
}