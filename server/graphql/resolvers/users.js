import { GraphQLError } from 'graphql';
import Users from '../../models/Users.js';
import SnakeScore from '../../models/SnakeScore.js';
// import { signToken } from '../../utils/auth.js';

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
            // .populate('snakeScores')

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
    async updateHighSnakeScore(_, { newSnakeScore }, context) {
        const authId = context.user?._id;
        if (!authId) {
            throw new GraphQLError('Not authenticated', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        if (!Number.isInteger(newSnakeScore) || newSnakeScore < 0) {
            throw new GraphQLError('Score must be a non-negative integer', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        const user = await Users.findById(authId);
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        // create a new high score in snake for a user if they are signed in and play for the first time
        const existing = await SnakeScore.findOne({ userId: authId });

        if (!existing) {
            await SnakeScore.create({
                userId: authId,
                username: user.username,
                highScore: newSnakeScore,
            });
            return { changed: true, highScore: newSnakeScore };
        }

        if (newSnakeScore > existing.highScore) {
            existing.highScore = newSnakeScore;
            existing.username = user.username;
            await existing.save();
            return { changed: true, highScore: existing.highScore };
        }

        return { changed: false, highScore: existing.highScore }
    }
};

export default { Query, Mutation };

// below is from mutation and removed since it was not needed due
// to updating and consolidating authentication architecture by eliminating duplicate logic

    // async login(_, { username, password }) {
    //     const user = await Users.findOne({ username });

    //     if (!user) {
    //         throw new GraphQLError('User not found', {
    //             extensions: { code: 'BAD_USER_INPUT' },
    //         });
    //     }

    //     const isMatch = await user.isCorrectPassword(password);
    //     if (!isMatch) {
    //         throw new GraphQLError('Incorrect credentials', {
    //             extensions: { code: 'BAD_USER_INPUT' },
    //         });
    //     }

    //     const token = signToken(user);
    //     return { accessToken: token, user };
    // },

    // async register(_, { username, email, password, confirmPassword }) {
    //     if (password !== confirmPassword) {
    //         throw new GraphQLError('Passwords do not match', {
    //             extensions: { code: 'BAD_USER_INPUT' },
    //         });
    //     }

    //     const existingUser = await Users.findOne({ username });
    //     if (existingUser) {
    //         throw new GraphQLError('Username already taken', {
    //             extensions: { code: 'BAD_USER_INPUT' },
    //         });
    //     }

    //     const user = await Users.create({
    //         username,
    //         email,
    //         password,
    //     });

    //     // const token = signToken(user);
    //     const token = signToken({
    //         _id: user._id,
    //         username: user.username,
    //     });

    //     return { accessToken: token, user };
    // },
