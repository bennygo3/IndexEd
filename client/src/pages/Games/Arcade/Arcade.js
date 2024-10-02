import React, { useEffect, useRef, useState } from "react";
import Snake from "../Snake/Snake";
import FallDown from "../FallDown/FallDown";
import TTT from "../TTT/TTT";

const games = [
    { name: "Snake", component: <Snake /> }, 
    { name: "Fall Down", component: <FallDown />}, 
    { name: "Tic Tac Toe", component: <TTT />}, 
    "Game 4"
];

export default function Arcade() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawArcadeBody(ctx);

        drawScreen(ctx, games[currentIndex]);

        drawJoysticks(ctx);

        drawButtons(ctx);
    }, [currentIndex]);

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? games.length - 1 : prevIndex - 1
        );
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === games.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleCanvasClick = (event) => {
        // const canvas = canvasRef.current;
        const { offsetX, offsetY } = event.nativeEvent;

        // check if the left joystick is clicked
        if (offsetX >= 50 && offsetX <= 100 && offsetY >= 400 && offsetY <= 450) {
            handleLeftClick();
        }

        if (offsetX >= 300 && offsetX <= 350 && offsetY >= 400 && offsetY <= 450) {
            handleRightClick();
        }
    };

    const drawArcadeBody = (ctx) => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 400, 600);

        ctx.fillStyle = "red";
        ctx.fillRect(10, 10, 380, 580);
    };

    const drawScreen = (ctx, game) => {
        ctx.fillStyle = "black";
        ctx.fillRect(50, 100, 300, 200);

        ctx.fillStyle = "white";
        ctx.font = "20px ArcadeFont";
        ctx.fillText(game.name, 150, 200);
    };

    const drawJoysticks = (ctx) => {
        // Left joystick
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(75, 425, 25, 0, Math.PI * 2);
        ctx.fill();

        //Right joystick
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(325, 425, 25, 0, Math.PI * 2);
        ctx.fill();
    };

    const drawButtons = (ctx) => {
        // Left button
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(125, 475, 15, 0, Math.PI * 2);
        ctx.fill();

        // Right button
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(275, 475, 15, 0, Math.PI * 2);
        ctx.fill();
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", fontFamily: "ArcadeFont", color: "yellow" }}>
                GAMES
            </h1>
            <canvas 
                ref={canvasRef}
                width={400}
                height={600}
                onClick={handleCanvasClick}
                style={{ border: "2px solid black", display: "block", margin: "0 auto" }}
            />
        </div>
    )
}