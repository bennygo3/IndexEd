import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import Home from "../../pages/Home/Home";
import User from "../../pages/User";
import CreateDeck from "../../pages/NewDeck";

const Navbar = () => {

  return (
    <div className="navbar-home">
      <ul className="nav-list">
        <li>
          <Link to="/card-create">
            Create study card
          </Link>
        </li>
        <li>
          <Link to="/my-cards">
            Study my cards
          </Link>
        </li>
        <li>
          <Link to='/study-random'>
            Study random cards
          </Link>
        </li>
      </ul>
    </div>
  );

}


export default Navbar;