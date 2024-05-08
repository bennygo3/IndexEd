import React, { useState } from 'react';
import { statesData } from '../../../components/StateImages/StateImages';
import Card from '../../../components/Card/Card.js';
import USFlag from '../../../components/StateImages/USFlag';
import './usaStates.css';

export default function USAStates() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');

    // function to flip card
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const nextCard = () => {
        setCurrentIndex((currentIndex + 1) % statesData.length);
        setIsFlipped(false);
        setFeedback('');
        setGuess('');
    };

    const prevCard = () => {
        setCurrentIndex((currentIndex - 1 + statesData.length) % statesData.length);
        setIsFlipped(false);
        setFeedback('');
        setGuess('');
    }

    // function to check user's guess
    const checkGuess = () => {
        const userGuess = guess.trim().toLowerCase();
        const correctAnswer = statesData[currentIndex].name.toLowerCase();
        if (userGuess === correctAnswer) {
            setFeedback('Correct! 🥳');
        } else {
            setFeedback('Incorrect 😔');
        }
    };

    return (
        <>
            <header>
                <USFlag />
            </header>
            <section className='usa-states-background'>
                {/* <span class="material-symbols-outlined">•••psychology_alt</span> */}
                <h3>Click the state or flip the card button to reveal the answer</h3>
                <div className='states-card' onClick={handleFlip}>

                    <Card
                        front={<img src={statesData[currentIndex].image} alt={statesData[currentIndex].name} />}
                        back={
                            <div className='states-back-content'>
                                <img src={statesData[currentIndex].image} alt={statesData[currentIndex].name} />
                                <div className='states-back-text'>{statesData[currentIndex].name}</div>
                            </div>
                        }
                        isFlipped={isFlipped}
                    />
                </div>
                <h2>Enter the name of the US state below:</h2>
                <div className='guess-section'>
                    <input
                        className='states-input'
                        type='text'
                        value={guess}
                        placeholder='Answer'
                        onChange={(e) => setGuess(e.target.value)}
                    />
                    <div>{feedback}</div>
                </div>
                <div>
                    <button onClick={handleFlip}>Flip Card</button>
                    <button onClick={prevCard}>Prev State</button>
                    <button onClick={nextCard}>Next State</button>
                    <button onClick={checkGuess}>Submit</button>
                </div>
                <div className='state-counter'>
                    {currentIndex + 1}/{statesData.length}
                </div>
            </section>
        </>
    );
}

//      <span class="material-symbols-outlined">
//     cognition
//     web_traffic
//     release_alert
//     add_comment
//     edit_note
//     text_fields
//     text_fields_alt
//     text_add
//     psychology_alt
// </span> 