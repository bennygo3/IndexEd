import React { useState } from 'react';

const Card = ({ front, back }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="card" onCLick={flipCard}>
            {isFlipped ? <div className="card-back">{back}</div> :
            <div className="crad-front">{front}</div>}
        </div>
    );
};

export default Card;