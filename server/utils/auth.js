import jwt from 'jsonwebtoken';
import config from '../../config.js';

// Access token - short lived
export const createAccessToken = (user) => {
    return jwt.sign(
        { _id: user._id, username: user.username },
        config.jwtSecret,
        { expiresIn: '15m' } // access token that lasts 15 minutes
        // { expiresIn: '1m' } // testing purposes
    );
};

// Refresh token - long lived
export const createRefreshToken = (user) => {
    return jwt.sign(
        { _id: user._id, username: user.username },
        config.jwtRefreshSecret,
        { expiresIn: '2d' }
    );
};

// Cookie setter for refresh token
export const sendRefreshToken = (res, token) => {
    res.cookie('jid', token, {
        httpOnly: true,
        sameSite: 'Lax',
        path: '/graphql',
        secure: process.env.NODE_ENV === 'production',
    });
};

// Auth middleware for protected routes
export const authMiddleware = ({ req }) => {
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    if (!token){
        console.warn("⚠️ No token found in request");
        throw new Error('No access token');
    } 

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        // console.log("✅ Token successfully verified for user:", decoded.username);
        req.user = decoded;
    } catch (err) {
        console.error("❌ Token verification failed:", err.message);
        throw new Error('Invalid or expired access token');
    }

    return req;
};


export const signToken = ({ _id, username }) => {

    const payload = { _id, username };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiry });

    return token;
}

