import React, { useState, useEffect, useCallback } from 'react';
import { statesData } from '../../../components/StateImages/StateImages';
import Card from '../../../components/Card/Card.js';
import USFlag from '../../../components/StateImages/USFlag';
import FunFacts from '../../../components/Facts/FunFacts';
import NavbarTD from '../../../components/Navbar/NavbarTD';
import './usaStates.css';

export default function USAStates() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');

    const nextCard = useCallback(() => {
        // setCurrentIndex((currentIndex + 1) % statesData.length);
        setCurrentIndex(prevIndex => (prevIndex + 1) % statesData.length);
        setIsFlipped(false);
        setFeedback('');
        setGuess('');
    }, []);

    const prevCard = useCallback(() => {
        // setCurrentIndex((currentIndex - 1 + statesData.length) % statesData.length);
        setCurrentIndex(prevIndex => (prevIndex - 1 + statesData.length) % statesData.length);
        setIsFlipped(false);
        setFeedback('');
        setGuess('');
    }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowRight') {
                nextCard();
            } else if (event.key === 'ArrowLeft') {
                prevCard();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [nextCard, prevCard]);

    // function to flip card
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

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
            <header className='usa-page-header'>
                <NavbarTD />
                <USFlag />
                <FunFacts />
            </header>
            <section className='usa-states-background'>

                <div className='usa-studycard-section'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        checkGuess();
                    }}>
                        <div className='guess-section'>
                            <label htmlFor='stateInput' className='state-label'>US State:</label>
                            <input
                                id='stateInput'
                                className='states-input'
                                type='text'
                                value={guess}
                                placeholder='Answer'
                                onChange={(e) => setGuess(e.target.value)}
                            />
                            <div>{feedback}</div>
                        </div>
                    </form>
                    <div>
                        <button onClick={checkGuess}>Submit</button>
                        <button onClick={handleFlip}>Flip Card</button>
                        <button onClick={prevCard}>Prev State</button>
                        <button onClick={nextCard}>Next State</button>
                    </div>
                    <div className='state-counter'>
                        {currentIndex + 1}/{statesData.length}
                    </div>
                </div>

                <div className='states-display'>
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