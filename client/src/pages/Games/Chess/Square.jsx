import React from 'react';

const Square = ({ isDark, position, onClick, children }) => {
    const className= isDark ? 'chessSquareDark' : 'chessSquareLight';

    return(
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
};

export default Square;