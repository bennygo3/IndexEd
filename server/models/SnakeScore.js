import { Schema, model } from 'mongoose';

const snakeScoreSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    highScore: {
        type: Number,
        required: true,
    }
});

const SnakeScore = model('SnakeScore', snakeScoreSchema);

export default SnakeScore;