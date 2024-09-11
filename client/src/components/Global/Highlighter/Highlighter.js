import React from 'react';

import './Highlighter.css';

export default function Highlighted({ color = 'yellow', underline = 'none', children }) {
    const style = {
        backgroundColor: color,
        textDecoration: underline,
    };

    return <span className="highlighted" style={style}>{children}</span>
};

