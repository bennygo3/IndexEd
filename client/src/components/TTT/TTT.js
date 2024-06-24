import { useState } from 'react';
import './ttt.css';

function Square() {
    const [value, setValue] = useState(null);
    
    function handleClick() {
        setValue('X');
    }
    
    return (
        <button
            className='square'
            onClick={handleClick}
        >
            {value}
        </button>
    );
}

export default function Board() {
    return (
        <section className = 'board-body'>
            <div className='board-row'>
                <Square />
                <Square />
                <Square />
            </div>
            <div className='board-row'>
                <Square />
                <Square />
                <Square />
            </div>
            <div className='board-row'>
                <Square />
                <Square />
                <Square />
            </div>
        </section>
    )
}