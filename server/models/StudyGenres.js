import { Schema, model } from 'mongoose';
import dateFormat from '../utils/dateFormat.js';

const studyGenresSchema = new Schema(
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

const StudyGenres = model('StudyGenres', studyGenresSchema);

export default StudyGenres;