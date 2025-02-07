import { Schema, model } from 'mongoose';
import dateFormat from '../utils/dateFormat.js';

const studyGenreSchema = new Schema(
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
        studyCards: [
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

const StudyGenre = model('StudyGenre', studyGenreSchema);

export default StudyGenre;