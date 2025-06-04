import jwt from 'jsonwebtoken';
import config from '../../config.js';

const authMiddleware = ({ req }) => {
    let token = req.cookies.access_token;

    if (!token) {
        console.log('❌ No token provided');
        throw new Error("Authentication failed: No token prvided aMid")
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
    } catch (err) {
        console.error('❌ Invalid Token:', err.message);
        throw new Error('Authentication failed: Invalid token aMiddy')
    }

    return req;
};

const signToken = ({ _id, username }) => {
    
    const payload = { _id, username };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiry });

    return token;
}

export { authMiddleware, signToken };

