import GraphQLDate from 'graphql-date';
import {
  User, Group, MessageGroup, Tshirt, TshirtTextures,
} from './connectors';

/*
    tshirtsByGroup: (_, args) => {
      return Tshirt.findAll({ where: args, order: [['updatedAt', 'DESC']] }),
    }
*/

export const resolvers = {
  Date: GraphQLDate,
  Query: {
    user: (_, args) => User.findOne({ where: args }),
    userById: (_, args) => User.findOne({ where: args }),
    userByEmail: (_, args) => User.findOne({ where: args }),
    users: () => User.findAll(),
    group: (_, args) => Group.find({ where: args }),
    groups: async (_, { userId }) => {
      const user = await User.findOne({ where: { id: userId } });
      console.log(user);
      return user.getGroups();
    },
    messages: (_, args) => MessageGroup.find({ where: args }),
    textures: (_, { tshirtId }) => TshirtTextures.findAll({ where: { tshirtId } }),
    tshirt: (_, args) => Tshirt.findOne({ where: args }),
    tshirts: (_, args) => Tshirt.findAll({ where: args, order: [['updatedAt', 'DESC']] }),
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
    addNewShirt: async (_, args) => Tshirt.create(args),
    addTexture: async (
      _,
      {
        texture: {
          source,
          posX,
          posY,
          renderSize,
          backgroundColor,
          tintColor,
          face,
          tshirtId,
          rotate,
          text,
        },
      },
    ) => TshirtTextures.create({
      source,
      posX,
      posY,
      renderSize,
      backgroundColor,
      tintColor,
      face,
      tshirtId,
      rotate,
      text,
    }),
    cleanShirtTextures: async (_, { tshirtId }) => {
      await TshirtTextures.destroy({ where: { tshirtId } });
      return Tshirt.findOne({ where: tshirtId });
    },
    updateShirtName: async (_, { tshirtId, name }) => Tshirt.findOne({ where: { id: tshirtId } }).then(tshirt => tshirt.update({ name })),
    updateShirtColor: async (_, { tshirtId, color }) => Tshirt.findOne({ where: { id: tshirtId } }).then(tshirt => tshirt.update({ color })),
    removeShirt: async (_, { tshirtId }) => {
      const tshirt = await Tshirt.findOne({ where: { id: tshirtId } });
      await TshirtTextures.destroy({ where: { tshirtId } });
      await Tshirt.destroy({ where: { id: tshirtId } });
      return tshirt;
    },
  },
  Tshirt: {
    async texture(tshirt) {
      return TshirtTextures.findAll({ where: { tshirtId: tshirt.id } });
    },
  },
  Group: {
    users(group) {
      return group.getUsers();
    },
    messages(group) {
      return MessageGroup.findAll({
        where: { groupId: group.id },
        order: [['createdAt', 'DESC']],
      });
    },
    tshirts(group) {
      return group.getTshirts();
    },
  },

  User: {
    groups(user) {
      return user.getGroups();
    },
  },
};
export default resolvers;
