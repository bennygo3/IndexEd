import React, { useState } from 'react';
import { statesData } from '../../../components/StateImages/StateImages';
import Card from '../../../components/Card/Card.js';
import './usaStates.css';

export default function USAStates() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const nextCard = () => {
        setCurrentIndex((currentIndex + 1) % statesData.length);
        setIsFlipped(false);
    };

    return (
        <div className='usa-states-background'>
            <div className='states-card' onClick={handleFlip}>
            <Card
                front={<img src={statesData[currentIndex].image} alt={statesData[currentIndex].name} />}
                back={statesData[currentIndex].name}
                isFlipped={isFlipped}
            />
            </div>
            <button onClick={handleFlip}>Flip Card</button>
            <button onClick={nextCard}>Next State</button>
        </div>
    );
}