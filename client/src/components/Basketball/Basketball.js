import React, { useEffect, useRef } from 'react';
import './basketball.css';

export default function Basketball() {
    const ballRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ball = ballRef.current;
        const container = containerRef.current;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        let x = Math.floor(Math.random() * (containerWidth - 200));
        let y = Math.floor(Math.random() * (containerHeight - 200));
        let vx = Math.random() * 2 + 1;
        let vy = Math.random() * 2 + 1;

        function movement() {
            requestAnimationFrame(movement);

            if (x + 200 > containerWidth || x < 0) vx = -vx;
            if (y + 200 > containerHeight || y < 0) vy = -vy;

            x += vx;
            y += vy;

            ball.style.transform = `translate(${x}px, ${y}px)`;
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
    )
}