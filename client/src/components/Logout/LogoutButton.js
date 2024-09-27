import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../utils/auth';

export default function LogoutButton({ className }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout(navigate);
    };

    return (
        <button className={className} onClick={handleLogout}>Sign<br></br>out</button>
    );
}

// different button aesthetics below:
// &#8998; 
// <button className={className} onClick={handleLogout}> &#9032;</button>