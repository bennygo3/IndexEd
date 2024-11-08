import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import './wpm.css';

export default function WordsPerMin() {
    const [words, setWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedWord, setTypedWord] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [completedWords, setCompletedWords] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const fetchWords = async () => {
        try {
            const response = await fetch('https://random-word-api.vercel.app/api?words=20');
            const data = await response.json();
            setWords(data);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };

    useEffect(() => {
        fetchWords();
    }, []);

    const startGame = () => {
        if (!startTime) {
            setStartTime(Date.now());
        }
    };

    const handleKeyStroke = (e) => {
        const value = e.target.value;
        setTypedWord(value);

        // checks if the user typed the word correctly
        if (value === words[currentWordIndex]) {
            setCompletedWords(completedWords + 1);
            setCurrentWordIndex(currentWordIndex + 1);
            setTypedWord('');

            //end round after 20 words
            if (currentWordIndex === 19) {
                const timeTaken = (Date.now() - startTime) / 60000; // convert ms to minutes
                setWpm(Math.round(completedWords / timeTaken));
                setGameOver(true);
            }
        }
    };

    const restartGame = () => {
        setWords([]);
        setCurrentWordIndex(0);
        setTypedWord('');
        setStartTime(null);
        setCompletedWords(0);
        setWpm(0);
        setGameOver(false);
        fetchWords();
    };

    // hook used to allow y and n keystroke to reset game
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameOver) {
                if (e.key.toLowerCase() === 'y') {
                    restartGame();
                } else if (e.key.toLowerCase() === 'n') {
                    // need to figure out how to handle n. Leave screen as is?
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameOver, restartGame]);

    return (
        <main id="wpm-main">
            <header id="wpm-header">
                <h1>W.P.M.</h1>
                <div id="wpm-header-redline"></div>
                <div id="wpm-header-body">
                    <p></p>
                    <div className="wpm-header-blue"></div>
                    <p>Words Per Minute Words Per Minute Words Per Minute</p>
                    <div className="wpm-header-blue"></div>
                    <p>Words Per Minute Words Per Minute Words Per Minute</p>
                    <div className="wpm-header-blue"></div>
                    <p>Words Per Minute Words Per Minute Words Per Minute</p>
                    <div className="wpm-header-blue"></div>
                    <p>Words Per Minute Words Per Minute Words Per Minute</p>
                    <div className="wpm-header-blue"></div>
                    <p>Words Per Minute Words Per Minute Words Per Minute</p>
                    <div className="wpm-header-blue"></div>
                    <p>Words Per Minute Words Per Minute Words Per Minute</p>
                    <div className="wpm-header-blue"></div>
                    <p>Words Per Minute Words Per Minute Words Per Minute</p>
                </div>
            </header>
            <section id="wpm-index">
                <div id="wpm-index-header">
                    <p>Type the word below:</p>
                    <h2 id="wpm-word">{words[currentWordIndex]}</h2>
                </div>
                <div id="wpm-redline"></div>
                <div id="wpm-index-body">
                    <input
                        id="wpm-input"
                        type="text"
                        value={typedWord}
                        onChange={handleKeyStroke}
                        onFocus={startGame}
                        placeholder="Start typing..."
                        disabled={gameOver}
                    />
                    <div className="wpm-blue-line"></div>
                    <div className="wpm-blue-line"></div>
                    <h4>Word count: {currentWordIndex + 1}/{words.length}</h4>
                    <div className="wpm-blue-line"></div>
                    {/* <div id="wpm-score">WPM: {wpm}</div> */}
                    <div className="wpm-blue-line"></div>
                    <div id="wpm-score">WPM: {wpm}</div>
                    <div className="wpm-blue-line"></div>
                    <div className="wpm-blue-line"></div>
                    {gameOver && (
                        <p id="play-again">
                            Play again?
                            <span onClick={restartGame} style={{ cursor: 'pointer', color: 'blue' }}> Y</span> /
                            <span style={{ cursor: 'pointer', color: 'blue' }}> N</span>
                        </p>
                    )}
                    <div className="wpm-blue-line"></div>
                    <div className="wpm-blue-line"></div>
                    <div className="wpm-blue-line"></div>
                    <div className="wpm-blue-line"></div>
                    {/* <div className="wpm-blue-line"></div> */}
                </div>
                
            </section>
            <div id="wpm-navbar">
                <Navbar />
            </div>

        </main>
    );
};