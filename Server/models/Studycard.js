import { Schema, model } from 'mongoose';

const studycardSchema = new Schema(
    {
        front: {
            type: String,
            required: true,
        },
        back: {
            type: String,
            required: true,
        },
        stackTitle: {
            type: String,
        },
        stackId: {
            type: Schema.Types.ObjectId,
            ref: 'Stacks'
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

const Studycard = model('Studycard', studycardSchema);

export default Studycard;