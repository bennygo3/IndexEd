import React, { useState } from 'react';
import './CardCreate.css';
import Navbar from '../../components/Navbar/Navbar.js';

const CardCreate = () => {
    const [value, setValue] = useState('');

    
    return(
        <>
            <header className="cardCreate-header">
                <h1>Create A New Card</h1>
                <Navbar className="navBar-CC" />
            </header>
            
            <div className="redLine-CC"></div>

            <button>Create!</button>

        </>
    )
}

export default CardCreate