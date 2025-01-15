import { Schema, model } from 'mongoose';
import dateFormat from '../utils/dateFormat.js';

const studyCardsSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
        },
        description: {
            type: String,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        studycards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'StudyCard',
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
        toJSON: {
            getters: true, // Ensures getters like dateFormat are applied when converting to JSON
        },
        toObject: {
            getters: true,
        },
    }
);

const StudyCardsGroup = model('StudyCards', studyCardsSchema);

export default StudyCardsGroup;