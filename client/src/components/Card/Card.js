import React, { useState } from 'react';

const Card = ({ front, back }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="card" onClick={flipCard}>
            {isFlipped ? <div className="card-back">{back}</div> :
            <div className="card-front">{front}</div>}
        </div>
    );
};

export default Card;