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
        defaultGroup: {
            type: Schema.Types.ObjectId,
            ref: "StudyCards",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const StudyCard = model('StudyCard', studyCardSchema);

export default StudyCard;