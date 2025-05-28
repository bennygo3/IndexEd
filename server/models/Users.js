import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Must use a valid email address'],
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        refreshTokens: [
            {
                token: { type: String, required: true },
                expires: { type: Date, required: true },
                createdAt: { type: Date, default: Date.now },
                revoked: { type: Boolean, default: false },
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        studyGenres: [
            {
                type: Schema.Types.ObjectId,
                ref: 'StudyGenre',
            },
        ],
        studyCards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'StudyCard'
            }
        ],
        snakeScores: [
            {
                type: Schema.Types.ObjectId,
                ref: 'SnakeScore',
            }
        ],
        isNewUser: {
            type: Boolean, 
            default: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
        toJSON: {
            virtuals: true, // Allows virtuals to be included in JSON output
        },
        toObject: {
            virtuals: true,
        },
    }
);

// Middleware hasher pre saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is modified
    const saltRounds = 10; // cost factor for hashing
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Virtual to count total studycards
userSchema.virtual('studyGenreCount').get(function () {
    return this.studyGenres ? this.studyGenres.length : 0;
});

const User = model('User', userSchema);

export default User;