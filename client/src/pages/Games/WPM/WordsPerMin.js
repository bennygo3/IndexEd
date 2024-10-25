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
    }

}