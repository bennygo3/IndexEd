import React from 'react';

const chessPieces = {
    'wp': '♙', 'wr': '♖', 'wn': '♘', 'wb': '♗', 'wq': '♕', 'wk': '♔',
    'bp': '♟', 'br': '♜', 'bn': '♞', 'bb': '♝', 'bq': '♛', 'bk': '♚'
};

const Piece = ({ type }) => {
    return <span className="piece">{chessPieces[type]}</span>
};

export default Piece;