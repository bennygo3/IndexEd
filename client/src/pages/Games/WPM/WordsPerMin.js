import { useState, useEffect } from 'react';
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

    if (gameOver) {
        return (
            <div>
                <h1>Your WPM: {wpm}</h1>
            </div>
        );
    }

    return (
        <main id="wpm-main">
            <header>
                <h1>Words Per<br></br>Minute</h1>
                {/* <h1>Words Per Minute</h1> */}
            </header>
            <section className="wpm-index">
                <p>Type the word below:</p>
                <h2 id="wpm-word">{words[currentWordIndex]}</h2>
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
                <h2>Words remaining: {currentWordIndex + 1}/{words.length}</h2>
                <div className="wpm-blue-line"></div>
                <div>WPM: {wpm}</div>
                <div className="wpm-blue-line"></div>
                <div className="wpm-blue-line"></div>
                <div className="wpm-blue-line"></div>
                <div className="wpm-blue-line"></div>
                <div className="wpm-blue-line"></div>
                <div className="wpm-blue-line"></div>
                <div className="wpm-blue-line"></div>
                <div className="wpm-blue-line"></div>
                
            </section>
        </main>
    );
};