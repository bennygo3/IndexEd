import React, { useState, useEffect, useCallback } from 'react';
import './simon-says.css';

const colors = ['yellow', 'blue', 'green', 'red'];
// yellow = top left, blue = top right, green = bottom right, red = bottom left

export default function SimonSays() {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [isUserTurn, setIsUserTurn] = useState(false);
    const [message, setMessage] = useState('Push start to play Simon Says!')

    const startGame = () => {
        setSequence([]);
        setUserSequence([]);
        setIsUserTurn([]);
        addToSequence();
    };

    const addToSequence = useCallback(() => {
        const newColor = colors[Math.floor(Math.random() * 4)];
        const newSequence = [...sequence, newColor];
        setSequence(newSequence);
        setUserSequence([]);
        setIsUserTurn(false);
        setMessage('Simon says:');
        console.log('New sequence:', newSequence);
    },[sequence]);

    const handleColorClick = (color) => {
        if (!isUserTurn) return;
        setUserSequence([...userSequence, color]);
    }

    const checkUserSequence = useCallback(() => {
        if (userSequence.join('') === sequence.join('')) {
            setMessage('On to the next round!')
            setTimeout(addToSequence, 1000);
        } else {
            setMessage('Wrong sequence! Click start to try again.')
        }
        setIsUserTurn(false);
    },[userSequence, addToSequence, sequence]);

    useEffect(() => {
        if (sequence.length > 0 && userSequence.length === sequence.length) {
            checkUserSequence();
        }
    }, [userSequence, sequence.length, checkUserSequence]);

    const playSequence = useCallback(async () => {
        setIsUserTurn(false);
        for (let i = 0; i < sequence.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 600));
            highlightColor(sequence[i]);
            await new Promise((resolve) => setTimeout(resolve, 600));
            unhighlightColor(sequence[i]);
        }
        setIsUserTurn(true);
        setMessage('Your turn!');
    }, [sequence]);

    const highlightColor = (color) => {
        const elements = document.getElementsByClassName(color);
        for (const element of elements) {
            element.classList.add('active');
        }
    };

    const unhighlightColor = (color) => {
        const elements = document.getElementsByClassName(color);
        for (const element of elements) {
            element.classList.remove('active');
        }
    };

    useEffect(() => {
        if (sequence.length > 0) {
            playSequence();
        }
    }, [sequence, playSequence]);

    return (
        <div className = 'simon-game'>
            <div className = 'color-container'>
                {colors.map((color) => (
                    <div 
                        key={color}
            
                        className={`color${color}`}
                        onClick={() => handleColorClick(color)}
                    ></div>
                ))}
            </div>
            <div className = 'controls'>
                <button onClick = {startGame}>Start</button>
                <p>{message}</p>
            </div>
        </div>
    )

}