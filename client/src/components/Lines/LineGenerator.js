import React from 'react';

const LineGenerator = ({ amount, colorClass }) => {
    const lines = [];
    for (let i = 0; i < amount; i++) {
        lines.push(<div key={i} className={colorClass}></div>);
    }
    return <div className="line-container">{lines}</div>;
};

export default LineGenerator;

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