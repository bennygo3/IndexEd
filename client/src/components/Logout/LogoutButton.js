import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../utils/auth';

export default function LogoutButton({ className }) {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    const handleLogout = async () => {
       await  authService.logout();
       await checkAuth();
       navigate("/");
    };

    return (
        <button className={className} onClick={handleLogout}>
            Sign<br></br>Out
        </button>
    );
}

// different button aesthetics below:
// &#8998; 
// <button className={className} onClick={handleLogout}> &#9032;</button>