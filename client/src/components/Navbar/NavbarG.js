import { Link } from 'react-router-dom';
import Highlighted from '../Highlighter/Highlighter';

export default function NavbarG(){
    return (
        <>
            <nav className='navbar-g'>
                <ul>
                    <li>
                        <Highlighted 
                          color=" rgb(243,149,57)"
                        //   underline="underline red dashed 2px"
                        //   underlineOffset="3px"
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
                        <Highlighted>
                            <Link to='/card-create'>
                                Create study card
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
                </ul>

            </nav>
        </>
    );
}