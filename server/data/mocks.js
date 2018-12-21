import R from 'ramda';
import faker from 'faker';
import {
  db, User, Tshirt, TshirtTextures,
} from './connectors';

// create fake starter data

const USERS = 20;
const IP = '192.168.1.109';
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

  (async () => {
    const arrTextures = [
      'bansky1.png',
      'chewaka.png',
      'it.png',
      'keep-calm.png',
      'rebel.png',
      'soldiers1.png',
      'surtich.jpeg',
    ];
    R.times(async (i) => {
      await Tshirt.create({
        userId: 1,
        name: faker.hacker.noun(),
        color: faker.internet.color(),
        source: `http://${IP}:3333/front_${i + 1}.png`,
        sourceBack: `http://${IP}:3333/back_${i + 1}.png`,
        babylonURL: faker.internet.url(),
      });
      R.times(async () => {
        const textures = await TshirtTextures.create({
          source: faker.random.arrayElement(arrTextures),
          posX: faker.random.number(70, 170),
          posY: faker.random.number(70, 270),
          renderSize: faker.random.number(100, 200),
          face: faker.random.arrayElement(['front', 'back']),
          tshirtId: i + 1,
        });
        return textures;
      }, Math.floor(Math.random() * 10 + 1));
    }, 5);
  })();

  console.log('\x1b[32m\x1b[1m¡DATABASE CREATED!\x1b[37m');
};

export default mockDB;
