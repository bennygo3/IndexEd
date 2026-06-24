// import React, { useEffect, useState } from 'react';
// import Auth from '../../utils/auth.js'
import React from 'react';
import './UserIcon.css';

export default function UserIcon({ isLoggedIn }) {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     const checkLogin = async () => {
    //         const status = await Auth.loggedIn();
    //         setIsLoggedIn(status);
    //     };
    //     checkLogin();
    // }, []);

    return (
        <div className={`user-icon-container ${isLoggedIn ? 'signed-in' : 'signed-out'}`}>
            <div className= 'avatar'>
                <div className='user-head'></div>
                <div className='user-shoulders'></div>
            </div>
        </div>
    );
}