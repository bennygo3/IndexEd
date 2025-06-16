import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config.js';
import Users from '../models/Users.js';

const router = express.Router();

const generateAccessToken = (user) => {
    return jwt.sign(
        { _id: user._id, username: user.username },
        config.jwtSecret,
        { expiresIn: '15m' }
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
    console.log("📨 Incoming registration data:", req.body); // Add this line

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

    try {
        await newUser.save();
    } catch (err) {
        console.error('❌ MongoDB save error:', err);
        return res.status(500).json({ message: 'Error saving user', error: err.message });
    }

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    newUser.refreshTokens.push({
        token: refreshToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
    });

    await newUser.save();

    // ✅ Set cookies for auth 
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false, // use true in production with HTTPS
        sameSite: 'Lax',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ message: "Registration successful" });

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
        maxAge: 30 * 1000
        // maxAge: 15 * 60 * 1000 
    });

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
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
    // console.log("🧪 Incoming cookies at /token:", req.cookies);
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

        const newRefreshToken = generateRefreshToken({ _id: decoded._id, username: decoded.username });
        const newRefTokenExp = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // await Users.updateOne(
        //     { _id: decoded._id },
        //     {
        //         $push: {
        //             refreshTokens: {
        //                 $each: [{ token: newRefreshToken, expires: newRefTokenExp }],
        //                 $slice: -5
        //             }
        //         }
        //     }
        // );

        const newAccessToken = generateAccessToken(user);

        // Send new cookies
        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 Day
        });
        console.log("♻️ Refresh endpoint hit");

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