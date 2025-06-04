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
        await this.refreshAccessToken();
        
        const token = await this.getToken();
        return token && !await this.isTokenExpired(token);
    }

    async isTokenExpired(token) {
        if (!token) return true;

        try {
            const decoded = decode(token);
             console.log("🧪 Token expiration time:", decoded.exp);
             console.log("🧪 Current time:", Math.floor(Date.now() / 1000));
            
             if (decoded.exp < Date.now() / 1000) {
                console.log("🔄 Token expired, refreshing...");

                const refreshed = await this.refreshAccessToken();
                if (!refreshed) return true;

                await new PromiseRejectionEvent(res => setTimeout(res, 200));
                
                // await this.refreshAccessToken(); // Automatically refresh token
                
                const newToken = await this.getToken();
                if(!newToken) return true;

                const newDecoded = decode(newToken);
                console.log("✅ Refreshed token exp:", newDecoded.exp);
                return newDecoded.exp < Date.now() / 1000;
            }
            return false; // Token is still valid
        } catch (err) {
            console.error('Error decoding token auth front', err);
            return true;
        }

    }

    async getToken() {
        try {
            const response = await fetch(`${configFront.API_BASE_URL}/get-token`, {
                credentials: 'include' // Retrieve token from httpOnly cookie
            });

            const rawText = await response.text();

            if (!response.ok) return null;

            const { accessToken } = await JSON.parse(rawText);
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
                credentials: 'include' // required to send cookies for auth
            });

            if (!response.ok) throw new Error('Failed to log in auth front');
            
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
                credentials: 'include' //added for troubleshooting 2/5/25
            });

            if (!response.ok) throw new Error('Failed to register');
                window.location.assign('/');
            } catch (error) {
                console.error('Registration error:', error);
            }
    }

    async refreshAccessToken() {
        try {
            const response = await fetch(`${configFront.API_BASE_URL}/token`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to refresh token');

            console.log("✅ Access token refreshed successfully");
            return true;
            // const { accessToken } = await response.json();
            // return accessToken;
        } catch (error) {
            console.error('Token refresh error:', error);
            return null;
        }
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
    }

    async getUserIdFromToken() {
        const token = await this.getToken();
        if (!token) return null;
    
        try {
            const decoded = decode(token);
            return decoded._id || null;
        } catch (error) {
            console.error('Failed to decode token af:', error);
            return null;
        }
    }
}

const authService = new AuthService();
export default authService;