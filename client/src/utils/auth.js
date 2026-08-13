import decode from 'jwt-decode';
import configFront from '../config.js'

class AuthService {
    constructor() {
        // Stored only in JS memory. Disappears when the page reloads
        this.accessToken = null;

        // These promises prevent duplicate requests from running simultaneously
        this.getTokenPromise = null;
        this.refreshPromise = null;
        this.loggedInPromise = null;
    }

    clearAccessToken() {
        this.accessToken = null;
    }

    async getProfile() {
        try {
            const token = await this.getToken();
            return token ? decode(token) : null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }

    }

    async loggedIn() {
        // if an authentication check is already running, reuse it
        if (this.loggedInPromise) {
            return this.loggedInPromise;
        }

        this.loggedInPromise = this.checkLoggedIn();

        try {
            return await this.loggedInPromise;
        } finally {
            this.loggedInPromise = null;
        }
    }

    async checkLoggedIn() {
        let token = await this.getToken();

        // A present, unexpired access token means the user is authenticated
        if (token && !this.isTokenExpired(token)) {
            return true;
        }

        // There was no usable access token, so try the refresh token
        const refreshed = await this.refreshAccessToken();

        if (!refreshed) {
            return false;
        }

        // The refresh endpoint placed a new access-token cookie in the browser
        token = await this.getToken({ force: true });

        return Boolean(
            token &&
            !this.isTokenExpired(token)
        );
    }

    isTokenExpired(token) {
        if (!token) return true;

        try {
            const decoded = decode(token);

            return decoded.exp <= Date.now() / 1000;
        } catch (error) {
            console.error(`Error decoding token:`, error);
            return true;
        }
    }

    async getToken({ force = false } = {}) {
        // Apollo can reuse the cached token instead of repeat requesting of /get-token before every GraphQL operation
        if (!force && this.accessToken) {
            return this.accessToken;
        }

        // reuse an existing get-token req if one is already tunning
        if (this.getTokenPromise) {
            return this.getTokenPromise;
        }

        this.getTokenPromise = this.requestAccessToken();

        try {
            return await this.getTokenPromise;
        } finally {
            this.getTokenPromise = null;
        }
    }

    async requestAccessToken() {
        try {
            const response = await fetch(
                `${configFront.API_BASE_URL}/get-token`,
                {
                    credentials: 'include',
                }
            );

            // A 401 err here usually means the browser has no access-token cookie.
            // It is an auth result, not an unexpected application error.
            if (!response.ok) {
                this.clearAccessToken();
                return null;
            }

            const data = await response.json().catch(() => null);
            const token = data?.accessToken || null;

            this.accessToken = token;

            return token;
        } catch (error) {
            this.clearAccessToken();
            console.error('Error retrieving access token:', error);
            return null;
        }
    }

    async login(username, password) {
        const response = await fetch(
            `${configFront.API_BASE_URL}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
                credentials: 'include',
            }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(
                data?.message ||
                `Login failed with status ${response.status}`
            );
        }

        // The server has issued a new access-token cookie.
        // Clear any token belonging to an earlier session.
        this.clearAccessToken();

        return data;
    }

    async register(username, email, password, confirmPassword) {
        const response = await fetch(
            `${configFront.API_BASE_URL}/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword,
                }),
                credentials: 'include',
            }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(data?.message || 'Failed to register');
        }

        // Registration also starts a new authenticated session
        this.clearAccessToken();

        return data;
    }

    async refreshAccessToken() {
        // If multiple parts of React request a refresh simultaneously,
        // they all wait for this one shared request.
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = this.requestTokenRefresh();

        try {
            return await this.refreshPromise;
        } finally {
            this.refreshPromise = null;
        }
    }

    async requestTokenRefresh() {
        try {
            const response = await fetch(
                `${configFront.API_BASE_URL}/token`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                this.clearAccessToken();
                return false;
            }

            // The server has placed a new access-token cookie in the browser.
            // The next getToken() call will retrieve and cache it. 
            this.clearAccessToken();

            return true;
        } catch (error) {
            this.clearAccessToken();
            console.error('Token refresh req failed:', error);
            return false;
        }
    }

    async logout() {
        try {
            const response = await fetch(
                `${configFront.API_BASE_URL}/logout`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    `Logout failed with status ${response.status}`
                );
            }

            return data;
        } finally {
            // Remove the client-side copy even if the req encounters
            // a network problem.
            this.clearAccessToken();
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