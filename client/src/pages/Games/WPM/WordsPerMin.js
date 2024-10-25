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
        <div>
            <h1>W.P.M.</h1>
            <p>Type the words below:</p>
            <h2>{words[currentWordIndex]}</h2>
            <input 
                type="text"
                value={typedWord}
                onChange={handleKeyStroke}
                onFocus={startGame}
                placeHolder="Start typing..."
                disabled={gameOver}
            />
            <p>WPM: {wpm}</p>
        </div>
    );
};