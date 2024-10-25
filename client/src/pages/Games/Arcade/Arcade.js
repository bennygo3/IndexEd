import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Snake from "../Snake/Snake";
import FallDown from "../FallDown/FallDown";
import TTT from "../TTT/TTT";
import WordsPerMin from "../WPM/WordsPerMin";
import './arcade.css';

const games = [
    { name: "Snake", component: <Snake />, route: "/snake" },
    { name: "Fall Down", component: <FallDown />, route: "/falldown" },
    { name: "Tic Tac Toe", component: <TTT />, route: "/ttt" },
    { name: "Words PM", component: <WordsPerMin />, route: "/wpm"}
];

export default function Arcade() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const canvasRef = useRef(null);

    const drawGameBoy = useCallback((ctx) => {
        // need to setup ternary to adjust canvas drawing for different screen sizes
        ctx.fillStyle = "lightgray";
        ctx.beginPath(0, 0); // starts at 0,0
        
        ctx.lineTo(350, 0); // top line sets the length of x axis
        ctx.arcTo(400, 0, 400, 50, 8); // (x1, y1, x2, y2, radius) this is the top right border radius
        
        ctx.lineTo(400, 550); // right vertical line/edge
        ctx.arcTo(400, 600, 350, 600, 50); // bottom right arc
        
        ctx.lineTo(50, 600); // bottom line, starts at (350, 600) and ends 50 in from the left on x axis
        ctx.arcTo(0, 600, 0, 550, 8); // bottom left corner
        
        ctx.arcTo(0, 0, 50, 0, 8); // top left arc
        
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "gray";
        ctx.beginPath();
        
        ctx.lineTo(0, 50);  // top line
        ctx.arcTo(380, 50, 380, 60, 10);  // Top-right corner
        
        ctx.lineTo(380, 65);  // right line
        ctx.arcTo(380, 350, 50, 350, 50); // Bottom-right corner
        
        ctx.lineTo(50, 350);
        ctx.arcTo(20, 350, 50, 50, 10); // Bottom-left corner 
        
        ctx.lineTo(20, 60); // left line
        ctx.arcTo(20, 50, 350, 50, 10); // Top-left corner

        ctx.closePath();
        ctx.fill();

        // Directional pad
        ctx.fillStyle = "black";
        // up and down d-pad (x, y, width, height)
        ctx.fillRect(101, 425, 25, 80);
        // left and right d-pad
        ctx.fillRect(73, 451, 80, 25);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGameBoy(ctx);
    }, [drawGameBoy]);

    const handleCanvasClick = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;

        console.log(`Clicked at X: ${offsetX}, Y:${offsetY}`)
        // up directional pad clicked
        if (offsetX >= 101 && offsetX <= 126 && offsetY >= 425 && offsetY <= 450) {
            handleUpClick();
        }
        // down directional pad clicked
        if (offsetX >= 101 && offsetX <= 126 && offsetY >= 480 && offsetY <= 505) {
            handleDownClick();
        }
        // left directional pad clicked
        if (offsetX >= 74 && offsetX <= 99 && offsetY >= 451 && offsetY <= 476) {
            handleUpClick();
        }
        // right directional clicked
        if (offsetX >= 129 && offsetX <= 154 && offsetY >= 451 && offsetY <= 476) {
            handleDownClick();
        }
    };

    const handleMouse = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;

        const isOverUp = offsetX >= 101 && offsetX <= 126 && offsetY >= 425 && offsetY <= 450;
        const isOverDown = offsetX >= 101 && offsetX <= 126 && offsetY >= 480 && offsetY <= 505;
        const isOverLeft = offsetX >= 73 && offsetX <= 98 && offsetY >= 451 && offsetY <= 476;
        const isOverRight = offsetX >= 129 && offsetX <= 154 && offsetY >= 451 && offsetY <= 476;

        if (isOverUp || isOverDown || isOverLeft || isOverRight) {
            canvasRef.current.style.cursor = "pointer";
        } else {
            canvasRef.current.style.cursor = "default";
        }
    };

    const handleUpClick = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? games.length - 1 : prevIndex - 1);
    };

    const handleDownClick = () => {
        setCurrentIndex((prevIndex) => prevIndex === games.length - 1 ? 0 : prevIndex + 1);
    };

    return (
        <div className="arcade-main">
            {/* <h1 className="arcade-header">
                GAMES
            </h1> */}
            <canvas
                ref={canvasRef}
                width={400}
                height={600}
                onClick={handleCanvasClick}
                onMouseMove={handleMouse}
                className="gameboy-canvas"
            />
            <ul className="games-list">
                {games.map((game, index) => (
                    <li
                        key={game.name}
                        className={index === currentIndex ? 'selected-game' : ''}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {game.route ? (
                            <Link to={game.route} className="game-link">
                                {game.name}
                            </Link>
                        ) : (
                            <span className="game-link">{game.name}</span>
                        )}
                    </li>
                ))}
            </ul>
            <Link to={games[currentIndex].route}>
                <button className="a-button">
                    A
                </button>
            </Link>
            <button className="b-button" onClick={() => alert("B button pressed")}>
                B
            </button>
        </div>
    )
}

// const drawScreen = useCallback((ctx) => {
//     ctx.fillStyle = "black";
//     ctx.fillRect(50, 85, 300, 230);

//     games.forEach((game, index) => {
//         const isSelected = index === currentIndex;

//         // Applies google video game font
//         ctx.font = isSelected ? "24px 'Press Start 2P', system-ui" : "20px 'Press Start 2P', system-ui";
//         ctx.textAlign = "left";
//         // Highlights and enlarges selected game option
//         ctx.fillStyle = isSelected ? "yellow" : "white";
//         ctx.fillText(game.name || game, 60, 100 + index * 30);
//     });
// }, [currentIndex]);
// A and B buttons
// ctx.fillStyle = "red";
// ctx.beginPath();
// ctx.arc(300, 450, 20, 0, Math.PI * 2);
// ctx.fill();
// ctx.fillStyle = "black";
// ctx.fillText("A", 295, 455);

// ctx.fillStyle = "red";
// ctx.beginPath();
// ctx.arc(250, 470, 20, 0, Math.PI * 2);
// ctx.fill();
// ctx.fillStyle = "black";
// ctx.fillText("B", 245, 475);

//     <button className="a-button" onClick={() => alert(`Navigating to: ${games[currentIndex]}`)}>
//     A
// </button>