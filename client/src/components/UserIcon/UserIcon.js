import React from 'react';
import './UserIcon.css';

export default function UserIcon({ isLoggedIn }) {
    return (
        <div className="user-icon-container signed-in">
            <div className= 'avatar'>
                <div className='user-head'></div>
                <div className='user-shoulders'></div>
            </div>
        </div>
    );
}