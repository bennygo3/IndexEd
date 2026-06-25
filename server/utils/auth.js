import jwt from 'jsonwebtoken';
import config from '../../config.js';

// Token creation/Access token - short lived - exported to authRoutes
export const createAccessToken = (user) => {
    return jwt.sign(
        { _id: user._id, username: user.username },
        config.jwtSecret,
        { expiresIn: '15m' } // access token that lasts 15 minutes
        // { expiresIn: '1m' } // testing purposes
    );
};

// Token creation/Refresh token - long lived -> authRoutes
export const createRefreshToken = (user) => {
    return jwt.sign(
        { _id: user._id, username: user.username },
        config.jwtRefreshSecret,
        { expiresIn: '1d' }
    );
};

// Auth Helper ---> authRoutes
export const issueTokens = async (user) => {
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshTokens.push({
        token: refreshToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await user.save();

    return {
        accessToken,
        refreshToken,
    };
};

// Auth Helper ---> authRoutes
export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        path: '/',
        maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
    });
}

// Auth middleware for protected routes, exported to server
export const authMiddleware = ({ req }) => {
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    if (!token){
        console.warn(`⚠️ No token found for ${req.method} ${req.path}`);
        throw new Error('No access token');
    } 

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        // console.log("✅ Token successfully verified for user:", decoded.username);
        req.user = decoded;
    } catch (err) {
        console.error(`❌ Token verification failed for ${req.method} ${req.path}`);
        throw new Error('Invalid or expired access token');
    }

    return req;
};