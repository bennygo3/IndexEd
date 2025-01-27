import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import Users from '../../models/Users.js';
import SnakeScore from '../../models/SnakeScore.js';
import { signToken } from '../../utils/auth.js';

const Query = {
    async getCurrentUser(_, __, context) {

        // Authentication check first
        if (!context.user) {
            throw new GraphQLError('You are not authenticated', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        const user = await Users.findById(context.user.id)
            .populate('studyCardGroups')
            .populate({
                path: 'snakeScores',
                select: 'highScore',
            });

        if (!user) {
            throw new GraphQLError('User not found!', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        return {
            ...user.toObject(),
            id: user._id,
        };
    },

    async getHighScoreSnake(_, { userId }) {
        const snakeScore = await SnakeScore.findOne({ userId });

        if (!snakeScore) {
            const user = await Users.findById(userId);
            if (!user) {
                throw new GraphQLError('User not found', {
                    extensions: { code: 'BAD_USER_INPUT' },
                });
            }
            return { id: null, userId, username: user.username, highScore: 0};
        }
        
        const user = await Users.findById(snakeScore.userId);
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }
        
        return {
            id: snakeScore._id,
            userId: snakeScore.userId,
            username: user.username,
            highScore: snakeScore.highScore,
        };
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
            throw new GraphQLError('Invalid username or password', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        const token = signToken(user);

        return { token, user };

    },
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
        if (password !== confirmPassword) {
            throw new GraphQLError('Invalid creds', {
                extensions: { code: 'BAD_USER_INPUT' },
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
            password: hashedPassword,
        });

        await newUser.save();

        const token = signToken(newUser);

        return { token, user: newUser };
    },
};

export default { Query, Mutation };

