import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../utils/auth';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout(navigate);
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}