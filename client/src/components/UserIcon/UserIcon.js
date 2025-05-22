import React, { useEffect, useState } from 'react';
import Auth from '../../utils/auth.js'
import './UserIcon.css';

export default function UserIcon() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const status = await Auth.loggedIn();
            setIsLoggedIn(status);
        };
        checkLogin();
    }, []);

    return (
        <div className={`user-icon-container ${isLoggedIn ? 'signed-in' : 'signed-out'}`}>
            <div className= 'avatar'>
                <div className='head'></div>
                <div className='shoulders'></div>
            </div>
        </div>
    );
}