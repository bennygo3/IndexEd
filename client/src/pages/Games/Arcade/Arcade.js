import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Snake from "../Snake/Snake";
import FallDown from "../FallDown/FallDown";
import TTT from "../TTT/TTT";
import './arcade.css';

const games = [
    { name: "Snake", component: <Snake />, route: "/snake" }, 
    { name: "Fall Down", component: <FallDown />, route: "/falldown"}, 
    { name: "Tic Tac Toe", component: <TTT />, route:"ttt"}
];

export default function Arcade() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const canvasRef = useRef(null);

    const drawGameBoy = useCallback((ctx) => {
        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(400,0);
        ctx.lineTo(400,550);
        ctx.arcTo(400, 600, 350, 600, 50);
        ctx.lineTo(0, 600);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "darkgray";
        ctx.fillRect(50, 50, 300, 300) // Screen

        // Directional pad
        ctx.fillStyle = "black";
        // up and down d-pad
        ctx.fillRect(101, 425, 25, 80);
        // left and right d-pad
        ctx.fillRect(74, 451, 80, 25);
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
            <button className="a-button" onClick={() => alert(`Navigating to: ${games[currentIndex]}`)}>
                A
            </button>
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