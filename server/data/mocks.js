import R from 'ramda';
import faker from 'faker';
import { db, User } from './connectors';

// create fake starter data

const USERS = 20;

faker.seed(123); // get consistent data every time we reload app

// you don't need to stare at this code too hard
// just trust that it fakes a bunch of groups, users, and messages

const mockDB = async ({ populating = false, force = false } = {}) => {
  force ? console.log('creating database....') : console.log('DATABASE ALREADY CREATED!!');
  await db.sync({ force });

  if (!populating) {
    return Promise.resolve(true);
  }
  console.log('populating users....');
  R.times(async () => {
    const user = await User.create({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
    return user;
  }, USERS);

  console.log('¡DATABASE CREATED!');
};

export default mockDB;
