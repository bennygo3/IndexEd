import { Stack, Studycard, User, SnakeScore } from '../models/index.js';
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
      return await Stack.find({});//.populate('studycards');
    },
    studycards: async (parent, args) => {
      return Studycard.find({});
    },
    studycard: async (parent, { _id }) => {
      return await Studycard.findById(_id);
    },
    //find the user by ID, and populate studycards and stacks at the same time
    currentUser: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const user = await User.findById(context.user._id)
        .populate({
          path: 'stacks',
          populate: { path: 'studycards' }
        });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },
    getHighSnakeScore: async(_, { userId }) => {
      const snakeScore = await SnakeScore.findOne({ userId });
      return snakeScore || { userId, highSnakeScore: 0 };
    }
  },
  Mutation: {
    //this is creating a user from the sign up page and starting them with a misc stack of cards to save new cards to
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const miscStack = await Stack.create({
        title: "Miscellaneous",
        category: "General",
        description: "A default stack for miscellaneous cards",
        author: user._id
      });
      user.stacks.push(miscStack._id);
      await user.save();
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

      const miscStack = await Stack.findOne({ title: "Miscellaneous", author: user._id });

      if (!miscStack) {
        // Creates a misc. stack for a user if it doesn't exist
        const newMiscStack = await Stack.create({
          title: "Miscellaneous",
          category: "General",
          description: "A default stack for miscellaneous cards",
          author: user._id
        });
        user.stacks.push(newMiscStack._id);
        await user.save();
      }

      const token = signToken(user);

      return { token, user };
    },
    createStudycard: async (_, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create a flashcard');
      }

      const { front, back, stackId } = input;

      const miscStack = await Stack.findOne({
        author: context.user._id,
        title: "Miscellaneous"
      });

      if (!miscStack) {
        throw new Error("Miscellaneous stack not found");
      }

      // Use stackId if provided or default to the "Misc." stack
      const assignedStackId = stackId || miscStack._id;

      const studycardData = { front, back };
      if (assignedStackId) {
        studycardData.stack = assignedStackId;
      }
      
      const studycard = await Studycard.create(studycardData);

      // Add studycard to the stack if a stackId is provided
      if (assignedStackId) {
        await Stack.findByIdAndUpdate(assignedStackId, {
          $push: { studycards: studycard._id }
        });
      }
      
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
        author: context.user._id 
      });
      
      // Add this stack to the user's stack/s
      await User.findByIdAndUpdate(context.user._id, { $push: { stacks: stack._id } });
      
      return stack;
    },
    updateStudycard: async (_, { _id, question, answer, noteSideA, noteSideB }, context) => {
      if (!_id) {
        throw new Error('Flashcard ID is required to update')
      }

      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update a flashcard.');
      }

      //Fetch the flashcard first to verify the owner
      const studycard = await Studycard.findById(_id);
      if (!flashcard) {
        throw new Error('Flashcard not found.');
      }

      if (String(studycard.creator) !== String(context.user._id)) {
        throw new ForbiddenError('You do not have permission to update this flashcard')
      }

      const updateFields = {
        front,
        back,
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
      if(String(stack.author) !== String(context.user._id)) {
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
    },
    updateHighSnakeScore: async (_, { userId, newSnakeScore }) => {
      let snakeScore = await SnakeScore.findOne({ userId });
      if (snakeScore) {
        if (newSnakeScore > snakeScore.highSnakeScore) {
          snakeScore.highSnakeScore = newSnakeScore;
          await snakeScore.save();
        } else {
          snakeScore = new SnakeScore({ userId, highSnakeScore: newSnakeScore });
          await snakeScore.save();
          await User.findByIdAndUpdate(userId, { $push: { snakeScores: snakeScore._id } });
        }
        return snakeScore;
      }
    },
  },
};

export default resolvers;