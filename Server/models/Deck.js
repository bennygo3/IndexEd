import { Schema, model } from 'mongoose';
import userSchema from './User.js';
import flashcardSchema from './Flashcard.js';
import dateFormat from '../utils/dateFormat.js';

const deckSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        //create helper function for Date Format
        date_created: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => dateFormat(timestamp),
            //this will be a getter function
        },
        //do we need another value here?  name from author schema? - 
        author:
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        flashcards: [
            {   
                type: Schema.Types.ObjectId,
                ref: 'Flashcard'
            }
            //WOULD LIKE TO SHOW SIDEA HERE
        ],
    }
);

const Deck = model('Deck', deckSchema);

export default Deck;