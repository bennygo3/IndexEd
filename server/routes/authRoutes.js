import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config.js';
import Users from '../models/Users.js';

const router = express.Router();
// const refreshTokens = new Set();

const generateAccessToken = (user) => {
    return jwt.sign(
        { _id: user._id, username: user.username }, 
        config.jwtSecret,
        { expiresIn: config.jwtExpiry }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { _id: user._id, username: user.username },
        config.jwtRefreshSecret,
        { expiresIn: '1d' }
    );
};

// Register new user
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await Users.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
    }

    const newUser = new Users({
        username,
        email,
        password,
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // refreshTokens.add(refreshToken);
    newUser.refreshTokens.push({
        token: refreshToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
    });
    await newUser.save();
    res.json({ accessToken, refreshToken });
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // refreshTokens.add(refreshToken);
    user.refreshTokens.push({
        token: refreshToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
    await user.save();

    // Set accessToken in an httpOnly cookie
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false, // can change to true in production w/ HTTPS
        sameSite: 'Lax',
        maxAge: 15 * 60 * 1000 // 15 min
    });

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    res.json({ message: "Login successful" });

    // res.json({ accessToken, refreshToken });
});

// Get access token from cookie
router.get('/get-token', (req,res) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.status(401).json({ error: 'No token found' });
    }
    res.json({ accessToken: token });
})

// Refresh Token Route
router.post('/token', async (req,res) => {
    const refreshToken = req.cookies.refresh_token;

    // if (!refreshToken || !refreshTokens.has(refreshToken)) {
    //     return res.status(401).json({ message: 'No valid refresh token '})
    // }
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
    const user = await Users.findOne({
        'refreshTokens.token': refreshToken,
        'refreshTokens.revoked': { $ne: true }
    });

    if (!user) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

        // const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);
        // const newAccessToken = generateAccessToken(decoded);
        jwt.verify(refreshToken, config.jwtRefreshSecret);
        const newAccessToken = generateAccessToken(user);

        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 15 * 60 * 1000
        });
        res.json({ message: 'Token refreshed successfully' });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid refresh token aRoutes'})
    }
});

// Logout Route - Revokes Refresh Token
router.delete('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json({ message: 'Logged out successfully '});

});

export default router;