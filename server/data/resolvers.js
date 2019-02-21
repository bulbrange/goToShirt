import GraphQLDate from 'graphql-date';
import { withFilter, ForbiddenError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IP from '../ip';
import {
  User, Group, MessageGroup, Tshirt, TshirtTextures,
} from './connectors';
import JWT_SECRET from '../secret';

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
    messages: () => MessageGroup.findAll(),
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
      }).then(async (messages) => {
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
      }).catch(e => console.log(e));
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
        return MessageGroup.create(args.message);
        
        /*.then((message) => {
          // publish subscription notification with the whole message
          pubsub.publish(MESSAGE_ADDED_TOPIC, { [MESSAGE_ADDED_TOPIC]: message });
          return message;
        });*/
      });
      
    },
    addNewUser: async (_, args) => {
      const userPass = await bcrypt.hash(args.password, 10);
      args.password = userPass;
      User.create(args);
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
