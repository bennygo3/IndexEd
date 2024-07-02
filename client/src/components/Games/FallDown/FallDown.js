import { useState, useEffect, useRef, useCallback } from 'react';
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
    const [floors, setFloors] = useState([{ x: 0, y: 98, holeX: 50 }]);
    const [gameOver, setGameOver] = useState(false);
    const [onFloor, setOnFloor] = useState(false);
    const [paused, setPaused] = useState(false);

    const generateRandomFloor = () => {
        const holeX = Math.floor(Math.random() * 90);
        return { x: 0, y: 100, holeX };
    };

    const moveBall = useCallback(() => {
        setBallY((prev) => {
            if (onFloor) return Math.max(0, prev - 2);
            return Math.min(90, prev + 2);
        });
        setBallX((prev) => {
            if (moveLeft) return Math.max(0, prev - 4);
            if (moveRight) return Math.min(90, prev + 4);
            return prev;
        });
    }, [onFloor, moveLeft, moveRight]);

    const moveFloors = useCallback(() => {
        setFloors((prevFloors) => {
            const newFloors = prevFloors.map((floor) => ({
                ...floor, y: floor.y - 2
            }));
            if (newFloors.length === 0 || newFloors[newFloors.length - 1].y < 80) {
                newFloors.push(generateRandomFloor());
            }
            return newFloors.filter((floor) => floor.y > -10)
        });

        setOnFloor(false);
        setFloors((prevFloors) => {
            prevFloors.forEach((floor) => {
                if (
                    ballY >= floor.y - 2 &&
                    ballY <= floor.y + 2 &&
                    !(ballX >= floor.holeX && ballX <= floor.holeX + 20)
                ) {
                    setOnFloor(true);
                }
            });
            return prevFloors;
        });

        if (ballY <= 0) setGameOver(true);
    }, [ballX, ballY]);

    const gameLoop = useCallback(() => {
        if (!paused) {
            moveBall();
            moveFloors();
        }
    }, [paused, moveBall, moveFloors])

    useInterval(gameLoop, !paused ? 120 : null);

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

    const startGame = () => {
        setFloors([generateRandomFloor()]);
        setBallX(50);
        setBallY(90);
        setGameOver(false);
        setPaused(false);
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
            <button onClick={startGame} disabled={!paused}>Start</button>
            <button onClick={stopGame} disabled={paused}>Stop</button>
            <div className='fd-game'>
                <Ball x={ballX} y={ballY} />
                {floors.map((floor, index) => (
                    <Floor key={index} x={floor.x} y={floor.y} holeX={floor.holeX} />
                ))}
            </div>
            <div>{paused ? 'Paused' : 'Running'}</div>
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

// export default function FallDown() {
//     const [ballX, setBallX] = useState(50);
//     const [ballY, setBallY] = useState(90);
//     const [moveLeft, setMoveLeft] = useState(false);
//     const [moveRight, setMoveRight] = useState(false);
//     const [floors, setFloors] = useState([{ x: 0, y: 98, holeX: 50 }]);
//     const [gameOver, setGameOver] = useState(false);
//     const [onFloor, setOnFloor] = useState(false);
//     const [paused, setPaused] = useState(false);

//     const generateRandomFloor = () => {
//         const holeX = Math.floor(Math.random() * 80);
//         return { x: 0, y: 100, holeX };
//     };

//     const moveBall = useCallback(() => {
//         setBallY((prev) => {
//             if (onFloor) return Math.max(0, prev - 2);
//             return Math.min(90, prev + 2);
//         });
//         if (moveLeft) {
//             setBallX((prev) => Math.max(0, prev - 4));
//         }
//         if (moveRight) {
//             setBallX((prev) => Math.min(90, prev + 4));
//         }
//     });

//     const moveFloors = () => {
//         setFloors((prev) => {
//             const newFloors = prev.map((floor) => ({
//                 ...floor, y: floor.y - 2
//             }));
//             if (newFloors.length === 0 || newFloors[newFloors.length - 1].y < 80) {
//                 newFloors.push(generateRandomFloor());
//             }
//             return newFloors.filter((floor) => floor.y > -10)
//         });

//         setOnFloor(false);
//         floors.forEach((floor) => {
//             if (
//                 ballY >= floor.y - 2 &&
//                 ballY <= floor.y + 2 &&
//                 !(ballX >= floor.holeX && ballX <= floor.holeX + 20)
//             ) {
//                 setOnFloor(true);
//             }
//         });

//         if (ballY <= 0) setGameOver(true);
//     };

//     const gameLoop = useCallback(() => {
//         if (!paused) {
//             moveBall();
//             moveFloors();
//         }
//     }, [paused, moveBall, moveLeft, moveRight, moveFloors, onFloor, floors, ballX, ballY]);

//     useInterval(gameLoop, !paused ? 120 : null);

//     const handleKeyDown = useCallback((e) => {
//         switch (e.key) {
//             case 'ArrowLeft':
//                 setMoveLeft(true);
//                 break;
//             case 'ArrowRight':
//                 setMoveRight(true);
//                 break;
//             case ' ':
//                 setPaused((prev) => !prev);
//                 break;
//             default:
//                 break;
//         }
//     }, []);

//     const handleKeyUp = useCallback((e) => {
//         switch (e.key) {
//             case 'ArrowLeft':
//                 setMoveLeft(false);
//                 break;
//             case 'ArrowRight':
//                 setMoveRight(false);
//                 break;
//             default:
//                 break;
//         }
//     }, []);

//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//         };
//     }, [handleKeyDown, handleKeyUp]);

//     const startGame = () => {
//         setFloors([generateRandomFloor()]);
//         setBallX(50);
//         setBallY(90);
//         setGameOver(false);
//         setPaused(false);
//     };

//     const stopGame = () => {
//         setPaused(true);
//     };

//     if (gameOver) return (
//         <div>
//             <div>Game Over</div>
//             <button onClick={startGame}>Restart</button>
//         </div>
//     );

//     return (
//         <div className='fd'>
//             <button onClick={startGame} disabled={!paused}>Start</button>
//             <button onClick={stopGame} disabled={paused}>Stop</button>
//             <div className='fd-game'>
//                 <Ball x={ballX} y={ballY} />
//                 {floors.map((floor, index) => (
//                     <Floor key={index} x={floor.x} y={floor.y} holeX={floor.holeX} />
//                 ))}
//             </div>
//             <div>{paused ? 'Paused' : 'Running'}</div>
//         </div>
//     );
// }

// function useInterval(callback, delay) {
//     const savedCallback = useRef();

//     useEffect(() => {
//         savedCallback.current = callback;
//     }, [callback]);

//     useEffect(() => {
//         if (delay != null) {
//             const id = setInterval(() => savedCallback.current(), delay);
//             return () => clearInterval(id);
//         }
//     }, [delay]);
// }

// setOnFloor(false);
// floors.forEach((floor) => {
//     if (
//         ballY >= floor.y - 2 &&
//         ballY <= floor.y + 2 &&
//         ballX >= floor.holeX &&
//         ballX <= floor.holeX + 20
//     ) {
//         setOnFloor(true);
//     }
// });