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
        }
    }
);

const Studycard = model('Studycard', studycardSchema);

export default Studycard;