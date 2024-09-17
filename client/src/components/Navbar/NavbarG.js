import { Link } from 'react-router-dom';
import Highlighted from '../Highlighter/Highlighter';

export default function NavbarG(){
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
                            <Link to='/trivia'>
                                Study trivia cards
                            </Link>
                        </Highlighted>
                    </li>
                    <li>
                        <Highlighted>
                            <Link to='/card-create'>
                                Create study card
                            </Link>
                        </Highlighted>
                    </li>
                </ul>

            </nav>
        </>
    );
}