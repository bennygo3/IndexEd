import React, { useEffect, useRef, useState } from "react";

const games = ["Game 1", "Game 2", "Game 3", "Game 4"];

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
        const canvas = canvasRef.current;
        const { offsetX, offsetY } = event.nativeEvent
    }
}