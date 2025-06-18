import React from 'react';

const Square = ({ isDark, position, onClick, children }) => {
    const className= isDark ? 'square dark' : 'square light';

    return(
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
};

export default Square;