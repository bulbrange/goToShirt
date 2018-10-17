import GraphQLDate from 'graphql-date';
import { Group, Message, User } from './connectors';

export const resolvers = {
  Date: GraphQLDate,
  Query: {
    user: (_, args) => User.findOne({ where: args }),

    users: () => User.findAll(),
  },
  Mutation: {
    addNewUser: (_, args) => User.create(args),
    updateUserEmail: async (_, { id, email }) => {
      try {
        const userToUpdate = await User.find({ where: { id } });
        // userToUpdate.destoy();
        userToUpdate.update({ email });
        return userToUpdate;
      } catch (e) {
        console.log(e);
        throw new Error('To the parrot');
      }
    },
    delUser: async (_, { id }) => {
      const userToDel = await User.find({ where: { id } });
      userToDel.destroy();
      return userToDel;
    },
  },
};
export default resolvers;
