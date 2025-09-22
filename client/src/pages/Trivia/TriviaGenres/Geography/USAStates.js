import { useState, useEffect, useCallback, useMemo } from 'react';
import TestEngine from './TestMode';
import { statesData } from '../../StateImages/StateImages';
import Card from '../../../../components/Card/Card.js';
import USFlag from '../../StateImages/USFlag.js';
import FunFacts from '../../../../components/Facts/FunFacts.js';
import NavbarTD from '../../../../components/Navbar/NavbarTD.js';
import './usaStates.css';

export default function USAStates() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [guessBank, setGuessBank] = useState([]);
    const [isTest, setIsTest] = useState(false);

    const normalize = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const titleCase = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

    const nextCard = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % statesData.length);
        setIsFlipped(false);
        setFeedback('');
        setGuess('');
        setGuessBank([]);
    }, []);

    const prevCard = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + statesData.length) % statesData.length);
        setIsFlipped(false);
        setFeedback('');
        setGuess('');
        setGuessBank([]);
    }, []);

    useEffect(() => {
        if (isTest) return; // disables prev/next buttons while in test mode
        
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
    }, [nextCard, prevCard, isTest]);

    // function to flip card
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const validStates = useMemo(
        () => new Set(statesData.map(s => normalize(s.name))),
        []
    );
    
    // function to check user's guess
    const checkGuess = () => {
        const userCurrentGuess = guess;
        const userGuess = normalize(userCurrentGuess);
        const correctAnswer = normalize(statesData[currentIndex].name);
        
        if (!userGuess) return;

        // Blocks any submission that isn't a 50-state name
        if (!validStates.has(userGuess)) {
            setFeedback('Not a valid U.S.state');
            setGuess('');
            return;
        }
        
        if (userGuess === correctAnswer) {
            setFeedback('Correct! 🥳');
            setGuess('');
            return;
        } 
        
        setFeedback('Incorrect 😔');

            setGuessBank(prev => {
            const exists = prev.some(g => normalize(g) === userGuess);
            return exists ? prev : [...prev, titleCase(userCurrentGuess)];
        });
        

        setGuess('');
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
                <div className="states-test-button">
                        {!isTest ? (
                            <button onClick = {() => setIsTest(true)}>Take Test</button>
                        ) : (
                            <button onClick = {() => setIsTest(false)}>Quit Test</button>
                        )}
                    </div>
                     {/* ---Test Mode--- */}
                    {isTest ? (
                        <TestEngine
                            title="U.S. States Test"
                            data={statesData}
                            getLabel={(item) => item.name}
                            renderPrompt={(item) => (
                                <img src={item.image} alt={item.name} className="state-image" />
                            )}
                            validateSet={new Set(statesData.map(s => s.name.toLowerCase()))}
                            onFinish={(result) => {
                                const { correct, total, percent } = result
                                console.log('Final test result:', result, correct, total, percent)
                            }}
                        />
                    ) : (
                        // ---Study Mode---
                <>
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
                                placeholder=''
                                autoComplete='off'
                                onChange={(e) => setGuess(e.target.value)}
                            />

                        </div>
                    </form>
                    <div>
                        <button onClick={prevCard}>Prev State</button>
                        <button onClick={nextCard}>Next State</button>
                        <button onClick={handleFlip}>Flip Card</button>
                        <button onClick={checkGuess}>Submit</button>
    
                    </div>
                
                    <div className="guess-bank" aria-live="polite">
                        <div className="guess-bank-title">Guesses:</div>
                        {guessBank.length ? (
                        <ul className="guess-list">
                        {guessBank.map((g, i) => (
                            <li key={`${g}-${i}`} className="guess-chip">{g}</li>
                        ))}
                        </ul>
                        ) : (
                            <div className="empty-guess"></div>
                        )}
                    </div>
                    <div
                        className={`guess-feedback ${feedback === 'Correct! 🥳' ? 'is-correct' : feedback ? 'is-wrong' : ''}`}
                        aria-live="polite"
                    >
                        {feedback}
                    </div>

                    <div className='state-counter'>
                        {currentIndex + 1}/{statesData.length}
                    </div>
                </>
                    )}

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