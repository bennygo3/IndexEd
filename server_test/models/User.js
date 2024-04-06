import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import stackSchema from './Stacks.js';

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            index: { unique: true },
            match: [/.+\@.+\..+/, 'Must use a valid email address']
        },
        username: {
            type: String,
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        stacks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Stack',
            }
        ],
        isNewUser: {
            type: Boolean,
            default: true
        }
    },
);

//Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

export default User;