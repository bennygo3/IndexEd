import { useState, useEffect, useRef, useCallback } from 'react';
import './fall-down.css';
import Scoreboard from '../Scoreboard/Scoreboard';

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
    const [ballX, setBallX] = useState(20);
    const [ballY, setBallY] = useState(90);
    const [moveLeft, setMoveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(false);
    const [floors, setFloors] = useState([{ x: 0, y: 98, holeX: 50 }]);
    const [gameOver, setGameOver] = useState(false);
    const [paused, setPaused] = useState(false);
    // const [score, setScore] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    const generateRandomFloor = () => {
        const holeX = Math.floor(Math.random() * 90);
        return { x: 0, y: 100, holeX };
    };

    const moveBall = useCallback(() => {
        setBallY((prev) => {
            const onFloor = floors.some(floor =>
                ballY >= floor.y - 2 &&
                ballY <= floor.y + 2 &&
                !(ballX >= floor.holeX && ballX <= floor.holeX + 10)
            );
            if (onFloor) {
                return Math.max(0, prev - 1); //ball rises if on floor
            }
            return Math.min(90, prev + 1); //ball should fall otherwise
        });
        setBallX((prev) => {
            if (moveLeft) return Math.max(0, prev - 2);
            if (moveRight) return Math.min(100 - 3, prev + 2);
            return prev;
        });
    }, [moveLeft, moveRight, ballX, ballY, floors]);

    const moveFloors = useCallback(() => {
        setFloors((prevFloors) => {
            const newFloors = prevFloors.map((floor) => ({
                ...floor, y: floor.y - 1
            }));
            if (newFloors.length === 0 || newFloors[newFloors.length - 1].y < 80) {
                newFloors.push(generateRandomFloor());
            }
            return newFloors.filter((floor) => floor.y > -10)
        });

        if (ballY <= 0) setGameOver(true);
    }, [ballY]);

    const gameLoop = useCallback(() => {
        if (!paused) {
            moveBall();
            moveFloors();
        }
    }, [paused, moveBall, moveFloors])

    useInterval(gameLoop, !paused ? 37 : null);

    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case 'ArrowLeft':
                setMoveLeft(true);
                break;
            case 'ArrowRight':
                setMoveRight(true);
                break;
            case ' ':
                setPaused((prev) => !prev);
                break;
            default:
                break;
        }
    }, []);

    const handleKeyUp = useCallback((e) => {
        switch (e.key) {
            case 'ArrowLeft':
                setMoveLeft(false);
                break;
            case 'ArrowRight':
                setMoveRight(false);
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    useEffect(() => {
        if(!paused && !gameOver) {
            const startTime = Date.now() - elapsedTime;
            const timer = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);
            return () => clearInterval(timer);
        }
    }, [paused, gameOver, elapsedTime]);

    const formatTime = (time) => {
        const milliseconds = Math.floor((time % 1000) / 10);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        // const hours = Math.floor((time / (1000 * 60 * 60)) % 24); ... ${hours}:

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${milliseconds.toString().padStart(2, '0')}`
    }

    const startGame = () => {
        setFloors([generateRandomFloor()]);
        setBallX(30);
        setBallY(90);
        setGameOver(false);
        setPaused(false);
        setElapsedTime(0);
        // setScore(0);
    };

    const stopGame = () => {
        setPaused(true);
    };

    if (gameOver) return (
        <div>
            <div>Game Over</div>
            <button onClick={startGame}>Restart</button>
        </div>
    );

    return (
        <div className='fd'>
            <Scoreboard className='scoreboardTimer' currentScore={formatTime(elapsedTime)} label="TIME" />
            <div>
            <div className='fd-game'>
                <Ball x={ballX} y={ballY} />
                {floors.map((floor, index) => (
                    <Floor key={index} x={floor.x} y={floor.y} holeX={floor.holeX} />
                ))}
            </div>
            <button onClick={startGame} disabled={!paused}>Start</button>
            <button onClick={stopGame} disabled={paused}>Stop</button>
            </div>
        </div>
    );
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay != null) {
            const id = setInterval(() => savedCallback.current(), delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

    // below is to set the score based off of time:
    // useEffect(() => {
    //     if (!paused && !gameOver) {
    //         const timer = setInterval(() => {
    //             setElapsedTime(prev => prev + 1);
    //             setScore(prev => prev + 1);
    //         }, 1000);
    //         return () => clearInterval(timer);
    //     }
    // }, [paused, gameOver]);

    // useEffect(() => {
    //     if (elapsedTime > 0 && !paused && !gameOver) {
    //         setScore(elapsedTime);
    //     }
    // }, [elapsedTime, paused, gameOver]);