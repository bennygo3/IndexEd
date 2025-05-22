import decode from 'jwt-decode';
import configFront from '../config.js'

class AuthService {
    async getProfile() {
        try {
            const token = await this.getToken();
            return token ? decode(token) : null;
        } catch (err) {
            console.error('Error decoding token:', err);
            return null;
        }

    }

    async loggedIn() {
        const token = this.getToken();
        return token && !await this.isTokenExpired(token);
    }

    async isTokenExpired(token) {
        if (!token) return true;
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now / 1000) {
                console.log("🔄 Token expired, refreshing...");
                await this.refreshAccessToken(); // Automatically refresh token
                return false; // Assume successful refresh
            }
            return false; // Token is still valid
        } catch (err) {
            console.error('Error decoding token auth front', err);
            return true;
        }
    }
    // isTokenExpired(token) {
    //     if (!token) return true;
    //     try {
    //         const decoded = decode(token);
    //         if (decoded.exp < Date.now() / 1000) {
    //             localStorage.removeItem('access_token');
    //             return true;
    //         }
    //         return false;
    //     } catch (err) {
    //         console.error('Error decoding token af:', err);
    //         return true;
    //     }
    // }

    async getToken() {
        // return localStorage.getItem('access_token');
        try {
            const response = await fetch(`${configFront.API_BASE_URL}/get-token`, {
                credentials: 'include' // Retrieve token from httpOnly cookie
            });
            if (!response.ok) return null;
            const { accessToken } = await response.json();
            return accessToken;
        } catch (err) {
            console.error('Error retrieving token:', err);
            return null;
        }
    }

    // Using REST API for login
    async login(username, password) {
        try {
            const response = await fetch(`${configFront.API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // added for troubleshooting
            });

            if (!response.ok) throw new Error('Failed to log in auth front');
            
            window.location.assign('/');

            // const { accessToken, refreshToken } = await response.json();

            // localStorage.setItem('access_token', accessToken);
            // localStorage.setItem('refresh_token', refreshToken);
            // window.location.assign('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    async register(username, email, password, confirmPassword) {
        try {
            const response = await fetch(`${configFront.API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, confirmPassword }),
                credentials: 'include' //added for troubleshooting 2/5/25
            });

            if (!response.ok) throw new Error('Failed to register');
                window.location.assign('/');
            } catch (error) {
                console.error('Registration error:', error);
            }

        //     const { accessToken, refreshToken } = await response.json();
        //     localStorage.setItem('access_token', accessToken);
        //     localStorage.setItem('refresh_token', refreshToken);
        //     window.location.assign('/');
        // } catch (error) {
        //     console.error('Registration error:', error);
        // }
    }

    async refreshAccessToken() {
        try {
            const response = await fetch(`${configFront.API_BASE_URL}/token`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to refresh token');

            const { accessToken } = await response.json();
            return accessToken;
        } catch (error) {
            console.error('Token refresh error:', error);
            return null;
        }
        // try {
        //     const refreshToken = localStorage.getItem('refresh_token');
        //     if (!refreshToken) return;

        //     const response = await fetch(`${configFront.API_BASE_URL}/token`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ token: refreshToken }),
        //     });

        //     if (!response.ok) {
        //         throw new Error('Failed to refresh token');
        //     }

        //     const { accessToken } = await response.json();
        //     localStorage.setItem('access_token', accessToken);
        // } catch (error) {
        //     console.error('Token refresh error:', error);
        // }
    }

    async logout(navigate) {
        try {
            await fetch(`${configFront.API_BASE_URL}/logout`, {
                method: 'DELETE',
                credentials: 'include'
            });
        } finally {
            navigate('/')
        }
        // const refreshToken = localStorage.getItem('refresh_token');

        // fetch(`${configFront.API_BASE_URL}/logout`, {
        //     method: 'DELETE',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ token: refreshToken }),
        // }).finally(() => {
        //     localStorage.removeItem('access_token');
        //     localStorage.removeItem('refresh_token');
        //     navigate('/');
        // });
    }

    getUserIdFromToken() {
        const token = this.getToken();
        if (!token) return null;
    
        try {
            const decoded = decode(token);
            return decoded._id || null;
            // return decoded.data._id || null;
        } catch (error) {
            console.error('Failed to decode token af:', error);
            return null;
        }
    }

}

const authService = new AuthService();
export default authService;

        // const token = this.getToken();
        // if (!token) return null;

        // try {
        //     return decode(token);
        // } catch (err) {
        //     console.error('Error decoding token:', err);
        //     return null
        // }