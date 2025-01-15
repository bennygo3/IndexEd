import StudyCard from "../../models/StudyCard";
import StudyCardGroups from "../../models/StudyCardGroups";
import { AuthenticationError, UserInputError } from '@apollo/server';

export const Query = {
    // Get all StudyCard groups
    async getStudyCardGroups(_, __, context) {
        if (!context.user) {
            throw new AuthenticationError('You must be logged in to view these study cards!');
        }

        // Fetch cards authored by the logged-in user
        return await StudyCards.find({ author: context.user.id }).populate('studycards');
    },

    // Get a single study card group by id
    async getStudyCardGroup(_, { groupId }, context) {
        if (!context.user) {
            throw new AuthenticationError('You must be logged in to view this section.');
        }

        const studyCardGroup = await StudyCards.findById(groupId).populate('studycards');

        if (!studyCardGroup) {
            throw new UserInputError('Study cards not found')
        }

        return studyCardGroup;
    },
};

export const Mutation = {
    // Create a new StudyCard group
    async createStudyCardGroup(_, { title, category, description }, context) {
        if (!context.user) {
            throw new AuthenticationError('You must be logged in to create a new genre of study cards')
        }

        const newGroup = new StudyCards({
            title,
            category,
            description,
            author: context.user.id,
        });

        return await newGroup.save();
    },

    // Delete a StudyCard group
    async deleteStudyCardGroup(_, { groupId }, context) {
        if(!context.user) {
            throw new AuthenticationError('You must be logged in to delete a group of study cards')
        }

        const deletedGroup = await StudyCards.findByIdAndDelete(groupId);

        if (!deletedGroup) {
            throw new UserInputError('Study cards not found or they have already been deleted')
        }

        return true;
    },

    // Update a StudyCard group
    async updateStudyCardGroup(_, { groupId, title, category, description }, context) {
        if (!context.user) {
            throw new AuthenticationError('You must be logged in to update these study cards')
        }

        const updateFields = {};
        if (title) updateFields.title = title;
        if (category) updateFields.category = category;
        if (description) updateFields.description = description;

        const updatedGroup = await StudyCards.findByIdAndUpdate(
            groupId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedGroup) {
            throw new UserInputError('Study cards not found or update failed')
        }

        return updatedGroup;
    },

    // Add a StudyCard to a StudyCardGroup
    async createStudyCard(_, { front, back, groupId }, context) {
        if (!context.user) {
            throw new AuthenticationError('You must be logged in to create a new study card')
        }

        // Find the StudyCard group
        const group = await StudyCards.findById(groupId);
        if(!group) {
            throw new UserInputError('Study cards not found')
        }

        // Create a new StudyCard
        const newCard = new StudyCard({
            front, 
            back,
            defaultGroup: groupId,
        });

        const savedCard = await newCard.save();

        // Add the StudyCard to the group's studycards array
        group.studycards.push(savedCard._id);
        await group.save();

        return savedCard;
    },

    // Delete a StudyCard
    async deleteStudyCard(_, { cardId }, context) {
        if (!context.user) {
            throw new AuthenticationError('You must be logged in to delete this study card')
        }

        const deletedCard = await StudyCard.findByIdAndDelete(cardId);

        if (!deletedCard) {
            throw new UserInputError('Study card not found or it has already been deleted')
        }

        // Remove the StudyCard from its parent group's studycards array
        await StudyCards.updateOne(
            { studycards: cardId },
            { $pull: { studycards: cardId } }
        );

        return true;
    },
};

export default { Query, Mutation };