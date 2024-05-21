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

        let x = Math.floor(Math.random() * (containerWidth - 100));
        let y = Math.floor(Math.random() * (containerHeight - 100));
        let vx = Math.random() * 1.5;
        let vy = Math.random() * 1.5;

        function movement() {
            requestAnimationFrame(movement);

            if (x + 100 > containerWidth || x < 0) vx = -vx;
            if (y + 100 > containerHeight || y < 0) vy = -vy;

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



// <div className='basketball'>
//     <div className='line horizontal'></div>
//     <div className='line vertical'></div>
//     <div className='curveR'></div>
//     <div className='curveL'></div>
// </div>