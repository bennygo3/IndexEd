import React, { useState } from 'react';
import Square from './Square';
import Piece from './Piece';
import { isValidMove } from './utils/helpers';
import './chessGame.css';

const startingBoard = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
    
];

const Chess = () => {
    const [boardState, setBoardState] = useState(startingBoard)
    const [selected, setSelected] = useState(null);
    const [currentTurn, setCurrentTurn] = useState('white');

    const handlePieceClick = (chessRow, chessCol) => {
        const selectedPiece = boardState[chessRow][chessCol];
        console.log(selectedPiece);
        if (selected) {
            const from = selected;
            const to = { chessRow, chessCol }

            if (from.chessRow === to.chessRow && from.chessCol === to.chessCol) {
                setSelected(null); // Deselects the selected piece if it is clicked and unlciked on the same square
                return;
            }

            if (isValidMove(from, to, boardState, currentTurn)) {
                const newBoard = [...boardState.map(r => [...r])];
                newBoard[to.chessRow][to.chessCol] = boardState[from.chessRow][from.chessCol];
                newBoard[from.chessRow][from.chessCol] = '';
                setBoardState(newBoard);
                setSelected(null);
                setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
                console.log(setSelected)
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
                                isSelected={
                                    selected &&
                                    selected.chessRow === rowIndex &&
                                    selected.chessCol === colIndex
                                }
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