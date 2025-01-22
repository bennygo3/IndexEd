import jwt from 'jsonwebtoken';
import config from '../../config.js';

const { JWT_SECRET } = config;
const EXPIRATION = '8h';

if (!JWT_SECRET) {
    throw new Error('jwt token is not set');
}

const signToken = ({ email, username, id }) => {
    const payload = { email, username, id };
    return jwt.sign({ data: payload }, JWT_SECRET, { expiresIn: EXPIRATION });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET, { maxAge: EXPIRATION });
    } catch (err) {
        console.error("Token verification error:", err.message)
        throw new Error('Invalid or expired token');
    }
};

const authMiddleware = ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Extracts token from Auth header if present
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    // If no token, proceed without attaching a user
    if (!token) {
        req.user = null;
        return req;
    }

    try {
        const { data } = jwt.verify(token, JWT_SECRET, { maxAge: EXPIRATION });
        req.user = data;
    } catch (err) {
        console.error('AuthMiddleware error:', err.message);
        req.user = null; // Explicitly sets user to null in case of an error
    }
    return req;
};

export { signToken, verifyToken, authMiddleware };