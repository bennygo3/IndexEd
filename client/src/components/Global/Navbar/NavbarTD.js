import React from 'react';
import { Link } from 'react-router-dom';
import Highlighted from '../Highlighter/Highlighter';

export default function NavbarTD(){
    return (
        <>
            <nav className='navbar-td'>
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
                            <Link to='/card-create'>
                                Create a new card
                            </Link>
                        </Highlighted>
                    </li>
                </ul>

            </nav>
        </>
    );
}