import jwt from 'jsonwebtoken';
import config from '../../config.js';

// Access token - short lived
export const createAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        config.jwtSecret,
        { expiresIn: '15m' }
    );
};

// Refresh token - long lived
export const createRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        config.jwtRefreshSecret,
        { expiresIn: '7d' }
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
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new Error('No access token');

    try {
        const decoded = jwt.verify(token, config.jwtRefreshSecret);
        req.user = decoded;
    } catch (err) {
        throw new Error('Invalid or expired access token');
    }

    return req;
};


// implementing new token logic 6/16 was semi working below prior to changes 
// const authMiddleware = ({ req }) => {
//     let token = req.cookies.access_token;

//     if (!token) {
//         console.log('❌ No token provided');
//         throw new Error("Authentication failed: No token prvided aMid")
//     }

//     try {
//         const decoded = jwt.verify(token, config.jwtSecret);
//         req.user = decoded;
//     } catch (err) {
//         console.error('❌ Invalid Token:', err.message);
//         throw new Error('Authentication failed: Invalid token aMiddy')
//     }

//     return req;
// };

export const signToken = ({ _id, username }) => {

    const payload = { _id, username };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiry });

    return token;
}

// export { authMiddleware, signToken };

