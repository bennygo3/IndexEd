import React from 'react';
import './Highlighter.css';

const Highlighted = ({ children, color = 'yellow' }) => {
    const style = {
        backgroundColor: color,
    };
    
    return <span className="highlighted" style={style}>{children}</span>
};

export default Highlighted;