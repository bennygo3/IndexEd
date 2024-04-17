import React from 'react';

export default function LineGenerator({ amount, colorClass }) {
    const lines = [];
    for (let i = 0; i < amount; i++) {
        lines.push(<div key={i} className={colorClass}></div>);
    }
    return <div className="line-container">{lines}</div>;
};

// const LineGenerator = ({ amount, colorClass, spacing, startTop }) => {
//     const lines = [];
//     for (let i = 0; i < amount; i++) {
//         const linePosition = startTop + i * spacing;
//         lines.push(
//             <div    
//                 key={i}
//                 className={colorClass}
//                 style={{ top: `${linePosition}px` }}
//             ></div>
//         );
//     }
//     return <>{lines}</>;
// };