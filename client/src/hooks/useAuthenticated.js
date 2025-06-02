import { useEffect, useState } from 'react';
import authService from '../utils/auth.js';

export function useAuthenticated() {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function check() {
            const loggedIn = await authService.loggedIn();
            if (!cancelled) {
                setIsLoggedIn(loggedIn);
                setIsAuthChecked(true);
            }
        }

        check();

        return () => {
            cancelled = true;
        };
    }, []);

    return { isAuthChecked, isLoggedIn };
}