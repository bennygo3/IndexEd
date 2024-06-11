import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_HIGH_SNAKE_SCORE } from '../../utils/queries';
import { UPDATE_HIGH_SNAKE_SCORE } from '../../utils/mutations';
import authService from '../../utils/auth';
import './snake.css';
import Scoreboard from '../Scoreboard/Scoreboard.js';

export default function Snake() {
    // const userId = authService.getUserIdFromToken();
    const [userId, setUserId] = useState(null);
    const { data, refetch } = useQuery(GET_HIGH_SNAKE_SCORE, {
        variables: { userId },
        skip: !userId,
    });
    const [updateHighSnakeScore] = useMutation(UPDATE_HIGH_SNAKE_SCORE);

    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState({ x: 0, y: 1 });
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [snake, setSnake] = useState([
        { x: 1, y: 2 },
        { x: 1, y: 1 },
    ]);

    const boardSize = 20;

    useInterval(() => {
        if (!gameOver && gameStarted) {
            moveSnake();
        }
    }, 200);

    const startGame = useCallback(() => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setSnake([
            { x: 1, y: 2 },
            { x: 1, y: 1 },
        ]);
        setFood({ x: 5, y: 5 });
        setDirection({ x: 0, y: 1 });
    }, []);

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
        console.log(`Snake head position: (${head.x}, ${head.y})`);
        if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || ateItself(head, newSnake)) {
            // setGameOver(true);
            // setGameStarted(false);
            handleGameOver();
            return;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            setFood(generateFood(newSnake));
            setScore(score + 1);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    const ateItself = (head, snake) => {
        for (const segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                // handleGameOver();
                // console.log(`Self-collision detected at position: (${head.x}, ${head.y})`);
                return true;
            }
        }
        return false;
    };

    const handleGameOver = async () => {
        console.log('Game over. Final score:', score, 'High score:', highScore);
        setGameOver(true);
        setGameStarted(false);
        if (userId) {
            try {
                if (score > highScore) {
                    console.log('Updating high score with userId:', userId, 'and newScore:', score);
                    await updateHighSnakeScore({ variables: { userId, newSnakeScore: score } });
                    refetch();
                } else {
                    console.log('Score:', score, 'is not higher than the current high score:', highScore);
                }
            } catch (error) {
                console.error('Error updating high score:', error);
            }
        }
    };

    useEffect(() => {
        const id = authService.getUserIdFromToken();
        setUserId(id);
    }, []);

    useEffect(() => {
        if (data) {
            console.log(`Fetched high score from server: ${data.getHighSnakeScore.highSnakeScore}`);
            setHighScore(data.getHighSnakeScore.highSnakeScore);
        }
    }, [data]);

    const generateFood = (snake) => {
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * boardSize),
                y: Math.floor(Math.random() * boardSize),
            };
            if (!ateItself(newFood, snake)) break;
        }
        return newFood;
    };

    const toggleGame = useCallback(() => {
        if (gameOver) {
            startGame();
        } else {
            setGameStarted(prev => !prev);
        }
    }, [gameOver, startGame]);

    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (direction.y === 0) setDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
                if (direction.y === 0) setDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
                if (direction.x === 0) setDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
                if (direction.x === 0) setDirection({ x: 1, y: 0 });
                break;
            case ' ':
                toggleGame();
                break;
            default:
                break;
        }
    }, [direction, toggleGame]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                const id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }



    return (
        <div className='snake-game'>
            {/* <div className='score-board'>Score: {score}</div> */}
            <Scoreboard currentScore={score} />
            <div className='high-score'>
                High Score: {highScore}
            </div>
            <div className='snake-board'>
                {Array.from({ length: boardSize }).map((_, row) => (
                    <div key={row} className='row'>
                        {Array.from({ length: boardSize }).map((_, col) => {
                            const isSnakeSegment = snake.some(segment => segment.x === col && segment.y === row);
                            const isFood = food.x === col && food.y === row;
                            const isSnakeHead = snake[0].x === col && snake[0].y === row;
                            const snakeHeadDirection = isSnakeHead
                                ? direction.x === 1
                                    ? 'right'
                                    : direction.x === -1
                                        ? 'left'
                                        : direction.y === 1
                                            ? 'down'
                                            : 'up'
                                : '';
                            return (
                                <div
                                    key={col}
                                    className={`cell ${isSnakeHead ? `head ${snakeHeadDirection}` : isSnakeSegment ? 'snake' : isFood ? 'food' : ''}`}
                                >
                                    {isSnakeHead && <><div className='eye'></div> <div className='eyeTwo'></div></>}
                                    {isFood && '🌭'}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            {gameOver && <div className='game-over'>Game Over</div>}

            <button
                className={`start-button ${gameStarted && !gameOver ? 'hidden' : ''}`}
                onClick={startGame}>
                Start Game
            </button>

        </div>
    );

};
