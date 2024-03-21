import { Schema, model } from 'mongoose';
import userSchema from './User.js';
import studycardSchema from './Studycard.js';
import dateFormat from '../utils/dateFormat.js';

const stackSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        date_created: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => dateFormat(timestamp),
        },
        author:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        studycards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Studycard'
            }

        ],
    }
);

const Stack = model('Stack', stackSchema);

export default Stack;