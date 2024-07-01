import { useState, useEffect } from 'react';
import './fall-down.css';

function Ball({ x, y }) {
    return <div className='ball' style={{ left: `${x}%`, top: `${y}%` }} />;
}

function Floor({ x, y, holeX }) {
    return (
        <div className='floor' style={{ left: `${x}%`, top: `${y}%` }}>
            <div className='hole' style={{ left: `${holeX}%` }}></div>
        </div>
    );
}

export default function FallDown() {
    const [ballX, setBallX] = useState(50);
    const [ballY, setBallY] = useState(90);
    const [moveLeft, setMoveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(false);
    const [floors, setFloors] = useState([{ x: 0, y: 100, holeX: 50 }]);
    const [gameOver, setGameOver] = useState(false);
    const [onFloor, setOnFloor] = useState(false);
    const [startFall, setPauseFall] = useState(false);

    const generateRandomFloor = () => {
        //sets a random hole position between 0% and 90%
        const holeX = Math.floor(Math.random() * 80);
        return { x: 0, y: 100, holeX };
    };

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

        let interval;
        if (startFall) {
            interval = setInterval(() => {
                setBallY((prev) => {
                    if (onFloor) return Math.max(0, prev - 2);
                    return Math.min(90, prev + 2);
                });
                if (moveLeft) {
                    setBallX((prev) => Math.max(0, prev - 2));
                }
                if (moveRight) {
                    setBallX((prev) => Math.min(90, prev + 2));
                }

                setFloors((prev) => {
                    const newFloors = prev.map((floor) => ({
                        ...floor, y: floor.y - 2
                    }));
                    if (newFloors.length === 0 || newFloors[newFloors.length - 1].y < 80) {
                        newFloors.push(generateRandomFloor());
                    }
                    return newFloors.filter((floor) => floor.y > 0);
                });

                setOnFloor(false);
                floors.forEach((floor) => {
                    if (
                        ballY >= floor.y - 2 &&
                        ballY <= floor.y + 2 &&
                        ballX >= floor.holeX &&
                        ballX <= floor.holeX + 20
                    ) {
                        setOnFloor(true);
                    }
                });

                if (ballY <= 0) setGameOver(true);
            }, 50);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(interval);
        };
    }, [moveLeft, moveRight, onFloor, floors, ballX, ballY, startFall]);

    const startGame = () => {
        setFloors([generateRandomFloor()]);
        setBallX(50);
        setBallY(90);
        setGameOver(false);
        setPauseFall(true);
    };

    const stopGame = () => {
        setPauseFall(false);
    }

    if (gameOver) return (
        <div>
            <div>Game Over</div>;
            <button onClick={startFall}>Pause</button>
        </div>
    );

    return (
        <div className='fd'>
            <button onClick={startGame} disabled={startFall}>Start</button>
            <button onClick={stopGame} disabled={!startFall}>Stop</button>
            <div className='fd-game'>
                <Ball x={ballX} y={ballY} />
                {floors.map((floor, index) => (
                    <Floor key={index} x={floor.x} y={floor.y} holeX={floor.holeX} />
                ))}
            </div>
        </div>
    );
}


// const interval = setInterval(() => {
//     if (onFloor) {
//         setBallY((prev) => prev - 2);
//     } else {
//         setBallY((prev) => prev + 2);
//     }

//     if (moveLeft) {
//         setBallX((prev) => Math.max(0, prev - 2))
//     }
//     if (moveRight) {
//         setBallX((prev) => Math.min(90, prev + 2))
//     }

//     setFloors((prev) => {
//         const newFloors = prev.map((floor) => ({ ... floor, y: floor.y - 2 }));
//         if (newFloors.length === 0 || newFloors[newFloors.length - 1].y < 90) {
//             newFloors.push(generateRandomFloor());
//         }
//         return newFloors.filter((floor) => floor.y > 0);
//     });

//     setOnFloor(false);
//     floors.forEach((floor) => {
//         if (
//             ballY >= floor.y - 2 &&
//             ballY <= floor.y &&
//             ballX >= floor.holeX &&
//             ballX <= floor.holeX + 20
//         ) {
//             setOnFloor(true);
//         }
//     });


