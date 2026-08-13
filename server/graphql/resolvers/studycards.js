import StudyCard from "../../models/StudyCard.js";
import StudyGenre from "../../models/StudyGenre.js";
import Users from '../../models/Users.js';
import { GraphQLError } from 'graphql';

export const Query = {
    // Get all StudyCard groups
    async getStudyGenres(_, __, context) {
        if (!context.user) {
            throw new GraphQLError('You must be logged in to view these study cards!', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        // Fetch cards authored by the logged-in user
        return await StudyGenre.find({ author: context.user._id }).populate('studyCards');
    },

    // Get a single study card group by id
    async getStudyGenre(_, { studyGenreId }, context) {
        if (!context.user) {
            throw new GraphQLError('You must be logged in to view this section.', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        const genre = await StudyGenre.findById(studyGenreId).populate('studyCards');
        if (!genre) {
            throw new GraphQLError('Study cards not found', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        return genre;
    },

    async getStudyCard(_, { id }, context) {
        const userId = context.user?._id ?? context.user?.id;

        if (!userId) {
            throw new GraphQLError('You must be logged in', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }
        
        const card = await StudyCard.findOne({
            _id: id,
            authorId: userId,
        });

        if (!card) {
            throw new GraphQLError('Card not found.', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        return card;
    },
};

export const Mutation = {
    // Create a new StudyCard group
    async createStudyGenre(_, { title, category, description }, context) {
        if (!context.user) {
            throw new GraphQLError('You must be logged in to create a new genre of study cards', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        const userId = context.user._id ?? context.user.id;
        const cleanedTitle = title.trim();

        if (!cleanedTitle) {
            throw new GraphQLError('A genre title is required', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        const newGenre = await StudyGenre.create({
            title: cleanedTitle,
            category,
            description,
            author: userId,
        });

        await Users.findByIdAndUpdate(userId, {
            $addToSet: {
                studyGenres: newGenre._id,
            },
        });

        return newGenre;
    },

    // Add a StudyCard to a StudyCardGroup
    async createStudyCard(_, { front, back, studyGenreId }, context) {

        if (!context.user) {
            throw new GraphQLError('You must be logged in to create a new study card', {
                extensions: { code: 'UNAUTHENTICATED' } }
            );
        }

        console.log("📌 Creating study card with:", { front, back });

        const userId = context.user._id ?? context.user.id;
        let genre;

        if (studyGenreId) {
            genre = await StudyGenre.findOne({
                _id: studyGenreId,
                author: userId,
            });

            if (!genre) {
                throw new GraphQLError('Study genre not found', {
                    extensions: { code: 'BAD_USER_INPUT' },
                });
            }
        } else {
            genre = await StudyGenre.findOne({
                title: 'Misc.',
                author: userId,
            });

            if (!genre) {
                genre = await StudyGenre.create({
                    title: 'Misc.',
                    category: 'Unsorted',
                    description: 'Study cards that have not been grouped yet',
                    author: userId,
                });
            }
        }

        const savedCard = await StudyCard.create({
            front: front.trim(),
            back: back.trim(),
            studyGenreId: genre._id,
            authorId: userId,
            authorUsername: context.user.username,
        });

        await StudyGenre.findByIdAndUpdate(genre._id, {
            $addToSet: { studyCards: savedCard._id },
        });

        await Users.findByIdAndUpdate(userId, {
            $addToSet: {
                studyCards: savedCard._id,
                studyGenres: genre._id,
            },
        });

        return savedCard;
}
};

export default { Query, Mutation };