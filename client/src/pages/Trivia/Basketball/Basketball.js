import React, { useEffect, useRef } from 'react';
import './basketball.css';

export default function Basketball() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current; 
        const context = canvas.getContext('2d');
        
        let animationId;

        // changes

        let x = canvas.width / 2; // start at the center of the canvas
        let y = canvas.height / 2;

        let dx = (Math.random() - 0.5) * 2; // sets the randomized x velo
        let dy = (Math.random() - 0.5) * 2;

        const ballRadius = 75;

        let angle = 0;
        let rotationSpeed = 0;
        
        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas before the drawing of each (new) frame of the animation

            // update ball position
            x += dx;
            y += dy;

            //update rotation
            angle += rotationSpeed;

            context.save();

            context.translate(x, y);
            context.rotate(angle);

            context.strokeStyle = 'black';
            context.lineWidth = 4;;

            // draws the basketball
            context.beginPath();
            context.arc(0, 0, ballRadius, 0, Math.PI * 2); // draws a complete circle
            context.fillStyle = 'orange';
            context.fill();
            context.lineWidth = 5;
            context.stroke();

            // horizontal line
            context.beginPath();
            context.moveTo(-ballRadius, 0);
            context.lineTo(ballRadius, 0);
            context.stroke();

            // vertical line
            context.beginPath();
            context.moveTo(0, -ballRadius);
            context.lineTo(0, ballRadius);
            // context.moveTo(x, y - ballRadius);
            // context.lineTo(x, y + ballRadius);
            context.stroke();

            // curve 1
            context.save();
            context.beginPath();

            context.arc(0, 0, ballRadius, 0, Math.PI * 2);
            context.clip();

            context.beginPath();
            context.ellipse(
                -ballRadius * 0.80,
                0,
                ballRadius * 0.45,
                ballRadius * 1.05,
                0,
                -0.45 * Math.PI,
                0.45 * Math.PI
            );
            context.stroke();
            context.restore();

            // curve 2
            context.save();

            context.beginPath();
            context.arc(0, 0, ballRadius, 0, Math.PI * 2);
            context.clip();

            context.beginPath();
            context.ellipse(
                ballRadius * 0.80, 
                0, 
                ballRadius * 0.45, 
                ballRadius * 1.05,
                0, 
                0.55 * Math.PI, 
                1.45 * Math.PI 
            );

            context.stroke();

            context.restore();

            context.restore();

            // x += dx; // updates x position
            // y += dy;

            if (x + ballRadius > canvas.width || x - ballRadius < 0) {
                dx = -dx; // reverses x direction when hitting the canvas edge

                rotationSpeed += (Math.random() - 0.5) * 0.01;

                rotationSpeed = Math.max(
                    -0.04,
                    Math.min(rotationSpeed, 0.04)
                );
            }

            if (y + ballRadius > canvas.height || y - ballRadius < 0) {
                dy = -dy; // reverses y

                rotationSpeed += (Math.random() - 0.5) * 0.01;

                rotationSpeed = Math.max(
                    -0.04,
                    Math.min(rotationSpeed, 0.04)
                );
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