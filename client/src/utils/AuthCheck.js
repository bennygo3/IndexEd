// import { useEffect, useCallback } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import authService from './auth.js';

// export default function AuthCheck() {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const checkAuthentication = useCallback(() => {
//         console.log("Checking authentication status for path:", location.pathname);
//         // const pubPath = ['/']
//         // if (!authService.loggedIn() && !pubPath.includes(location.pathname)) {
//         if (!authService.loggedIn() && location.pathname !== '/') {
//             console.log("Not logged in and on a protected route, redirecting to landing page.");
//             authService.logout(navigate);
//             // navigate('/');
//         }
//     }, [navigate, location]);

//     useEffect(() => {
//         checkAuthentication();
//         const interval = setInterval(checkAuthentication, 5 * 60 * 1000);

//         return () => clearInterval(interval);
//     }, [checkAuthentication]);

//     return null;
// };