import React from 'react';

import './HomeButtons.css';

const HomeButtons = ({ color, to }) => {
  return (
    
      <div className="home-buttons" style={{ backgroundColor: color }}>
        <div className="inner-button"></div>
      </div>
    
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