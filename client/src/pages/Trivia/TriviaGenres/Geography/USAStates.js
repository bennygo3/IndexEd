import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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

    // ---Test Hooks---
    const [isTest, setIsTest] = useState(false);
    const [order, setOrder] = useState([]);
    const [idxInOrder, setIdxInOrder] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [testScore, setTestScore] = useState({ correct: 0, total: 0 })
    const advanceRef = useRef(null);

    const normalize = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const titleCase = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

    const validStates = useMemo(
        () => new Set(statesData.map(s => normalize(s.name))),
        []
    );

    const nextCard = useCallback(() => {
        if (isTest) return; //next card button locked during a test
        setCurrentIndex(prevIndex => (prevIndex + 1) % statesData.length);
        setIsFlipped(false);
        setFeedback('');
        setGuess('');
        setGuessBank([]);
    }, [isTest]);

    const prevCard = useCallback(() => {
        if (isTest) return; //previous card button locked during a test
        setCurrentIndex(prevIndex => (prevIndex - 1 + statesData.length) % statesData.length);
        setIsFlipped(false);
        setFeedback('');
        setGuess('');
        setGuessBank([]);
    }, [isTest]);

    useEffect(() => {
        if (isTest) return; // disables prev/next buttons while in test mode

        const handleKeyPress = (event) => {
            if (event.key === 'ArrowRight') nextCard();
            else if (event.key === 'ArrowLeft') prevCard();
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [nextCard, prevCard, isTest]);

    // function to flip card
    const handleFlip = () => {
        if (isTest) return;
        setIsFlipped(!isFlipped);
    };

    // --- test fucntions
    const totalQuestions = statesData.length;
    const shuffleQs = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const startTest = () => {
        const sequence = shuffleQs([...Array(totalQuestions).keys()]);
        setOrder(sequence);
        setIdxInOrder(0);
        setIsTest(true);
        setTestScore({ correct: 0, total: 0 });
        setAnswered(false);
        setFeedback('');
        setGuessBank([]);
        setIsFlipped(false);
        setCurrentIndex(sequence[0]);
    };

    const finishTest = () => {
        setIsTest(false);
        setAnswered(false);
        if (advanceRef.current) {
            clearTimeout(advanceRef.current);
            advanceRef.current = null;
        }
        const pctScore = Math.round((testScore.correct / totalQuestions) * 100);
        setFeedback(`Test complete: ${testScore.correct}/${totalQuestions} (${pctScore}%)`);
    };

    const advanceTest = () => {
        const next = idxInOrder + 1;
        if (next >= totalQuestions) {
            finishTest();
            return;
        }
        setIdxInOrder(next);
        setCurrentIndex(order[next]);
        setGuess('');
        setFeedback('');
        setAnswered(false);
        setIsFlipped(false);
    };

    useEffect(() => {
        return () => {
            if (advanceRef.current) clearTimeout(advanceRef.current);
        };
    }, []);


    const checkGuess = () => {
        const userCurrentGuess = guess;
        const userGuess = normalize(userCurrentGuess);
        const correctAnswer = normalize(statesData[currentIndex].name);
        if (!userGuess || answered) return;

        // Blocks any submission that isn't a 50-state name
        if (!validStates.has(userGuess)) {
            setFeedback('Not a valid U.S. state');
            setGuess('');
            return;
        }


        if (!isTest) {
            // --- study mode ---
            if (userGuess === correctAnswer) {
                setFeedback('Correct! 🥳');
            } else {
                setFeedback('Incorrect 😫');
                setGuessBank(prev => {
                    const exists = prev.some(g => normalize(g) === userGuess);
                    return exists ? prev : [...prev, titleCase(userCurrentGuess)];
                });
            }
            setGuess('')
            return;
        };

        // --- test mode
        const isCorrect = userGuess === correctAnswer;
        setAnswered(true);
        setFeedback(isCorrect ? 'Correct! 🥳' : 'Incorrect 😫');
        setTestScore(s => ({
            correct: s.correct + (isCorrect ? 1 : 0),
            total: s.total + 1,
        }));

        if (advanceRef.current) clearTimeout(advanceRef.current);
        const delayMs = isCorrect ? 800 : 2000;
        advanceRef.current = setTimeout(advanceTest, delayMs);
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
                                placeholder=''
                                autoComplete='off'
                                onChange={(e) => setGuess(e.target.value)}
                                disabled={answered && isTest}
                            />

                        </div>
                    </form>
                    
                    <div>
                        <button onClick={prevCard}>Prev State</button>
                        <button onClick={nextCard}>Next State</button>
                        <button onClick={handleFlip}>Flip Card</button>
                        <button onClick={checkGuess}>Submit</button>
                        <div className="states-test-button">
                        {!isTest ? (
                            <button onClick={startTest}>Take Test</button>
                        ) : (
                            <button onClick={finishTest}>Quit Test</button>
                        )}
                    </div>

                    </div>

                    {!isTest && (
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
                    )}
                    <div
                        className={`guess-feedback ${feedback.startsWith('Correct') ? 'is-correct' : feedback ? 'is-wrong' : ''}`}
                        aria-live="polite"
                    >
                        {feedback}
                    </div>

                    {!isTest && (
                    <div className='state-counter'>
                        {currentIndex + 1}/{statesData.length}
                    </div>
                    )}

                </div>

                <div className='states-display'>
                    <div className='states-card' onClick={!isTest ? handleFlip : undefined}>

                        <Card
                            front={<img src={statesData[currentIndex].image} alt={statesData[currentIndex].name} />}
                            back={
                                <div className='states-back-content'>
                                    <img src={statesData[currentIndex].image} alt={statesData[currentIndex].name} />
                                    <div className='states-back-text'>{statesData[currentIndex].name}</div>
                                </div>
                            }
                            isFlipped={isTest ? false : isFlipped} // locked during a test no cheating
                        />
                    </div>
                </div>
            </section >
        </>
    );
}