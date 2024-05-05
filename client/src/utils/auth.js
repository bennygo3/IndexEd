import decode from 'jwt-decode';

class AuthService {
    getToken() {
        // return localStorage.getItem('id_token');
        const token = localStorage.getItem('id_token');
        console.log("Retrieved token from storage:", token);
        return token;
    }

    isTokenExpired(token) {
        try {
            const profile = decode(token);
            console.log("Decoded token:", profile);
            return profile.exp < Date.now() / 1000;
        } catch (err) {
            console.error("Failed to decode token:", err)
            return true;
        }
    }

    getProfile() {
        const token = this.getToken();
        if (!token) return null;
        try {
            return decode(token);
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
        
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/home');
    }

    loggedIn() {
        const token = this.getToken();
        const isLoggedIn = !!token && !this.isTokenExpired(token);
        console.log("Is logged in:", isLoggedIn);
        // return token && !this.isTokenExpired(token) ? true : false;
        return isLoggedIn;
    }

    logout(navigate) {
        localStorage.removeItem('id_token');
        navigate('/');
        // window.location.assign('/');
        // window.location.reload();
    }
}

const authService = new AuthService();
export default authService;
