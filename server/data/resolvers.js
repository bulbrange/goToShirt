import GraphQLDate from 'graphql-date';
import IP from '../ip';
import {
  User, Group, MessageGroup, Tshirt, TshirtTextures,
} from './connectors';

export const resolvers = {
  Date: GraphQLDate,
  PageInfo: {
    hasNextPage(connection, args) {
      return connection.hasNextPage();
    },
    hasPreviousPage(connection, args) {
      return connection.hasPreviousPage();
    },
  },
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
    addNewShirt: async (_, args) => Tshirt.create({
      userId: args.userId,
      name: args.name,
      color: args.color,
    }).then(tshirt => tshirt.update({
      source: `http://${IP}:3333/front_${tshirt.id}.png`,
      sourceBack: `http://${IP}:3333/front_${tshirt.id}.png`,
    })),
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
    async tshirts(group, {
      first, last, before, after,
    }) {
      const where = {};

      if (before) {
        where.updatedAt = { $gt: before };
      }
      if (after) {
        where.updatedAt = { $lt: after };
      }

      const tshirtsGroup = await group
        .getTshirts({
          where,
          order: [['updatedAt', 'DESC']],
          limit: first,
        })
        .then((tshirts) => {
          const edges = tshirts.map(tshirt => ({
            cursor: tshirt.updatedAt, // convert id to cursor
            node: tshirt, // the node is the message itself
          }));

          return {
            edges,
            pageInfo: {
              hasPreviousPage() {
                return group
                  .getTshirts({
                    where: {
                      updatedAt: {
                        $gt: tshirts[0].updatedAt,
                      },
                    },
                    order: [['updatedAt', 'DESC']],
                  })
                  .then(tshirt => tshirt.length > 0);
              },

              hasNextPage() {
                if (tshirts.length < first) {
                  return Promise.resolve(false);
                }
                return group
                  .getTshirts({
                    where: {
                      updatedAt: {
                        $lt: tshirts[tshirts.length - 1].updatedAt,
                      },
                    },
                    order: [['updatedAt', 'DESC']],
                  })
                  .then(tshirt => tshirt.length > 0);
              },
            },
          };
        });

      return tshirtsGroup;
      // return group.getTshirts({});
    },
  },

  User: {
    tshirts(user) {
      return user.getTshirts({order: [['updatedAt', 'DESC']]});
    },
    groups(user) {
      return user.getGroups();
    },
  },
};
export default resolvers;
