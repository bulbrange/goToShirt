import R from 'ramda';
import faker from 'faker';
import { db, User } from './connectors';

// create fake starter data

const USERS = 20;

faker.seed(123); // get consistent data every time we reload app

// you don't need to stare at this code too hard
// just trust that it fakes a bunch of groups, users, and messages

const mockDB = async ({ populating = false, force = false } = {}) => {
  force
    ? console.log('\x1b[33m\x1b[1mcreating database....\x1b[37m')
    : console.log('\x1b[32m\x1b[1mDATABASE ALREADY CREATED!!\x1b[37m');

  await db.sync({ force });

  if (!populating) {
    return Promise.resolve(true);
  }
  console.log('\x1b[33m\x1b[1mpopulating users....\x1b[37m');
  R.times(async () => {
    const user = await User.create({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
    return user;
  }, USERS);

  console.log('\x1b[32m\x1b[1m¡DATABASE CREATED!\x1b[37m');
};

export default mockDB;
