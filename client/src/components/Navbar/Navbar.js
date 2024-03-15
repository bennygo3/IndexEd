import React from 'react';
// import { Link } from 'react-router-dom';
import './Navbar.css';
// import Highlighted from '../Highlighter/Highlighter';
import HomeButtons from '../../components/HomeButtons/HomeButtons.js';

const Navbar = () => {
  return (
    <div className="navbar-home">
      <ul className="nav-list">
        {/* <div className="create-button"> */}
      
        <li>
          <span>Create study card:</span>
          <HomeButtons color="yellow" to="/card-create"></HomeButtons>
          
        </li>
        {/* </div> */}
        <li>
          <span>My study cards:</span>
          <HomeButtons color="rgb(30, 196, 255)" to="/my-cards" />
        </li>
        <li>
          <span>Study random cards:</span>
          <HomeButtons color="hotpink" to="/study-random" />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

// const Navbar = () => {

//   return (
//     <div className="navbar-home">
//       <ul className="nav-list">
//         <li>
//           <HomeButtons color="yellow" />
//           <Highlighted>
//           <Link to="/card-create">
//             Create study card:
//           </Link>
//           </Highlighted>
//         </li>
//         <li>
//           <HomeButtons color="rgb(30, 196, 255)" />
//           <Highlighted color="rgb(30, 196, 255)">
//           <Link to="/my-cards">
//             My study cards:
//           </Link>
//           </Highlighted>
//         </li>
//         <li>
//           <HomeButtons color="hotpink" />
//           <Highlighted color="hotpink">
//           <Link to='/study-random'>
//             Study random cards:
//           </Link>
//           </Highlighted>
//         </li>
//       </ul>
//     </div>
//   );

// }


// export default Navbar;