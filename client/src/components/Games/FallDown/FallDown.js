import { useState, useEffect } from 'react';
import './fall-down.css';

function Ball({ x, y }) {
    return <div className='ball' style={{ left: x, top: y }} />
}

function Floor({ x, y }) {
    return <div className='floor' style={{ left: x, top: y }} />
}

export default function FallDown() {
    const [ballX, setBallX] = useState(50);
    const [ballY, setBallY] = useState(1);
    const [floors, setFloor] = useState([{ x: 0, y: 100 }, { x: 50, y: 200 }]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') setBallX((prev) => Math.max(0, prev - 10));
            if (e.key === 'ArrowRight') setBallX((prev) => Math.min(90, prev + 10));
        };

        window.addEventListener('keydown', handleKeyDown);

        const interval = setInterval(() => {
            setBallY((prev) => prev + 2);
            setFloor((prev) => 
            prev.map((floor) => ({ ...floor, y: floor.y - 2 }))
        );

        // implement if ball collides with barriers here

        if (ballY > 100) setGameOver(true);
        }, 50);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, [ballY, floors]);

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

