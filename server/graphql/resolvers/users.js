import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { validateRegisterInput, validateLoginInput } from '../../utils/validators.js';
import Users from '../../models/Users.js';
import config from '../../../config.js';
import { signToken } from '../../utils/auth.js';

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        JWT_SECRET,
        { expiresIn: '8h' }
    );
}

const Query = {
    async getCurrentUser(_, __, context) {
        if (!context.user) {
            throw new GraphQLError('You are not authenticated', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        const user = await Users.findById(context.user.id)
            .populate('studyCardGroups')
            .exec()
        if (!user) {
            throw new GraphQLError('User not found!', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        return user;
    },
};

export const Mutation = {
    async login(_, { username, password }) {

        const user = await Users.findOne({ username });

        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new GraphQLError('Wrong credentials', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        const token = signToken(user);

        return {
            ...user._doc,
            id: user._id,
            token
        };

    },
    async register(
        _,
        {
            registerInput: { username, email, password, confirmPassword }
        },
    ) {
        const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
        if (!valid) {
            throw new GraphQLError('Invalid input', { 
                extensions: { code: 'BAD_USER_INPUT', errors },
            });
        }
        // if user/username already exists throw error
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            throw new GraphQLError('Username is taken', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new Users({
            username,
            email,
            password,
            createdAt: new Date().toISOString()
        });

        const res = await newUser.save();

        const token = generateToken(res);

        return {
            ...res._doc,
            id: res._id,
            token
        };
    }
};

export default { Query, Mutation };

