import React from 'react';
import Square from './Square';
import './chessGame.css';

const ChessBoard = () => {
    const board = [];

    for (let row = 0; row < 8; row++) {
        const squares = [];
        for(let col = 0; col < 8; col++) {
            const isDark = (row + col) % 2 === 1;
            squares.push(
                <Square key={`${row}-${col}`} isDark={isDark} position={{ row, col }} />
            );
        }
        board.push(<div className="row" key={row}>{squares}</div>);
    }

    return <div className="chessboard">{board}</div>;
};

export default ChessBoard;

