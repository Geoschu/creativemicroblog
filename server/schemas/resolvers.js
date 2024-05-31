const { User, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {

    users: async () => {
      
      return await User.find({});
    },
    user: async (_, {id}) => {
      return await User.findById(id);
    },
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, profPic }) => {
      const user = await User.create({ username, email, password, profPic });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText, url }, context) => {
      if (context.user) {
        console.log("this should be" + url);
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
          url
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },

    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    followUser: async (_, { id }, context) => {
      // Find the current user and the target user
      const currentUser = context.currentUser;
      const targetUser = await User.findById(id);

      if (!currentUser ||!targetUser) {
        throw new Error('User not found');
      }

      // Add the target user to the current user's followers array
      currentUser.followers.push(targetUser._id);
      await currentUser.save();

      // Optionally, add the current user to the target user's following array
      targetUser.following.push(currentUser._id);
      await targetUser.save();

      return currentUser;
    },
    unfollowUser: async (_, { id }, context) => {
      // Similar to followUser, but remove the target user from the current user's followers array
      const currentUser = context.currentUser;
      const targetUser = await User.findById(id);

      if (!currentUser ||!targetUser) {
        throw new Error('User not found');
      }

      const index = currentUser.followers.indexOf(targetUser._id);
      if (index > -1) {
        currentUser.followers.splice(index, 1);
      }

      await currentUser.save();

      return currentUser;
    },
  },
};  
  


module.exports = resolvers;
