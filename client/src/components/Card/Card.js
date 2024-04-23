import React from 'react';

export default function Card({ front, back, isFlipped }) {
    return (
        <div className='card'>
            {isFlipped ? (
                <div className='card-back'>
                    <div>{back}</div>
                </div>
            ) : (
                <div className='card-front'>{front}</div>
            )}
        </div>
    );
}



// import React, { useState } from 'react';

// export default function Card({ front, back }) {
//     const [isFlipped, setIsFlipped] = useState(false);

//     const flipCard = () => {
//         setIsFlipped(!isFlipped);
//     };

//     return (
//         <div className="card" onClick={flipCard}>
//             {isFlipped ? <div className="card-back">{back}</div> :
//             <div className="card-front">{front}</div>}
//         </div>
//     );
// };