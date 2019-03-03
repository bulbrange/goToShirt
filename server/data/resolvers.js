import R from 'ramda';
import GraphQLDate from 'graphql-date';
import { withFilter, ForbiddenError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IP from '../ip';
import {
  User, Group, MessageGroup, Tshirt, TshirtTextures, GroupTshirt,
} from './connectors';
import JWT_SECRET from '../secret';
import { pubsub } from '../subscriptions';

const MESSAGE_ADDED_TOPIC = 'messageAdded';
const GROUP_ADDED_TOPIC = 'groupAdded';

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
    userById: async (_, args, ctx) => {
      if (!ctx.user) {
        throw new ForbiddenError('Unauthorized');
      }
      return ctx.user.then((user) => {
        if (!user) {
          throw new ForbiddenError('Unauthorized');
        }
        return User.findOne({ where: { id: user.dataValues.id } });
      });
    },
    userByEmail: (_, args) => User.findOne({ where: args }),
    users: () => User.findAll(),
    group: (_, args) => Group.find({ where: args }),
    groups: async (_, { userId }) => {
      const user = await User.findOne({ where: { id: userId } });
      console.log(user);
      return user.getGroups();
    },
    messages: () => MessageGroup.findAll({order: [['createAt', 'DESC']] }),
    message: async (_, { groupId, connectionInput }) => {
      const { first, after } = connectionInput;

      const where = { groupId };
      if (after) {
        where.id = { $lt: Buffer.from(after, 'base64').toString() };
      }
      return MessageGroup.findAll({
        where,
        order: [['id', 'DESC']],
        limit: first,
      })
        .then(async (messages) => {
          const edges = messages.map(message => ({
            cursor: Buffer.from(message.id.toString()).toString('base64'), // convert id to cursor
            node: message, // the node is the message itself
          }));

          return {
            edges,
            pageInfo: {
              hasNextPage() {
                if (messages.length < first) {
                  return Promise.resolve(false);
                }

                return MessageGroup.findOne({
                  where: {
                    groupId,
                    id: {
                      $lt: messages[messages.length - 1].id,
                    },
                  },
                  order: [['id', 'DESC']],
                }).then(message => !!message);
              },
              hasPreviousPage() {
                return MessageGroup.findOne({
                  where: {
                    groupId,
                    id: where.id,
                  },
                  order: [['id']],
                }).then(message => !!message);
              },
            },
          };
        })
        .catch(e => console.log(e));
    },
    textures: (_, { tshirtId }) => TshirtTextures.findAll({ where: { tshirtId } }),
    tshirt: (_, args) => Tshirt.findOne({ where: args }),
    tshirts: (_, args) => Tshirt.findAll({ where: args, order: [['updatedAt', 'DESC']] }),
  },
  Mutation: {
    async createMessage(_, args, ctx) {
      console.log('CTX: ', ctx);
      if (!ctx.user) {
        throw new ForbiddenError('Unauthorized');
      }
      return ctx.user.then((user) => {
        if (!user) {
          throw new ForbiddenError('Unauthorized');
        }
        console.log('CTX: ', user);
        return MessageGroup.create(args.message).then((message) => {
          // publish subscription notification with the whole message
          pubsub.publish(MESSAGE_ADDED_TOPIC, { [MESSAGE_ADDED_TOPIC]: message });
          return message;
        });
      });
    },
    addNewUser: async (_, args) => {
      args.password = await bcrypt.hash(args.password, 10);
      return User.create(args);
    },
    share: async (_, { tshirtId, groupId }) => {
      GroupTshirt.create({
        groupId,
        tshirtId,
      });
      const thsirt = await Tshirt.findOne({ where: tshirtId });
      return thsirt;
    },
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
    async newGroup(
      _,
      {
        group: { name, userById, userId },
      },
    ) {
      const user = await User.findOne({ where: { id: userId } });
      const friends = await User.findAll({
        where: { id: { $in: userById } },
      });
      const group = await Group.create({
        name,
        users: [user, ...friends],
      });
      await group.addUsers([user, ...friends]).then((res) => {
        // append the user list to the group object
        // to pass to pubsub so we can check members
        group.users = [user, ...friends];
        pubsub.publish(GROUP_ADDED_TOPIC, { [GROUP_ADDED_TOPIC]: group });
        return group;
      });
      return group;
    },

    login(_, { email, password }, ctx) {
      return User.findOne({ where: { email } }).then((user) => {
        if (user) {
          return bcrypt.compare(password, user.password).then((res) => {
            if (res) {
              // create jwt
              const token = jwt.sign(
                {
                  id: user.id,
                  email: user.email,
                },
                JWT_SECRET,
              );
              ctx.user = Promise.resolve(user);
              user.jwt = token; // eslint-disable-line no-param-reassign
              return user;
            }
            return Promise.reject(new Error('password incorrect'));
          });
        }
        return Promise.reject(new Error('email not found'));
      });
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_ADDED_TOPIC),
        (payload, args) => {
          return Boolean(
            args.groupIds &&
            ~args.groupIds.indexOf(payload.messageAdded.groupId) &&
            args.userId !== payload.messageAdded.userId, // don't send to user creating message
          );
        },
      ),
    },
    groupAdded: { 
      subscribe: withFilter(
        () => pubsub.asyncIterator(GROUP_ADDED_TOPIC),
        (payload, args) => {
          const inGroup = (userId) => (user) => userId === user.id;
          return Boolean(
            args.userId &&
            R.filter(inGroup(args.userId), payload.groupAdded.users.map(user => user.dataValues)).length &&
            args.userId !== payload.groupAdded.users[0].id,
          );
        },
      ),
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
          if (!tshirts || tshirts.length == 0) {
            return {
              edges: [],
              pageInfo: {
                hasPreviousPage() {
                  return false;
                },
                hasNextPage() {
                  return false;
                },
              },
            };
          }
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
      return user.getTshirts({ order: [['updatedAt', 'DESC']] });
    },
    groups(user) {
      return user.getGroups();
    },
  },
  MessageGroup: {
    to(messageGroup) {
      return messageGroup.getGroup();
    },
    from(messageGroup) {
      return messageGroup.getUser();
    },
  },
};
export default resolvers;
