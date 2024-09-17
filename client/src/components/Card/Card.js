import React from 'react';

export default function Card({ front, back, isFlipped }) {
    return (
        <div className='card'>
            {isFlipped ? (
                <div className='card-back'>
                    <div>{back}</div>
                </div>
            ) : (
                <div className='card-front'>{front}</div>
            )}
        </div>
    );
}