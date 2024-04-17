import React from 'react';

import './Highlighter.css';

export default function Highlighted({ color = 'yellow', children }) {
    const style = {
        backgroundColor: color,
    };
    
    return <span className="highlighted" style={style}>{children}</span>
};

// const Highlighted = ({ to, color = 'yellow', children }) => {
//     return (
//         <Link to={to} style={{ backgroundColor: color }}>
//             {children}
//         </Link>
//     );
// };

// export default Highlighted;
