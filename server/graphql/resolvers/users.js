import { GraphQLError } from 'graphql';
import Users from '../../models/Users.js';
import SnakeScore from '../../models/SnakeScore.js';
import { signToken } from '../../utils/auth.js';

const Query = {
    async getCurrentUser(_, __, context) {
        // Authentication check
        if (!context.user) {
            throw new GraphQLError('You are not authenticated', {
                extensions: { code: 'UNAUTHENTICATED Query resolver' },
            });
        }

        const user = await Users.findById(context.user._id)
            .populate({
                path: 'studyGenres',
                populate: {
                    path: 'studyCards',
                    model: 'StudyCard',
                }, 
            })
            .populate({
                path: 'studyCards',
                model: 'StudyCard',
            })
            .populate('snakeScores')
        
        if (!user) {
            throw new GraphQLError('User not found!', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        // Added default value for created at for users that were created without one
        if (!user.createdAt) {
            user.createdAt = new Date();
            await user.save();
        }

        return user;
    },

    async getHighScoreSnake(_, __, context) {
        const authId = context.user?._id;
        if (!authId) return null;
        const score = await SnakeScore.findOne({ userId: authId });
        return score || null;
    },

};

const Mutation = {
    async login(_, { username, password }) {
        const user = await Users.findOne({ username });

        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        const isMatch = await user.isCorrectPassword(password);
        if (!isMatch) {
            throw new GraphQLError('Incorrect credentials', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        const token = signToken(user);
        return { token, user };
    },

    async register(_, { username, email, password, confirmPassword }) {
        if (password !== confirmPassword) {
            throw new GraphQLError('Passwords do not match', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            throw new GraphQLError('Username already taken', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        const user = await Users.create({
            username,
            email,
            password,
        });

        // const token = signToken(user);
        const token = signToken({
            _id: user._id,
            username: user.username,
        });

        return { token, user };
    },

    async updateHighSnakeScore(_, { newSnakeScore }, context) {
        const authId = context.user?._id;
        if(!authId) {
            throw new GraphQLError('Not authenticated' , {
                extensions: {code: 'UNAUTHENTICATED' },
            });
        }

        if (!Number.isInteger(newSnakeScore) || newSnakeScore < 0) {
            throw new GraphQLError('Score must be a non-negative integer', {
        extensions: { code: 'BAD_USER_INPUT' },
        });
    }

    const snakeUpdated = await SnakeScore.findOneAndUpdate(
        { userId: authId },
        {
            $setOnInsert: { userId: authId, username: user.username, highScore: newSnakeScore },
            $max: { highScore: newSnakeScore },
            $set: { username: user.username },
        },
        { new: true, upsert: true }
    );

    return snakeUpdated;
    },
};

export default { Query, Mutation };

//async getHighScoreSnake(_, { userId }) {

    //     const snakeScore = await SnakeScore.findOne({ userId });

    //     if (!snakeScore) {
    //         return null;
    //     }

    //     const username = snakeScore.username || "Unknown";

    //     return {
    //         _id: snakeScore._id,
    //         userId: snakeScore.userId,
    //         username: username,
    //         highScore: snakeScore.highScore,
    //     };
    // },
        // async updateHighSnakeScore(_, { userId, newSnakeScore }) {
    //     const highSnakeScore = await SnakeScore.findOne({ userId });

    //     if (!highSnakeScore) {
    //         const user = await Users.findById(userId);
    //         if(!user) {
    //             throw new GraphQLError('User not found', { extensions: { code: 'BAD_USER_INPUT' } });
    //         }

    //         const 
    //     }
    // }