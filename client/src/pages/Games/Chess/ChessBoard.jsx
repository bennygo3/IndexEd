import React, { useState } from 'react';
import Square from './Square';
import Piece from './Piece';
import './chessGame.css';

const startingBoard = [
    ['wr','wn','wb','wq','wk','wb','wn','wr'],
    ['wp','wp','wp','wp','wp','wp','wp','wp'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['bp','bp','bp','bp','bp','bp','bp','bp'],
    ['br','bn','bb','bq','bk','bb','bn','br']
];

const Chess = () => {
    const [boardState, setBoardState] = useState(startingBoard)
    const [selected, setSelected] = useState(null);

    const handlePieceClick = (row, col) => {
        const selectedPiece = boardState[row][col];

        if (selected) {
            const from = selected;
            const to = { row, col };

            const newBoard = [...boardState.map(r => [...r])];
            newBoard[to.row][to.col] = boardState[from.row][from.col];
            newBoard[from.row][from.col] = '';
            setBoardState(newBoard);
            setSelected(null);
        } else if (selectedPiece) {
            setSelected({ row, col });
        }
    };

    return (
        <div className="chessboard">
            {boardState.map((rowArr, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {rowArr.map((piece, colIndex) => {
                        const isDark = (rowIndex + colIndex) % 2 === 1;

                        return (
                            <Square 
                                key = {`${rowIndex}-${colIndex}`}
                                isDark = {isDark}
                                position = {{ row: rowIndex, col: colIndex }}
                                onClick = {() => handlePieceClick(rowIndex, colIndex)}
                            >
                                {piece && <Piece type = {piece} />}
                            </Square>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Chess;

// const board = [];
    // for (let row = 0; row < 8; row++) {
    //     const squares = [];
    //     for(let col = 0; col < 8; col++) {
    //         const isDark = (row + col) % 2 === 1;
    //         squares.push(
    //             <Square 
    //                 key={`${row}-${col}`} 
    //                 isDark={isDark} 
    //                 position={{ row, col }} />
    //         );
    //     }
    //     board.push(<div className="row" key={row}>{squares}</div>);
    // }

