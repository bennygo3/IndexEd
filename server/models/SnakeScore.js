import { Schema, model } from 'mongoose';

const snakeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    highScore: {
        type: Number,
        required: true
    }
});

const SnakeScore = model('SnakeScore', snakeSchema);

export default SnakeScore;