import StudyCard from "../../models/StudyCard.js";
import StudyGenres from "../../models/StudyGenres.js";
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
        return await StudyGenres.find({ author: context.user._id }).populate('studyCards');
    },

    // Get a single study card group by id
    async getStudyGenre(_, { studyGenreId }, context) {
        if (!context.user) {
            throw new GraphQLError('You must be logged in to view this section.', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        const genre = await StudyGenres.findById(studyGenreId).populate('studyCards');
        if (!genre) {
            throw new GraphQLError('Study cards not found', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        return genre;
    },

    async studyCard(_, { id }) {
        const card = await StudyCard.findById(id);
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

        const newGenre = new StudyGenres({
            title,
            category,
            description,
            author: context.user._id,
        });

        return await newGenre.save();
    },

    // Add a StudyCard to a StudyCardGroup
    async createStudyCard(_, { front, back, studyGenreId }, context) {
        if (!context.user) {
            throw new GraphQLError('You must be logged in to create a new study card', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        console.log("📌 studyGenreId received:", studyGenreId);
        if (!studyCardGroupId) {
            throw new GraphQLError('studyCardGroupId is missing!', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        } 
        let genre;
        
        // const group = await StudyCardGroup.findById(studyCardGroupId);
        if (studyGenreId) {
            genre = await StudyGenres.findById(studyGenreId);
            if (!genre) {
                throw new GraphQLError('Study card group not found', {
                    extensions: { code: 'BAD_USER_INPUT' },
                });
            }
        } else {
            genre = await StudyGenres.findOne({ title: "General", author: context.user._id });

            if (!genre) {
                genre = new StudyGenres({
                    title: "General",
                    category: "Unsorted",
                    description: "Default study genre",
                    author: context.user._id,
                });

                await genre.save();
            }

            studyGenreId = genre._id;
        }

        // Create a new StudyCard
        const newCard = new StudyCard({ front, back, defaultGroup: studyCardGroupId, });
        const savedCard = await newCard.save();

        // Add the StudyCard to the group's studycards array
        genre.studycards.push(savedCard._id);
        await genre.save();

        return savedCard;
    },
};

export default { Query, Mutation };