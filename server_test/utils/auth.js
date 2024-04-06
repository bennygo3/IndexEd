import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
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
        return req;
    }

    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        console.log("Verification successful:", data); // Debugging log
        req.user = data;
    } catch {
        console.log('invalid token check back-end auth.js')
    }
    return req;
};

const signToken = ({ email, username, _id }) => {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
}


export { authMiddleware, signToken };
