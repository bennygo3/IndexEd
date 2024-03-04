import { Schema, model } from 'mongoose';

const flashcardSchema = new Schema(
    {
        sideA: {
            type: String,
            required: true,
        },
        sideB: {
            type: String,
            required: true,
        },
        noteSideA: {
            type: String,
        },
        noteSideB: {
            type: String,
        },

        deckTitle: {
            type: String,
        },

        deck: {
            type: Schema.Types.ObjectId,
            ref: 'Deck'
        },

        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

const Flashcard = model('Flashcard', flashcardSchema);

export default Flashcard;