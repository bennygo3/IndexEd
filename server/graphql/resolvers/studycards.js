import StudyCard from "../../models/StudyCard.js";
import StudyCardGroups from "../../models/StudyCardGroups.js";
import { GraphQLError } from 'graphql';

export const Query = {
    // Get all StudyCard groups
    async getStudyCardGroups(_, __, context) {
        if (!context.user) {
            throw new GraphQLError('You must be logged in to view these study cards!', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        // Fetch cards authored by the logged-in user
        return await StudyCardGroups.find({ author: context.user._id }).populate('studycards');
    },

    // Get a single study card group by id
    async getStudyCardGroup(_, { groupId }, context) {
        if (!context.user) {
            throw new GraphQLError('You must be logged in to view this section.', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        const group = await StudyCardGroups.findById(groupId).populate('studycards');
        if (!group) {
            throw new GraphQLError('Study cards not found', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        return group;
    },

    async studycards() {
        return await StudyCard.find({});
    },

    async studycard(_, { id }) {
        const card = await StudyCard.findById(id);
        if (!card) {
            throw new GraphQLError('Card not found.', {
                extensions: { code: 'BAD_USER_INPUT'},
            });
        }

        return card;
    },
};

export const Mutation = {
    // Create a new StudyCard group
    async createStudyCardGroup(_, { title, category, description }, context) {
        if (!context.user) {
            throw new GraphQLError('You must be logged in to create a new genre of study cards', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        const newGroup = new StudyCardGroups({
            title,
            category,
            description,
            author: context.user.id,
        });

        return await newGroup.save();
    },
    
    // Add a StudyCard to a StudyCardGroup
    async createStudyCard(_, { front, back, groupId }, context) {
        if (!context.user) {
            throw new GraphQLError('You must be logged in to create a new study card', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        // Find the StudyCard group
        const group = await StudyCardGroups.findById(groupId);
        if(!group) {
            throw new GraphQLError('Study cards not found', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }

        // Create a new StudyCard
        const newCard = new StudyCard({ front, back, defaultGroup: groupId });
        const savedCard = await newCard.save();

        // Add the StudyCard to the group's studycards array
        group.studycards.push(savedCard._id);
        await group.save();

        return savedCard;
    },
};

export default { Query, Mutation };

//async updateStudyCardGroup(_, { groupId, title, category, description }, context) {
    //     if (!context.user) {
    //         throw new GraphQLError('You must be logged in to update these study cards', {
    //             extensions: { code: 'UNAUTHENTICATED' },
    //         });
    //     }

    //     const updateFields = {};
    //     if (title) updateFields.title = title;
    //     if (category) updateFields.category = category;
    //     if (description) updateFields.description = description;

    //     const updatedGroup = await StudyCardGroups.findByIdAndUpdate(
    //         groupId,
    //         { $set: updateFields },
    //         { new: true }
    //     );

    //     if (!updatedGroup) {
    //         throw new GraphQLError('Study cards not found or update failed', {
    //             extenions: { code: 'BAD_USER_INPUT' },
    //         });
    //     }

    //     return updatedGroup;
    // },

   // Delete a StudyCard group
    // async deleteStudyCardGroup(_, { groupId }, context) {
    //     if(!context.user) {
    //         throw new GraphQLError('You must be logged in to delete a group of study cards', {
    //             extenstions: { code: 'UNAUTHENTICATED' },
    //         });
    //     }

    //     const deletedGroup = await StudyCardGroups.findByIdAndDelete(groupId);

    //     if (!deletedGroup) {
    //         throw new GraphQLError('Study cards not found or they have already been deleted', {
    //             extensions: { code: 'BAD_USER_INPUT' },
    //         });
    //     }

    //     return true;
    // },

    // Delete a StudyCard
    // async deleteStudyCard(_, { cardId }, context) {
    //     if (!context.user) {
    //         throw new GraphQLError('You must be logged in to delete this study card', {
    //             extensions: { code: 'UNAUTHENTICATED' },
    //         });
    //     }

    //     const deletedCard = await StudyCard.findByIdAndDelete(cardId);

    //     if (!deletedCard) {
    //         throw new GraphQLError('Study card not found or it has already been deleted', {
    //             extensions: { code: 'BAD_USER_INPUT' },
    //         });
    //     }

        // Remove the StudyCard from its parent group's studycards array
    //     await StudyCardGroups.updateOne(
    //         { studycards: cardId },
    //         { $pull: { studycards: cardId } }
    //     );

    //     return true;
    // },