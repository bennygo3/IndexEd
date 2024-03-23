import { Stack, Studycard, User } from '../models/index.js';
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
    stacks: async () => {
      //find all the decks for the homepage and populate the just the stacks
      return await Stack.find({});//.populate('studycards');
    },
    studycards: async (parent, args) => {
      return Studycard.find({});
    },
    //populate one flashcard at a time from the corresponding deck by id
    studycard: async (parent, { id }) => {
      return await Studycard.findById(id);
    },
    //find the user by ID, and populate studycards and stacks at the same time
    currentUser: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const user = await User.findById(context.user.id)
        .populate({
          path: 'stack',
          populate: 'studycard'
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
    createStudycard: async (_, { question, answer, stackId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create a flashcard');
      }

      const stack = await Stack.findById(stackId);
      if (!stack) {
        throw new Error('Stack not found.');
      }
      
      const studycard = await Studycard.create({ 
        question, 
        answer,
        stack: stackId,
        creator: context.user.id
      });

      // Store flashcards inside Stack model:
      await Stack.findByIdAndUpdate(stackId, { $push: { studycards: studycard.id } });
      
      return studycard;
    },
    //adding a deck from the navbar on the side = on the plus sign on page 6 of wireframe, component is deck_create, associated with next button
    createStack: async (_, { title, category, description }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create a new deck.');
      }
      
      const stack = await Stack.create({ 
        title, 
        category,
        description,
        author: context.user.id 
      });
      
      // Add this stack to the user's stack/s
      await User.findByIdAndUpdate(context.user.id, { $push: { stacks: stack.id } });
      
      return stack;
    },
    updateStudycard: async (_, { id, question, answer, noteSideA, noteSideB }, context) => {
      if (!id) {
        throw new Error('Flashcard ID is required to update')
      }

      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update a flashcard.');
      }

      //Fetch the flashcard first to verify the owner
      const studycard = await Studycard.findById(id);
      if (!flashcard) {
        throw new Error('Flashcard not found.');
      }

      if (String(studycard.creator) !== String(context.user.id)) {
        throw new ForbiddenError('You do not have permission to update this flashcard')
      }

      const updateFields = {
        question,
        answer,
        noteSideA,
        noteSideB
      };

      // Filter out undefined fields
      for (let field in updateFields) {
        if (updateFields[field] === undefined) {
          delete updateFields[field];
        }
      }

      const updatedStudycard = await Studycard.findByIdAndUpdate(_id, updateFields, { new: true});
        
      if (!updatedStudycard) {
        throw new Error('Failed to update flashcard.');
      }

      return updatedStudycard;
    },
    // NOT NECESSARILY FUNCTIONING IN THE CURRENT SETUP - OPTIONAL
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    //appends information to the deck, title, category, description should be called from slide 5 of wireframe
    updateStack: async (_, { stackId, title, category, description }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update a deck.');
      }

      // Check if the user is the author of the deck
      const stack = await Stack.findById(stackId);
      if(String(stack.author) !== String(context.user.id)) {
        throw new ForbiddenError('In order to update this deck, you must be the original author.');
      }

      return await Stack.findByIdAndUpdate(stackId, { title, category, description }, { new: true });
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