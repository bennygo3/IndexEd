import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import Users from '../models/Users.js';

import {
    createAccessToken,
    createRefreshToken,
    issueTokens,
    setAuthCookies,
} from '../utils/auth.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const { password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({
            message: 'All registration fields are required',
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: 'Passwords must match',
        });
    }

    try {
        const existingUser = await Users.findOne({
            $or:[{ username }, { email }],
        });

        if (existingUser) {
            const duplicateField =
                existingUser.username === username
                    ? 'Username'
                    : 'Email';
                
            return res.status(409).json({
                message: `${duplicateField} is already in use`,
            });
        }

        const newUser = await Users.create({
            username,
            email,
            password,
        });

        const { accessToken, refreshToken } =
            await issueTokens(newUser);

        setAuthCookies(res, accessToken, refreshToken);

        return res.status(201).json({
            message: 'Registration successful',
        });
    } catch (err) {
        if (err?.code === 11000) {
            const duplicateField =
                Object.keys(err.keyPattern ?? {})[0] ?? 'Field';

            return res.status(409).json({
                message: `${duplicateField} is already in use`,
            });
        }

        if (err?.name === 'ValidationError') {
            return res.status(400).json({
                message: err.message,
            });
        }

        console.error('❌ Registration error:', err);

        return res.status(500).json({
            message: 'Unable to register user',
        });
    }
})

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // const match = await bcrypt.compare(password, user.password);
    const match = await user.isCorrectPassword(password);
    if (!match) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const { accessToken, refreshToken } = await issueTokens(user);

    setAuthCookies(res, accessToken, refreshToken);

    res.json({ message: "Login successful" });
});

// Get access token from cookie
router.get('/get-token', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ error: 'No token found' });
    }
    res.json({ accessToken: token });
})

// Refresh Token Route
router.post('/token', async (req, res) => {
    console.log("♻️ Refresh endpoint hit at", new Date().toLocaleTimeString());
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });

    try {
        const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);

        const user = await Users.findOneAndUpdate({
            _id: decoded._id,
            'refreshTokens.token': refreshToken,
            'refreshTokens.revoked': false
        },
            {
                $set: { 'refreshTokens.$.revoked': true },
            },
            { new: true }
        );

        if (!user) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }

        const newRefreshToken = createRefreshToken({ _id: decoded._id, username: decoded.username });
        const newRefTokenExp = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await Users.updateOne(
            { _id: decoded._id },
            {
                $push: {
                    refreshTokens: {
                        $each: [{ token: newRefreshToken, expires: newRefTokenExp }],
                        $slice: -5
                    }
                }
            }
        );

        const newAccessToken = createAccessToken(user);

        setAuthCookies(res, newAccessToken, newRefreshToken);

        // console.log("♻️ Refresh endpoint hit");

        res.json({ message: 'Token refreshed successfully with rotation' });
    } catch (err) {
        console.error('Refresh token error:', err)
        return res.status(403).json({ message: 'Invalid refresh token aRoutes' })
    }

});

// Logout Route - Revokes Refresh Token
router.delete('/logout', async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) {
        try {
            const user = await Users.findOne({ 'refreshTokens.token': refreshToken });

            if (user) {
                const tokenEntry = user.refreshTokens.find(rt => rt.token === refreshToken);
                if (tokenEntry) {
                    tokenEntry.revoked = true;
                    await user.save();
                }
            }
        } catch (err) {
            console.error('Error revoking refresh token:', err);
        }
    }
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json({ message: 'Logged out successfully ' });

});

export default router;

//router.post('/register', async (req, res) => {

//     const { username, email, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     const existingUser = await Users.findOne({ username });
//     if (existingUser) {
//         return res.status(400).json({ message: 'Username is already taken' });
//     }

//     const newUser = new Users({
//         username,
//         email,
//         password,
//     });

//     try {
//         await newUser.save();
//     } catch (err) {
//         console.error('❌ MongoDB save error:', err);
//         return res.status(500).json({ message: 'Error saving user', error: err.message });
//     }

//     const { accessToken, refreshToken } = await issueTokens(newUser);

//     // ✅ Set cookies for auth 
//     setAuthCookies(res, accessToken, refreshToken);

//     res.json({ message: "Registration successful" });