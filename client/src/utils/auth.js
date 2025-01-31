import decode from 'jwt-decode';
import configFront from '../config.js'

class AuthService {
    getProfile() {
        const token = this.getToken();
        if (!token) return null;

        try {
            return decode(token);
        } catch (err) {
            console.error('Error decoding token:', err);
            return null
        }

    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        if (!token) return true;
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem('access_token');
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error decoding token af:', err);
            return true;
        }
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    // Using REST API for login
    async login(username, password) {
        try {
            const response = await fetch(`${configFront.API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to log in auth front');
            }

            const { accessToken, refreshToken } = await response.json();

            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            window.location.assign('/');
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
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const { accessToken, refreshToken } = await response.json();
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            window.location.assign('/');
        } catch (error) {
            console.error('Registration error:', error);
        }
    }

    async refreshAccessToken() {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) return;

            const response = await fetch(`${configFront.API_BASE_URL}/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const { accessToken } = await response.json();
            localStorage.setItem('access_token', accessToken);
        } catch (error) {
            console.error('Token refresh error:', error);
        }
    }

    logout(navigate) {
        const refreshToken = localStorage.getItem('refresh_token');

        fetch(`${configFront.API_BASE_URL}/logout`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: refreshToken }),
        }).finally(() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/');
        });
    }

    getUserIdFromToken() {
        const token = this.getToken();
        if (!token) return null;
    
        try {
            const decoded = decode(token);
            return decoded.data._id || null;
        } catch (error) {
            console.error('Failed to decode token af:', error);
            return null;
        }
    }

}

const authService = new AuthService();
export default authService;