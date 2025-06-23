export function isValidMove(from, to, board, currentTurn) {
    const piece = board[from.chessRow][from.chessCol];
    if (!piece) return false;

    const isWhite = piece.startsWith('w');

    // Moves for current turn
    if ((isWhite && currentTurn !== 'white') || (!isWhite && currentTurn !== 'black')) {
        return false;
    }

    const type = piece.slice(1);

    switch (type) {
        case 'p':
            return isValidPawnMove(from, to, board, isWhite);
        case 'r':
            return isValidRookMove(from, to, board);
        case 'n':
            return isValidKnightMove(from, to);
        case 'b':
            return isValidBishopMove(from, to, board);
        case 'q':
            return isValidQueenMove(from, to, board);
        case 'k':
            return isValidKingMove(from, to);
        default:
            return false;
    }
}

function isPathClear(from, to, board) {
    const rowMove = Math.sign(to.chessRow - from.chessRow);
    const colMove = Math.sign(to.chessCol - from.chessCol);

    let currentRow = from.chessRow + rowMove;
    let currentCol = from.chessCol + colMove;

    while (currentRow !== to.chessRow || currentCol !== to.chessCol) {
        if (board[currentRow][currentCol] !== '') return false;
        currentRow += rowMove;
        currentCol += colMove;
    }

    return true;
}

function isValidPawnMove(from, to, board, isWhite) {
    const dir = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
    const target = board[to.chessRow][to.chessCol];

    if (from.chessCol === to.chessCol && to.chessRow === from.chessRow + dir && !target) {
        return true;
    }

    if (
        from.chessCol === to.chessCol &&
        from.chessRow === startRow &&
        to.chessRow === from.chessRow + 2 * dir &&
        !target &&
        !board[from.chessRow + dir][from.chessCol]
    ) {
        return true;
    }

    // Diagonal take pawn
    if (
        Math.abs(to.chessCol - from.chessCol) === 1 &&
        to.chessRow === from.chessRow + dir &&
        target &&
        isWhite !== target.startsWith('w')
    ) {
        return true;
    }

    return false;
}

function isValidRookMove(from, to, board) {
    if (from.chessRow !== to.chessRow && from.chessCol !== to.chessCol) return false;
    return isPathClear(from, to, board);
}

function isValidKnightMove(from, to) {
    const rowDiff = Math.abs(from.chessRow - to.chessRow);
    const colDiff = Math.abs(from.chessCol - to.chessCol);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

function isValidBishopMove(from, to, board) {
    if (Math.abs(from.chessRow - to.chessRow) !== Math.abs(from.chessCol - to.chessCol)) return false;
    return isPathClear(from, to, board);
}

function isValidQueenMove(from, to, board) {
    const isStraight = from.chessRow === to.chessRow || from.chessCol === to.chessCol;
    const isDiagonal = Math.abs(from.chessRow - to.chessRow) === Math.abs(from.chessCol - to.chessCol);

    if (!isStraight && !isDiagonal) return false;
    return isPathClear(from, to, board);
}

function isValidKingMove(from, to) {
    const rowDiff = Math.abs(from.chessRow - to.chessRow);
    const colDiff = Math.abs(from.chessCol - to.chessCol);
    return rowDiff <= 1 && colDiff <= 1;
}
