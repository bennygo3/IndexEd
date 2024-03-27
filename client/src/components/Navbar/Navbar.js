import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Highlighted from '../Highlighter/Highlighter';
// import HomeButtons from '../../components/HomeButtons/HomeButtons.js';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <nav className={`navbar-home ${theme}`}>
      <ul className="nav-list">
      <li>
          <Highlighted color="rgb(30, 196, 255)">
            <Link to="/my-cards">
            My study cards
            </Link>
          </Highlighted>
        </li>
        <li>
          <Highlighted>
            <Link to="/card-create">
            Create study card
            </Link>
          </Highlighted>
        </li>
        <li>

          <Highlighted color="hotpink">
            <Link to='/study-random'>
            Study random cards
            </Link>
          </Highlighted>
        </li>
      </ul>
    </nav>
  );

}

export default Navbar;

//notes: adding className as props to allow for various styling of the navbar comp

// const Navbar = () => {
//   return (
//     <div className="navbar-home">
//       <ul className="nav-list">
//         <li>
//           <span>Create study card:</span>
//           <HomeButtons color="yellow" to="/card-create"></HomeButtons>
          
//         </li>
//         <li>
//           <span>My study cards:</span>
//           <HomeButtons color="rgb(30, 196, 255)" to="/my-cards" />
//         </li>
//         <li>
//           <span>Study random cards:</span>
//           <HomeButtons color="hotpink" to="/study-random" />
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Navbar;