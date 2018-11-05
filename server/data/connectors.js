import Sequelize from 'sequelize';
// initialize our database
const bcrypt = require('bcrypt');

const db = new Sequelize('goToShirt', null, null, {
  dialect: 'sqlite',
  storage: './goToShirt.sqlite',
  logging: false, // mark this true if you want to see logs
});

db.define('user', {
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});
const User = db.models.user;

db.define('group', {
  name: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
});
const Group = db.models.group;

db.define('tshirt', {
  userId: { type: Sequelize.INTEGER },
  name: { type: Sequelize.STRING },
  color: { type: Sequelize.STRING },
});
const Tshirt = db.models.tshirt;

db.define('messageGroup', {
  text: { type: Sequelize.STRING },
});
const MessageGroup = db.models.messageGroup;

db.define('tshirtTextures', {
  src: { type: Sequelize.STRING },
  posX: { type: Sequelize.INTEGER },
  posY: { type: Sequelize.INTEGER },
  renderSize: { type: Sequelize.INTEGER },
  face: { type: Sequelize.STRING },
  tshirtId: { type: Sequelize.INTEGER },
});
const TshirtTextures = db.models.tshirtTextures;

// setting up model operations
/* User.beforeCreate((user) => {
  try {
    user.password = bcrypt.hashSync(user.password, 10);
  } catch (e) {
    throw new Error('Something went wrong making password hash...', e);
  }
}); */
User.belongsToMany(Group, { through: 'userGroups' });
Group.belongsToMany(Tshirt, { through: 'groupTshirts' });
MessageGroup.belongsTo(Group);
MessageGroup.belongsTo(User);
TshirtTextures.belongsTo(Tshirt);

export {
  db, User, Group, Tshirt, MessageGroup, TshirtTextures,
};
