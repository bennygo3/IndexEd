import React from 'react';
import './scoreboard.css';

//   _0_
// 5|   |1
//  |_6_|
// 4|   |2
//  |_3_|

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
    };

    const renderDigit = (digit, type) => {
        if (digit === ':' || digit === '.') {
            return (
                <div className={`digit ${digit === ':' ? 'colon' : 'period'}`}>
                    <div className= 'dot'></div>
                    {digit === ':' && <div className='dot dot-bottom'></div>}
                </div>
            )
        }
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

    // const scoreString = typeof currentScore === 'string' ? currentScore : String(currentScore);
    const scoreString = String(currentScore).padStart(2, '0');

    return (
        <div className="scoreboard">
            <div className='score-section'>
            <div className='label'>{label}</div>
                <div className='score'>
                    {scoreString.split('').map((digit, index) => (
                        <div key={index} className='digit-container'>
                            {renderDigit(digit, index >= currentScore.length - 2 ? 'short' : 'normal')}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

