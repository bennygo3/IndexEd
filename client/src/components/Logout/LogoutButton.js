import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../utils/auth';

export default function LogoutButton({ className }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout(navigate);
    };

    return (
        <button className={className} onClick={handleLogout}> &#9032;</button>
    );
}

// &#8998;