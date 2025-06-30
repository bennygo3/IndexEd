import React from 'react';

const Square = ({ isDark, isSelected, isHighlighted, position, onClick, children }) => {
    let className = isDark ? 'chessSquareDark' : 'chessSquareLight';

    if (isSelected) className += ' selectedSquare';
    if (isHighlighted) className += ' highlightedSquare';
    return(
        <div className ={className} onClick={onClick}>
            {children}
        </div>
    );
};

export default Square;