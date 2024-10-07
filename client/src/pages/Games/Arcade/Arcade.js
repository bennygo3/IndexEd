import React, { useEffect, useRef, useState, useCallback } from "react";
import Snake from "../Snake/Snake";
import FallDown from "../FallDown/FallDown";
import TTT from "../TTT/TTT";
import './arcade.css';

const games = [
    { name: "Snake", component: <Snake /> }, 
    { name: "Fall Down", component: <FallDown />}, 
    { name: "Tic Tac Toe", component: <TTT />}, 
    "Game 4"
];

export default function Arcade() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const canvasRef = useRef(null);

    const drawScreen = useCallback((ctx) => {
        ctx.fillStyle = "black";
        ctx.fillRect(50, 85, 300, 230);

        games.forEach((game, index) => {
            const isSelected = index === currentIndex;

            // Applies google video game font
            ctx.font = isSelected ? "24px 'Press Start 2P', system-ui" : "20px 'Press Start 2P', system-ui";
            ctx.textAlign = "left";
            // Highlights and enlarges selected game option
            ctx.fillStyle = isSelected ? "yellow" : "white";
            ctx.fillText(game.name || game, 60, 100 + index * 30);
        });
    }, [currentIndex]);

    const drawGameBoy = useCallback((ctx) => {
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, 400, 600);

        ctx.fillStyle = "darkgray";
        ctx.fillRect(50, 50, 300, 300) // Screen

        // Directional pad
        drawDirectionalPad(ctx);
    }, []);

    const drawDirectionalPad = (ctx) => {
        ctx.fillStyle = "black";
        // up and down d-pad
        ctx.fillRect(101, 425, 25, 80);
        // left and right d-pad
        ctx.fillRect(74, 451, 80, 25);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGameBoy(ctx);

        drawScreen(ctx);
    }, [currentIndex, drawGameBoy, drawScreen]);

    const handleCanvasClick = (event) => {
        // const canvas = canvasRef.current;
        const { offsetX, offsetY } = event.nativeEvent;

        // check if the A is clicked
        if (offsetX >= 280 && offsetX <= 320 && offsetY >= 430 && offsetY <= 470) {
            window.alert(`Navigating to: ${games[currentIndex].name || games[currentIndex]}`);
        }
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
                style={{ border: "2px solid black", display: "block", margin: "0 auto" }}
            />
            <button className="a-button" onClick={() => alert("A button pressed")}>
                A
            </button>
            <button className="b-button" onClick={() => alert("B button pressed")}>
                B
            </button>
        </div>
    )
}
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