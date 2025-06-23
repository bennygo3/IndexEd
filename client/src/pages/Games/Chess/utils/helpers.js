export function isValidMove(from, to, board, currentTurn) {
    const piece = board[from.row][from.col];
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

    function isValidPawnMove(from, to, board, isWhite) {
        const dir = isWhite ? -1 : 1;
        const startRow = isWhite ? 6 : 1;
        const target = board[to.row][to.col];
    }
}