import { Schema, model } from 'mongoose';

const StudycardSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        answer: {
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

const Studycard = model('Studycard', StudycardSchema);

export default Studycard;