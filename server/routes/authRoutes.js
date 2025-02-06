import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config.js';
import Users from '../models/Users.js';

const router = express.Router();
const refreshTokens = new Set();
// const accessTokenSecret = 'testSecret';
// const refreshTokenSecret = 'testRefreshSecret';

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

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
        username,
        email,
        password,
        // password: hashedPassword,
    });

    await newUser.save();
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    refreshTokens.add(refreshToken);
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

    refreshTokens.add(refreshToken);

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

// Refresh Token Route
router.post('/token', (req,res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken || !refreshTokens.has(refreshToken)) {
        return res.status(401).json({ message: 'No valid refresh token '})
    }

    try{
        const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);
        const newAccessToken = generateAccessToken(decoded);

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
    // const { token } = req.body;

    // if (!token) return res.status(401).json({ message: 'No token provided' });
    // if (!refreshTokens.has(token)) return res.status(403).json({ message: 'Invalid refresh token' });

    // try {
    //     const decoded = jwt.verify(token, config.jwtRefreshSecret);
    //     const newAccessToken = generateAccessToken(decoded);
    //     res.json({ accessToken: newAccessToken });
    // } catch (err) {
    //     return res.status(403).json({ message: 'Invalid refresh token catch'})
    // }
});

// Logout Route - Revokes Refresh Token
router.delete('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json({ message: 'Looged out successfully '});
    // const { token } = req.body;

    // if (!token) {
    //     return res.status(400).json({ message: 'No token provided' });
    // }

    // refreshTokens.delete(token);
    // res.sendStatus(204);
});

export default router;