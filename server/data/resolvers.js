import GraphQLDate from 'graphql-date';
import {
  User, Group, MessageGroup, Tshirt, TshirtTextures,
} from './connectors';

export const resolvers = {
  Date: GraphQLDate,
  Query: {
    user: (_, args) => User.findOne({ where: args }),
    users: () => User.findAll(),
    group: (_, args) => Group.findOne({ where: args }),
    groups: () => Group.findAll(),
    messages: (_, args) => MessageGroup.find({ where: args }),
    tshirts: (_, args) => Tshirt.find({ where: args }),
  },
  Mutation: {
    addNewUser: async (_, args) => User.create(args),
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
