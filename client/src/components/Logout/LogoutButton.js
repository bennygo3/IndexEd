import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../utils/auth';

export default function LogoutButton({ className }) {
    const navigate = useNavigate();
    
    const { 
        setIsLoggedIn,
        setIsAuthChecked
    } = useAuth();

    const handleLogout = async () => {
        try {
            await  authService.logout();  // Revokes the refresh token and clears the auth cookies

            // update React authentication state directly
            setIsLoggedIn(false);
            setIsAuthChecked(true);

            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
       
    };

    return (
        <button 
            type="button"
            className={className} 
            onClick={handleLogout}
        >
            Sign<br></br>Out
        </button>
    );
}

// different button aesthetics below:
// &#8998; 
// <button className={className} onClick={handleLogout}> &#9032;</button>