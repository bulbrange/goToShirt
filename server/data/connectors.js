import Sequelize from 'sequelize';
// initialize our database
const db = new Sequelize('goToShirt', null, null, {
  dialect: 'sqlite',
  storage: './goToShirt.sqlite',
  logging: true, // mark this true if you want to see logs
});

// define users
const UserModel = db.define('user', {
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});
const User = db.models.user;

// db.sync({ force: true });
export { db, User };
