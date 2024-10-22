import { Link } from 'react-router-dom';
import Highlighted from '../Highlighter/Highlighter';

export default function NavbarMSC(){
    return (
        <>
            <nav id='navbar-msc'>
                <ul>
                    <li>
                        <Highlighted 
                          color=" rgb(243,149,57)"
                        >
                            <Link to="/">
                                Home
                            </Link>
                        </Highlighted>
                    </li>
                    <li>
                        <Highlighted >
                            <Link to='/card-create'>
                                Create a new card
                            </Link>
                        </Highlighted>
                    </li>
                    <li>
                        <Highlighted color="hotpink">
                            <Link to="/trivia">
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