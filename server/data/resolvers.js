import GraphQLDate from 'graphql-date';
import IP from '../ip';
import {
  User, Group, MessageGroup, Tshirt, TshirtTextures,
} from './connectors';

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
    message: (_, {groupId, connectionInput}) => {
      // MessageGroup.findAll({ where: args }),
      //const groupMessages = MessageGroup.findAll({ where: args.groupId });
      //console.log('<<<<<<<<<<<<<<<<<<<<<<<<', args);
      const { first, after } = connectionInput;

      // base query -- get messages from the right group
      const where = { groupId: groupId };
      console.log('<<<<<<<<<<BASE64<<<<<<<<<<<<<<', Buffer.from('1').toString('base64'));
      // because we return messages from newest -> oldest
      // after actually means older (id < cursor)

      if (after) {
        where.id = { $lt: Buffer.from(after, 'base64').toString() };
      }
      //console.log()
      //console.log('AFTER ID MESSAGE<<<<<<<<<<<<<',where.id);
      MessageGroup.findAll({
        where,
        order: [['id', 'DESC']],
        limit: first,
      }).then((messages) => {
        //console.log('MESSAGEEEEESSSSS', messages);
        const edges = messages.map(message => ({
          cursor: Buffer.from(message.id.toString()).toString('base64'), // convert id to cursor
          node: message.dataValues, // the node is the message itself
        
        }));
        //console.log("FINAL EDGES: ", edges);
        const result = {
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
        //console.log(result);
        //console.log(result)
        result.edges.forEach(edge => console.log(edge.node.text));
        return result;
      }).catch(e => console.log(e));
      //console.log("FINAL EDGES: ", edges);
      
    },
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
