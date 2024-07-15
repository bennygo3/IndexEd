import React from 'react';
import './scoreboard.css';

//   _0_
// 1|   |2
//  |_3_|
// 4|   |5
//  |_6_|

export default function Scoreboard({ currentScore, label }) {
    const segmentPatterns = {
        '0': [true, true, true, true, true, true, false],
        '1': [false, true, true, false, false, false, false],
        '2': [true, true, false, true, true, false, true],
        '3': [true, true, true, true, false, false, true],
        '4': [false, true, true, false, false, true, true],
        '5': [true, false, true, true, false, true, true],
        '6': [true, false, true, true, true, true, true],
        '7': [true, true, true, false, false, false, false],
        '8': [true, true, true, true, true, true, true],
        '9': [true, true, true, true, false, true, true],
        ':': [false, false, false, true, false, false, true],
        '.': [false, false, false, false, false, false, true]
    };

    const renderDigit = (digit, type) => {
        // Array(7).fill(false) fallback creates a backup pattern
        const scoreSegments = segmentPatterns[digit] || Array(7).fill(false);
        const digitClass = type === 'short' ? 'digit short' : 'digit';

        return (
            <div className={digitClass}>
                <div className={`segment segment-0 ${scoreSegments[0] ? 'on' : ''}`}></div>
                <div className={`segment segment-1 ${scoreSegments[1] ? 'on' : ''}`}></div>
                <div className={`segment segment-2 ${scoreSegments[2] ? 'on' : ''}`}></div>
                <div className={`segment segment-3 ${scoreSegments[3] ? 'on' : ''}`}></div>
                <div className={`segment segment-4 ${scoreSegments[4] ? 'on' : ''}`}></div>
                <div className={`segment segment-5 ${scoreSegments[5] ? 'on' : ''}`}></div>
                <div className={`segment segment-6 ${scoreSegments[6] ? 'on' : ''}`}></div>
            </div>
        );
    };

    return (
        <div className="scoreboard">
            <div className='score-section'>
                <div className='score'>
                    {currentScore.split('').map((digit, index) => (
                        <div key={index} className='digit-container'>
                            {renderDigit(digit)}
                        </div>
                    ))}
                </div>
                <div className='label'>{label}</div>
            </div>
        </div>
    );
}

        // <div className="scoreboard">
        //     <div className='score-section'>
        //         <div className='score'>
        //             {String(currentScore).split('').map((digit, index) => (
        //                 <div key={index} className='digit-container'>
        //                     {renderDigit(digit)}
        //                 </div>
        //             ))}
        //         </div>
        //         <div className='label'>SCORE</div>
        //     </div>
        // </div>