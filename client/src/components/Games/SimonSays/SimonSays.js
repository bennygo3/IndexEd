import React, { useState, useEffect } from 'react';
import './simon-says.css';

const colors = ['yellow', 'blue', 'green', 'red'];
// yellow = top left, blue = top right, green = bottom right, red = bottom left

export default function SimonSays() {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [isUserTurn, setIsUserTurn] = useState(false);
    const [message, setMessage] = useState('Push start to play Simon Says!')

    useEffect(() => {
        if (sequence.length > 0 && userSequence.length === sequence.length) {
            checkUserSequence();
        }
    }, [userSequence]);

    const startGame = () => {
        setSequence([]);
        setUserSequence([]);
        setIsUserTurn([]);
        addToSequence();
    };

    const addToSequence = () => {
        const newColor = colors[Math.floor(Math.random() * 4)];
        setSequence([...sequence, newColor]);
        setUserSequence([]);
        setIsUserTurn(false);
        setMessage('Simon says:');
    };

    const handleColorClick = (color) => {
        if (!isUserTurn) return;
        setUserSequence([...userSequence, color]);
    }

    const checkUserSequence = () => {
        if (userSequence.join('') === sequence.join('')) {
            
        }
    }

}