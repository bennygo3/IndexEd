import React from 'react';

import './Highlighter.css';

const Highlighted = ({ color = 'yellow', children }) => {
    const style = {
        backgroundColor: color,
    };
    
    return <span className="highlighted" style={style}>{children}</span>
};

export default Highlighted;

// const Highlighted = ({ to, color = 'yellow', children }) => {
//     return (
//         <Link to={to} style={{ backgroundColor: color }}>
//             {children}
//         </Link>
//     );
// };

// export default Highlighted;
