import React from 'react';
import { Link } from 'react-router-dom';
import Highlighted from '../Highlighter/Highlighter';

export default function NavbarCC(){
    return (
        <>
            <nav className='navbar-cc'>
                <ul>
                    <li>
                        <Highlighted>
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
                            <Link to='/trivia-decks'>
                                Study trivia cards
                            </Link>
                        </Highlighted>
                    </li>
                </ul>

            </nav>
        </>
    );
}