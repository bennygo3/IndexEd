import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }

    isTokenExpired() {
        const token = this.getToken();
        const decoded = decode(token);
        if (decoded.exp < Date.now() /1000 ) {
            localStorage.removeItem('id_token');
            return true;
        }
        return false;
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout(navigate) {
        localStorage.removeItem('id_token');
        navigate('/');
    }

    getUserIdFromToken() {
        const token = this.getToken();
        if (!token) return null;

        try {
            const decoded = decode(token);
            return decoded.data._id;
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }
}

const authService = new AuthService();
export default authService;