import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserInputError, AuthenticationError } from '@apollo/server';
import { validateRegisterInput, validateLoginInput } from '../../utils/validators';
import { SECRET_KEY } from '../../../config';
import Users from '../../models/Users';

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: '3h' }
    );
}

const Query = {
    async getCurrentUser(_,__, context) {
        if (!context.user) {
            throw new AuthenticationError('You are not authenticated')
        }

        const user = await User.findById(context.user.id);
        if(!user) {
            throw new UserInputError('User not found!')
        }
        
        return user;
    },
};

export const Mutation = {
    async login(_, { username, password }) {
        const { errors, valid } = validateLoginInput(username, password);

        if (!valid) {
            throw new UserInputError('Errors', { errors });
        }
        const user = await User.findOne({ username });

        if (!user) {
            errors.general = 'User not found';
            throw new UserInputError('User not found', { errors });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            errors.general = 'Wrong credentials';
            throw new UserInputError('Wrong credentials', { errors });
        }

        const token = generateToken(user);

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
            throw new UserInputError('Errors', { errors });
        }
        // if user/username already exists throw error
        const user = await User.findOne({ username });
        if (user) {
            throw new UserInputError('Username is taken', {
                errors: {
                    username: 'This username is taken'
                }
            })
        }
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
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

