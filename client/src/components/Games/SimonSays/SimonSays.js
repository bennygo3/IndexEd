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
            setMessage('On to the next round!')
            setTimeout(addToSequence, 1000);
        } else {
            setMessage('Wrong sequence! Click start to try again.')
        }
        setIsUserTurn(false);
    };

    const playSequence = async () => {
        setIsUserTurn(false);
        for (let i = 0; i < sequence.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 600));
            highlightColor(sequence[i]);
            await new Promise((resolve) => setTimeout(resolve, 600));
            unhighlightColor(sequence[i]);
        }
        setIsUserTurn(true);
        setMessage('Your turn!');
    };

    const highlightColor = (color) => {
        document.getElementById(color).classList.add('active');
    };

    const unhighlightColor = (color) => {
        document.getElementById(color).classList.remove('active');
    };

    useEffect(() => {
        if (sequence.length > 0) {
            playSequence();
        }
    }, [sequence]);

    return (
        <>
        </>
    )

}