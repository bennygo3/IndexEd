import React, { useState, useEffect, useRef, useCallback } from 'react';
import './snake.css';

export default function Snake() {
    
    const [snake, setSnake] = useState([
        { x: 2, y: 2 },
        { x: 2, y: 1 },
    ]);

    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState({ x: 0, y: 1 });
    const [gameOver, setGameOver] = useState(false);
    
    const boardSize = 10;

    // This updated the game state every 200ms
    useInterval(() => {
        if (!gameOver) {
            moveSnake();
        }
    }, 200);

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || ateItself(head, newSnake)) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            setFood(generateFood(newSnake));
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    const ateItself = (head, snake) => {
        for (const segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                return true;
            }
        }
        return false;
    };

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

    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case 'ArrowUp':
                if(direction.y === 0) setDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
                if(direction.y === 0) setDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
                if(direction.x === 0) setDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
                if(direction.x === 0) setDirection({ x: 1, y: 0});
                break;
            default:
                break;
        }
    }, [direction]);

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
        <div className='snake-board'>
            {Array.from({ length: boardSize }).map((_, row) => (
                <div key={row} className='row'>
                    {Array.from({ length: boardSize }).map((_, col) => (
                        <div key= {col} className={
                            `cell ${
                                snake.some(segment => segment.x === col && segment.y === row)
                                ? 'snake'
                                : food.x === col && food.y === row
                                ? 'food'
                                : ''
                            }`}
                        />
                    ))}
                </div>
            ))}
        </div>
        {gameOver && <div className='game-over'>Game Over</div>}
    </div>
    );

    // return (
    //     <div className='snake-game'>
    //     <div className='snake-board'>
    //         {Array.from({ length: boardSize * boardSize }).map((_, index) => {
    //             const row = Math.floor(index / boardSize);
    //             const col = index % boardSize;
    //             return (
    //                 <div key={index} className={
    //                     `cell ${
    //                         snake.some(segment => segment.x === col && segment.y === row)
    //                         ? 'snake'
    //                         : food.x === col && food.y === row
    //                         ? 'food'
    //                         : ''
    //                     }`
    //                 } />
    //             );
    //         })}
    //     </div>
    //     {gameOver && <div className='game-over'>Game Over</div>}
    // </div>
    // );
};

