import React from 'react';

import './Highlighter.css';

export default function Highlighted({ color = 'yellow', border = 'none', underline = 'none', underlineOffset, children }) {
    const style = {
        backgroundColor: color,
        border: border,
        textDecoration: underline,
        textUnderlineOffset: underlineOffset,
    };

    return <span className="highlighted" style={style}>{children}</span>
};

