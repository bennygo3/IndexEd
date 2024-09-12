import React from 'react';
import { Link } from 'react-router-dom';
import Highlighted from '../Highlighter/Highlighter';

export default function NavbarCC(){
    return (
        <>
            <nav className='navbar-cc'>
                <ul>
                    <li>
                        <Highlighted 
                          color="white"
                          border="solid yellow 4px"
                          underline="underline red dashed 3px"
                          underlineOffset="5px"
                        >
                            <Link to="/home">
                                Home
                            </Link>
                        </Highlighted>
                    </li>
                    <li>

                        <Highlighted color="rgb(30, 196, 255)">
                            <Link to="/my-cards">
                                My study cards
                            </Link>
                        </Highlighted>
                    </li>
                    <li>
                        <Highlighted color="hotpink">
                            <Link to="/trivia-decks">
                                Study trivia cards
                            </Link>
                        </Highlighted>
                    </li>
                    <li>
                        <Highlighted color="rgb(57, 255, 20)">
                            <Link to='/games'>
                                Games
                            </Link>
                        </Highlighted>
                    </li>
                </ul>

            </nav>
        </>
    );
}