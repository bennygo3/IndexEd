import { useState, useEffect } from 'react';
import './fall-down.css';

function Ball({ x, y }) {
    return <div className='ball' style={{ left:`${x}%`, top: `${y}%` }} />;
}

function Floor({ x, y }) {
    return <div className='floor' style={{ left: x, top: y }} />
}

export default function FallDown() {
    const [ballX, setBallX] = useState(50);
    const [ballY, setBallY] = useState(1);
    const [moveLeft, setMoveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(false);
    const [floors, setFloor] = useState([{ x: 0, y: 100 }, { x: 50, y: 200 }]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') setMoveLeft(true);
            if (e.key === 'ArrowRight') setMoveRight(true);
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft') setMoveLeft(false);
            if (e.key === 'ArrowRight') setMoveRight(false);
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const interval = setInterval(() => {
            //setBallY function is using a function to simulate falling
            setBallY((prev) => prev + 2);
            
            if (moveLeft) {
                setBallX((prev) => Math.max(0, prev - 2))
            }
            if (moveRight) {
                setBallX((prev) => Math.min(90, prev + 2))
            }

            setFloor((prev) => 
            prev.map((floor) => ({ ...floor, y: floor.y - 2 }))
        );

        // implement if ball collides with barriers here

        if (ballY <= 0) setGameOver(true);
        }, 50);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(interval);
        };
    }, [moveLeft, moveRight]);

    if (gameOver) return <div>Game Over</div>;

    return (
        <div className='fd-game'>
            <Ball x={ballX} y={ballY} />
            {floors.map((floor, index) => (
                <Floor key={index} x={floor.x} y={floor.y} />
            ))}
        </div>
    );
}

        // const handleKeyDown = (e) => {
        //     if (e.key === 'ArrowLeft') setBallX((prev) => Math.max(0, prev - 2));
        //     if (e.key === 'ArrowRight') setBallX((prev) => Math.min(90, prev + 2));
        // };

