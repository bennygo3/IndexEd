import jwt from 'jsonwebtoken';
import config from '../../config.js';

// const secret = process.env.JWT_SECRET;
const secret = config.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_SECRET is not set");
}

const expiration = '5h';

const authMiddleware = ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        return { user: null };
        // return req;
    }

    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch (err) {
        // console.log('invalid token check back-end auth.js', error.message);
        console.error('Invalid token:', err);
        return { user: null };
    }
    return req;
};

const signToken = ({ email, username, _id }) => {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
}

export { authMiddleware, signToken };