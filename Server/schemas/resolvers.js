// import { UserInputError, AuthenticationError, ForbiddenError } from '@apollo/server/errors';
import { Deck, Flashcard, User } from '../models/index.js';
import { signToken } from '../utils/auth.js';

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.code = 'UNAUTHENTICATED';
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.code = 'FORBIDDEN';
  }
}

const resolvers = {
  Query: {
    decks: async () => {
      //find all the decks for the homepage and populate the JUST THE DECKS
      return await Deck.find({});//.populate('flashcards');
    },
    //populate one flashcard at a time from the corresponding deck by id
    flashcards: async (parent, args) => {
      return Flashcard.find({});
    },
    flashcard: async (parent, { _id }) => {
      return await Flashcard.findById(_id);
    },
    //find the user by ID, and populate flashcards and decks at the same time
    currentUser: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const user = await User.findById(context.user._id)
        .populate({
          path: 'decks',
          populate: 'flashcards'
        });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },
  },
  Mutation: {
    //this is creating a user from the sign up page
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    //adding a deck from the navbar on the side = on the plus sign on page 6 of wireframe, component is deck_create, associated with next button
    addDeck: async (_, { title, category, description }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create a new deck.');
      }
      
      const deck = await Deck.create({ 
        title, 
        category,
        description,
        author: context.user._id 
      });
      
      // Add this deck to the user's deck/s
      await User.findByIdAndUpdate(context.user._id, { $push: { decks: deck._id } });
      
      return deck;
    },
    // this will be the 'plus' on the same 'next' page from the same component as the previous one
    addFlashCard: async (_, { sideA, sideB, deckId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create a flashcard');
      }

      const deck = await Deck.findById(deckId);
      if (!deck) {
        throw new Error('Deck not found.');
      }
      
      const flashcard = await Flashcard.create({ 
        sideA, 
        sideB,
        deck: deckId,
        creator: context.user._id
      });

      // Store flashcards inside Deck model:
      await Deck.findByIdAndUpdate(deckId, { $push: { flashcards: flashcard._id } });
      
      return flashcard;
    },
    // NOT NECESSARILY FUNCTIONING IN THE CURRENT SETUP - OPTIONAL
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    //appends information to the deck, title, category, description should be called from slide 5 of wireframe
    updateDeck: async (_, { deckId, title, category, description }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update a deck.');
      }

      // Check if the user is the author of the deck
      const deck = await Deck.findById(deckId);
      if(String(deck.author) !== String(context.user._id)) {
        throw new ForbiddenError('In order to update this deck, you must be the original author.');
      }

      return await Deck.findByIdAndUpdate(deckId, { title, category, description }, { new: true });
    },
    //same thing as previous but updating a flashcard - NOT NECESSARILY BEING FUNCTIONAL WITH CURRENT WIREFRAME SETUP
    updateFlashCard: async (_, { _id, sideA, sideB, noteSideA, noteSideB }, context) => {
      if (!_id) {
        throw new Error('Flashcard ID is required to update')
      }

      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update a flashcard.');
      }

      //Fetch the flashcard first to verify the owner
      const flashcard = await Flashcard.findById(_id);
      if (!flashcard) {
        throw new Error('Flashcard not found.');
      }

      if (String(flashcard.creator) !== String(context.user._id)) {
        throw new ForbiddenError('You do not have permission to update this flashcard')
      }

      const updateFields = {
        sideA,
        sideB,
        noteSideA,
        noteSideB
      };

      // Filter out undefined fields
      for (let field in updateFields) {
        if (updateFields[field] === undefined) {
          delete updateFields[field];
        }
      }

      const updatedFlashCard = await Flashcard.findByIdAndUpdate(_id, updateFields, { new: true});
        
      if (!updatedFlashcard) {
        throw new Error('Failed to update flashcard.');
      }

      return updatedFlashcard;
    },
    // this doesn't exit yet - PASSWORD MUST BE LONGER THAN 8 CHARACTERS TO WORK
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUserIsNewField: async (_, { userId, isNewUser }) => {
      return await User.findByIdAndUpdate(
        userId,
        { isNewUser },
        { new: true }
      );
    }
  }
};

export default resolvers;