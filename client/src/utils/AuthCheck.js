import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './auth.js';

export default function AuthCheck() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!authService.loggedIn()) {
            navigate('/');
        }

        const checkToken = setInterval(() => {
            if (!authService.loggedIn()) {
                authService.logout();
            }
        }, 60 * 2000); // checks q 2 minutes

        return () => clearInterval(checkToken);
    }, [navigate]);

    return null;
};