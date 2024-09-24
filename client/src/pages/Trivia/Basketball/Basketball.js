import React, { useEffect, useRef } from 'react';
import './basketball.css';

export default function Basketball() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        const ballRadius = 75;

        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            context.beginPath();
            context.arc(x, y, ballRadius, 0, 2 * Math.PI);
            context.fillStyle = 'orange';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = 'black';
            context.stroke();

            context.beginPath();
            context.moveTo(x - ballRadius, y);
            context.lineTo(x + ballRadius, y);
            context.lineWidth = 6;
            context.strokeStyle = 'black';
            context.stroke();

            context.beginPath();
            context.moveTo(x, y - ballRadius);
            context.lineTo(x, y + ballRadius);
            context.lineWidth = 6;
            context.strokeStyle = 'black';
            context.stroke();

            context.beginPath();
            context.arc(x, y, ballRadius * 0.97, 1.25 * Math.PI, 1.75 * Math.PI);
            context.lineWidth = 6;
            context.strokeStyle = 'black';
            context.stroke();

            context.beginPath();
            context.arc(x, y, ballRadius * 0.97, 0.25 * Math.PI, 0.75 * Math.PI);
            context.lineWidth = 7;
            context.strokeStyle = 'black';
            context.stroke();

            x += dx;
            y += dy;

            if (x + ballRadius > canvas.width || x - ballRadius < 0) {
                dx = -dx;
            }

            if (y + ballRadius > canvas.height || y - ballRadius < 0) {
                dy = -dy;
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animate);
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
//     // useRef hook creates references to DOM elements
//     const containerRef = useRef(null);
//     const ballRef = useRef(null);
   
//     useEffect(() => {
//         const ball = ballRef.current;
//         const container = containerRef.current;

//         const containerWidth = container.clientWidth;
//         const containerHeight = container.clientHeight;

//         const ballSize = 150;

//         // Initialize the position of the ball
//         let x = Math.floor(Math.random() * (containerWidth - ballSize));
//         let y = Math.floor(Math.random() * (containerHeight - ballSize));

//         // Velocity calculation
//         let vx = Math.random() * 1 + 1;
//         let vy = Math.random() * 1 + 1;

//         function movement() {
//             requestAnimationFrame(movement);
            
//             // Checks for boundary width, reverses mvmt if ball reaches boundary
//             if (x + 200 > containerWidth || x < 0) vx = -vx;
//             if (y + 200 > containerHeight || y < 0) vy = -vy;

//             // Updates position of ball
//             x += vx;
//             y += vy;

//             const rotAngle = (Date.now() % 3600) / 20;
 
//             // Continuously created new position of the ball element
//             ball.style.transform = `translate(${x}px, ${y}px) rotate(${rotAngle}deg)`;
//         }
//         movement();
//     }, []);

//     return (
//         <div ref={containerRef} className='basketball-container'>
//             <div ref={ballRef} className='basketball'>
//                 <div className='line horizontal'></div>
//                 <div className='line vertical'></div>
//                 <div className='curveR'></div>
//                 <div className='curveL'></div>
//             </div>
//         </div>
//     );
// }