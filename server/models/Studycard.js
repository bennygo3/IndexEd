import { Schema, model } from 'mongoose';

const studyCardSchema = new Schema(
    {
        front: {
            type: String,
            required: true,
        },
        back: {
            type: String,
            required: true,
        },
        studyGenres: {
            type: Schema.Types.ObjectId,
            ref: "StudyGenres",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const StudyCard = model('StudyCard', studyCardSchema);

export default StudyCard;