import Sequelize from 'sequelize';
// initialize our database
const bcrypt = require('bcrypt');

const db = new Sequelize('goToShirt', null, null, {
  dialect: 'sqlite',
  storage: './goToShirt.sqlite',
  logging: false, // mark this true if you want to see logs
});

// define users
db.define('user', {
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

const User = db.models.user;

// setting up model operations
User.beforeCreate((user) => {
  user.password = bcrypt.hashSync(user.password, 10);
});

export { db, User };
