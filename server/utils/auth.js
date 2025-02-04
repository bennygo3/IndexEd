import jwt from 'jsonwebtoken';
import config from '../../config.js';

const authMiddleware = ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    const expiration = config.jwtExpiry;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        console.log("❌ No token provided");
        req.user = null;
        return req;
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret, { maxAge: expiration });
        req.user = decoded;
    } catch (err) {
        console.error("❌ Invalid Token:", err.message);        
        req.user = null;
    }

    return req;
};

const signToken = ({ username, _id }) => {
    
    const payload = { username, _id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: expiration });

    return token;
}

export { authMiddleware, signToken };