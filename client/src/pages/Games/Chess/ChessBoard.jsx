import React, { useState } from 'react';
import Square from './Square';
import Piece from './Piece';
import { isValidMove } from './utils/helpers';
import './chessGame.css';

const startingBoard = [
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br']
];

const Chess = () => {
    const [boardState, setBoardState] = useState(startingBoard)
    const [selected, setSelected] = useState(null);
    const [currentTurn, setCurrentTurn] = useState('white');

    const handlePieceClick = (chessRow, chessCol) => {
        const selectedPiece = boardState[chessRow][chessCol];

        if (selected) {
            // const from = { row: selected.chessRow, col: selected.chessCol };
            const from = selected;
            const to = { chessRow, chessCol }

            if (isValidMove(from, to, boardState, currentTurn)) {
                const newBoard = [...boardState.map(r => [...r])];
                newBoard[to.chessRow][to.chessCol] = boardState[from.chessRow][from.chessCol];
                newBoard[from.chessRow][from.chessCol] = '';
                setBoardState(newBoard);
                setSelected(null);
                setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
            } else {
                setSelected(null);
            }
        } else if (selectedPiece && selectedPiece.startsWith(currentTurn[0])) {
            setSelected({ chessRow, chessCol})
        }
    };

    return (
        <>
            <div className="top-border"></div>
            <div className="chessboard">
                {boardState.flatMap((rowArr, rowIndex) =>
                    rowArr.map((piece, colIndex) => {
                        const isDark = (rowIndex + colIndex) % 2 === 1;

                        return (
                            <Square
                                key={`${rowIndex}-${colIndex}`}
                                isDark={isDark}
                                position={{ chessRow: rowIndex, chessCol: colIndex }}
                                onClick={() => handlePieceClick(rowIndex, colIndex)}
                            >
                                {piece && <Piece type={piece} />}
                            </Square>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default Chess;