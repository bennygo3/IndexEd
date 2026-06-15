import React, { useEffect, useRef } from 'react';
import './basketball.css';

export default function Basketball() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current; 
        const context = canvas.getContext('2d');
        let animationId;

        let x = canvas.width / 2; // start at the center of the canvas
        let y = canvas.height / 2;
        let dx = (Math.random() - 0.5) * 2; // sets the randomized x velo
        let dy = (Math.random() - 0.5) * 2;
        const ballRadius = 75;

        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas before the drawing of each (new) frame of the animation

            // draws the basketball
            context.beginPath();
            context.arc(x, y, ballRadius, 0, 2 * Math.PI); // draws a complete circle
            context.fillStyle = 'orange';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = 'black';
            context.stroke();

            // horizontal line
            context.beginPath();
            context.moveTo(x - ballRadius, y);
            context.lineTo(x + ballRadius, y);
            context.lineWidth = 6;
            context.strokeStyle = 'black';
            context.stroke();

            // vertical line
            context.beginPath();
            context.moveTo(x, y - ballRadius);
            context.lineTo(x, y + ballRadius);
            context.lineWidth = 6;
            context.strokeStyle = 'black';
            context.stroke();

            // curve 1
            context.save();

            context.beginPath();
            context.arc(x, y, ballRadius, 0, 2 * Math.PI);
            context.clip();

            context.beginPath();
            context.ellipse(
                x - ballRadius * 0.55,
                y,
                ballRadius * 0.45,
                ballRadius * 1.05,
                0,
                -0.45 * Math.PI,
                0.45 * Math.PI
            );
            context.lineWidth = 5;
            context.strokeStyle = 'black';
            context.stroke();
            context.restore();

            // curve 2
            context.save();

            context.beginPath();
            context.arc(x, y, ballRadius, 0, 2 * Math.PI);
            context.clip();

            context.beginPath();
            context.ellipse(
                x + ballRadius * 0.55, 
                y, 
                ballRadius * 0.45, 
                ballRadius * 1.15,
                0, 
                0.5 * Math.PI, 
                1.5 * Math.PI
            );

            context.lineWidth = 5;
            context.strokeStyle = 'black';
            context.stroke();

            context.restore();

            x += dx; // updates x position
            y += dy;

            if (x + ballRadius > canvas.width || x - ballRadius < 0) {
                dx = -dx; // reverses x direction when hitting the canvas edge
            }

            if (y + ballRadius > canvas.height || y - ballRadius < 0) {
                dy = -dy; // reverses y
            }

           animationId = requestAnimationFrame(animate); // requests the next frame of the animation
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId); // cleanup function, when Basketball component is unmounted, the animation will stop
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef}
            width={350}
            height={350}
            style={{ border: '2px solid black' }}
        />
    );
}

/* 
context.save();
context.beginPath();
context.arc(x, y, ballRadius, 0, 2 * Math.PI);
context.clip();

context.beginPath();
context.ellipse(
    x,
    y,
    ballRadius * 1.15,
    ballRadius * 0.6,
    Math.PI / 4,
    0,
    2 * Math.PI
);
context.stroke();

context.beginPath();
context.ellipse(
    x,
    y,
    ballRadius * 1.15,
    ballRadius * 0.6,
    -Math.PI / 4,
    0,
    2 * Math.PI 
);
context.stroke();

context.restore();
*/
