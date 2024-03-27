import React, { useContext } from 'react';
import './CardCreate.css';
import NavbarCC from '../../components/Navbar/NavbarCC';


const CardCreate = () => {
   

    return(
        <>
            <header className="cardCreate-header">
                <h1>Create A <br></br>New Card</h1>
                <NavbarCC />
            </header>
            
            <div className="redLine-CC"></div>

            <button>Create!</button>

        </>
    )
}

export default CardCreate