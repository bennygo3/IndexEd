import React, { useState } from 'react';

export default function Card({ front, back }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(prevState => !prevState);
    };

    return (
        <div className='card' onClick={handleFlip}>
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

// export default function Card({ front, back, isFlipped }) 