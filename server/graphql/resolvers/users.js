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
                path: 'studyCardGroups',
                populate: 'StudyCards',
            })
            .populate({
                path: 'snakeScores',
            });
        
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

    async getHighScoreSnake(_, { userId }) {

        const snakeScore = await SnakeScore.findOne({ userId });

        if (!snakeScore) {
            return null;
        }

        const username = snakeScore.username || "Unknown";

        return {
            _id: snakeScore.id,
            userId: snakeScore.userId,
            username: username,
            highScore: snakeScore.highScore,
        };
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

        const token = signToken(user);
        return { token, user };
    },
};

export default { Query, Mutation };




// import bcrypt from 'bcrypt';
// import { GraphQLError } from 'graphql';
// import Users from '../../models/Users.js';
// import SnakeScore from '../../models/SnakeScore.js';
// import { signToken } from '../../utils/auth.js';
// import studycards from './studycards.js';

// const Query = {
//     async getCurrentUser(_, __, context) {

//         // Authentication check first
//         if (!context.user) {
//             throw new GraphQLError('You are not authenticated', {
//                 extensions: { code: 'UNAUTHENTICATED' },
//             });
//         }

//         const user = await Users.findById(context.user._id)
//             .populate({
//                 path: 'studyCardGroups',
//                 populate: 'StudyCards' 
//             })
//             .populate({
//                 path: 'snakeScores',
//                 populate: 'highScore'
//             });

//         if (!user) {
//             throw new GraphQLError('User not found!', {
//                 extensions: { code: 'BAD_USER_INPUT' },
//             });
//         }
        
//         return user;
//     },

//     async getHighScoreSnake(_, { userId }) {
//         const snakeScore = await SnakeScore.findOne({ userId });

//         if (!snakeScore) {
//             const user = await Users.findById(userId);
//             if (!user) {
//                 throw new GraphQLError('User not found', {
//                     extensions: { code: 'BAD_USER_INPUT' },
//                 });
//             }
//             return { _id: null, userId, username: user.username, highScore: 0};
//         }
        
//         const user = await Users.findById(snakeScore.userId);
//         if (!user) {
//             throw new GraphQLError('User not found', {
//                 extensions: { code: 'BAD_USER_INPUT' },
//             });
//         }
        
//         return {
//             _id: snakeScore.id,
//             userId: snakeScore.userId,
//             username: user.username,
//             highScore: snakeScore.highScore,
//         };
//     },
// };

// export const Mutation = {
//     async login(_, { username, password }) {

//         const user = await Users.findOne({ username });

//         if (!user) {
//             throw new GraphQLError('User not found', {
//                 extensions: { code: 'BAD_USER_INPUT' },
//             });
//         }

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             throw new GraphQLError('Invalid username or password', {
//                 extensions: { code: 'BAD_USER_INPUT' },
//             });
//         }

//         const token = signToken(user);
//         console.log('Token sent to client:', token);

//         return { token, user };

//     },
//     async register(_, { registerInput: { username, email, password, confirmPassword } }) {
//         if (password !== confirmPassword) {
//             throw new GraphQLError('Invalid creds', {
//                 extensions: { code: 'BAD_USER_INPUT' },
//             });
//         }
//         // if user/username already exists throw error
//         const existingUser = await Users.findOne({ username });
//         if (existingUser) {
//             throw new GraphQLError('Username is taken', {
//                 extensions: { code: 'BAD_USER_INPUT' },
//             });
//         }
        
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new Users({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         await newUser.save();

//         const token = signToken(newUser);

//         return { token, user: newUser };
//     },
// };

// export default { Query, Mutation };

