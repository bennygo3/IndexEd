import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Highlighted from '../Highlighter/Highlighter';

// import Home from "../../pages/Home/Home";
// import User from "../../pages/User";
// import CreateDeck from "../../pages/NewDeck";

const Navbar = () => {

  return (
    <div className="navbar-home">
      <ul className="nav-list">
        <li>
          <Highlighted>
          <Link to="/card-create">
            Create study card
          </Link>
          </Highlighted>
        </li>
        <li>
          <Highlighted color="#00d3ffc7">
          <Link to="/my-cards">
            My study cards
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
    </div>
  );

}


export default Navbar;