import React from 'react';
import { Link } from 'react-router-dom';
import './HomeButtons.css';

const HomeButtons = ({ color, to }) => {
  return (
    <Link to={to} className="home-button-link">
      <div className="home-buttons" style={{ backgroundColor: color }}>
        <div className="inner-button"></div>
      </div>
    </Link>
  );
};

export default HomeButtons;

// import React from 'react';
// import './HomeButtons.css';

// const HomeButtons = ({ color }) => {
//     return(
//         <>
//             <div className='home-buttons' style={{ backgroundColor: color }}>
//                 <div className='inner-button'></div>
//             </div>
//         </>
//     )
// };

// export default HomeButtons;