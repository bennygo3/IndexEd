import React, { useEffect, useRef } from 'react';
import './basketball.css';

export default function Basketball() {
    // useRef hook creates references to DOM elements
    const containerRef = useRef(null);
    const ballRef = useRef(null);
   
    useEffect(() => {
        const ball = ballRef.current;
        const container = containerRef.current;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // The next 4 lines initialize the position and velocity of the ball
        let x = Math.floor(Math.random() * (containerWidth - 200));
        let y = Math.floor(Math.random() * (containerHeight - 200));
        let vx = Math.random() * 2 + 1;
        let vy = Math.random() * 2 + 1;

        function movement() {
            requestAnimationFrame(movement);
            
            // Checks for boundary width, reverses mvmt if ball reaches boundary
            if (x + 200 > containerWidth || x < 0) vx = -vx;
            if (y + 200 > containerHeight || y < 0) vy = -vy;

            // Updates position of ball
            x += vx;
            y += vy;

            const rotAngle = (Date.now() % 3600) / 20;
 
            // Continuously created new position of the ball element
            ball.style.transform = `translate(${x}px, ${y}px) rotate(${rotAngle}deg)`;
        }
        movement();
    }, []);

    return (
        <div ref={containerRef} className='basketball-container'>
            <div ref={ballRef} className='basketball'>
                <div className='line horizontal'></div>
                <div className='line vertical'></div>
                <div className='curveR'></div>
                <div className='curveL'></div>
            </div>
        </div>
    );
}