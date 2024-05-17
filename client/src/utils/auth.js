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
        window.location.assign('/home');
    }

    logout(navigate) {
        localStorage.removeItem('id_token');
        navigate('/');
    }
}

const authService = new AuthService();
export default authService;