import React from 'react';
import './basketball.css';

export default function Basketball() {
    return (
        <div className='basketball'>
            <div className='line horizontal'></div>
            <div className='line vertical'></div>
            <div className='curveR'></div>
            <div className='curveL'></div>
        </div>
    )
}