import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import authService from '../utils/auth.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    const checkAuth = async () => {
        const loggedIn = await authService.loggedIn();

        setIsLoggedIn(loggedIn);
        setIsAuthChecked(true);

        return loggedIn;
    }

    // consider adding a flag here in useEffect for unmounting prior to session ending purposes
    useEffect(() => {
        checkAuth()
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                isAuthChecked,
                setIsAuthChecked,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}