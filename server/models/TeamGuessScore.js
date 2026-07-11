import { Schema, model } from 'mongoose';

const teamGuessScoreSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    league: {
        type: String,
        enum: ["nba", "nfl"],
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    totalTeams: {
        type: Number,
        required: true,
    },
    timeRemaining: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true
    }
);

const TeamGuessScore = model('TeamGuessScore', teamGuessScoreSchema);

export default TeamGuessScore;