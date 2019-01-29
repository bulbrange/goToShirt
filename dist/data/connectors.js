'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupTshirt = exports.UserGroups = exports.TshirtTextures = exports.MessageGroup = exports.Tshirt = exports.Group = exports.User = exports.db = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize our database
// const bcrypt = require('bcrypt');

var db = new _sequelize2.default('goToShirt', null, null, {
  dialect: 'sqlite',
  storage: './goToShirt.sqlite',
  logging: false // mark this true if you want to see logs
});

db.define('user', {
  email: { type: _sequelize2.default.STRING },
  username: { type: _sequelize2.default.STRING },
  password: { type: _sequelize2.default.STRING },
  phone: { type: _sequelize2.default.STRING }
});
var User = db.models.user;

db.define('group', {
  name: { type: _sequelize2.default.STRING },
  image: { type: _sequelize2.default.STRING }
});
var Group = db.models.group;

db.define('tshirt', {
  userId: { type: _sequelize2.default.INTEGER },
  name: { type: _sequelize2.default.STRING },
  color: { type: _sequelize2.default.STRING }
});
var Tshirt = db.models.tshirt;

db.define('messageGroup', {
  text: { type: _sequelize2.default.STRING }
});
var MessageGroup = db.models.messageGroup;

db.define('tshirtTextures', {
  source: { type: _sequelize2.default.STRING },
  posX: { type: _sequelize2.default.INTEGER },
  posY: { type: _sequelize2.default.INTEGER },
  renderSize: { type: _sequelize2.default.INTEGER },
  face: { type: _sequelize2.default.STRING },
  tshirtId: { type: _sequelize2.default.INTEGER },
  backgroundColor: { type: _sequelize2.default.STRING },
  tintColor: { type: _sequelize2.default.STRING },
  text: { type: _sequelize2.default.STRING },
  rotate: { type: _sequelize2.default.STRING }
});
var TshirtTextures = db.models.tshirtTextures;

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

var UserGroups = db.models.userGroups;
var GroupTshirt = db.models.groupTshirts;
exports.db = db;
exports.User = User;
exports.Group = Group;
exports.Tshirt = Tshirt;
exports.MessageGroup = MessageGroup;
exports.TshirtTextures = TshirtTextures;
exports.UserGroups = UserGroups;
exports.GroupTshirt = GroupTshirt;