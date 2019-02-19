import R from 'ramda';
import faker from 'faker';
import bcrypt from 'bcrypt';
import IP from '../ip';
import {
  db,
  User,
  Tshirt,
  TshirtTextures,
  Group,
  UserGroups,
  GroupTshirt,
  MessageGroup,
} from './connectors';

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
      password: await bcrypt.hash(faker.internet.password(), 10),
      phone: faker.phone.phoneNumber(),
    });
    return user;
  }, USERS);

  const mockUsers = [
    {
      email: 'casas222@gmail.com',
      username: 'jcasas',
      password: await bcrypt.hash('12345', 10),
      phone: '616551747',
    },
    {
      email: 'jaimemg@outlook.com',
      username: 'jmolli',
      password: await bcrypt.hash('12345', 10),
      phone: '670372228',
    },
    {
      email: 'hola@danilab.es',
      username: 'dballes',
      password: await bcrypt.hash('12345', 10),
      phone: '637853760',
    },
    {
      email: 'tonymartoscode@gmail.com',
      username: 'tmartos',
      password: await bcrypt.hash('12345', 10),
      phone: '662016324',
    },
    {
      email: 'andresherrerof@gmail.com',
      username: 'aherrero',
      password: await bcrypt.hash('12345', 10),
      phone: '651167986',
    },
  ];

  const arrTextures = [
    'bansky1.png',
    'chewaka.png',
    'it.png',
    'keep-calm.png',
    'rebel.png',
    'soldiers1.png',
    'surtich.png',
  ];

  const imenGroup = await Group.create({
    name: 'I-MEN',
    image: 'https://facebook.github.io/react-native/img/header_logo.png',
  });

  await Promise.all(mockUsers.map(user => User.create(user))).then(users => users.map(async (user) => {
    UserGroups.create({
      userId: user.id,
      groupId: imenGroup.id,
    });
    R.times(async () => {
      const messages = await MessageGroup.create({
        text: faker.lorem.words(3),
        groupId: imenGroup.id,
        userId: user.id,
      });
      return messages;
    }, 10);

    R.times(async () => {
      const tshirt = await Tshirt.create({
        userId: user.id,
        name: faker.hacker.noun(),
        color: faker.internet.color(),
      });

      tshirt.update({
        source: `http://${IP}:3333/front_${tshirt.id}.png`,
        sourceBack: `http://${IP}:3333/front_${tshirt.id}.png`,
      });

      R.times(async () => {
        const textures = await TshirtTextures.create({
          source: faker.random.arrayElement(arrTextures),
          posX: faker.random.number(70, 170),
          posY: faker.random.number(70, 270),
          renderSize: Math.floor(Math.random() * 100) + 80,
          face: faker.random.arrayElement(['front', 'back']),
          tshirtId: tshirt.id,
          backgroundColor: faker.random.arrayElement([
            '#00ff00',
            '#ff0000',
            '#0000ff',
            '#000000',
            '#121212',
          ]),
          tintColor: faker.random.arrayElement([null, '#fafafa', null, '#1204f0']),
          text: '',
          rotate: faker.random.arrayElement(['15deg', '0deg', '30deg', '0deg']),
        });
        return textures;
      }, Math.floor(Math.random() * 10 + 1));

      GroupTshirt.create({
        groupId: imenGroup.id,
        tshirtId: tshirt.id,
      });
    }, 2);
  }));
  /*
  (async () => {
    R.times(async (i) => {
      const tshirt = await Tshirt.create({
        userId: 1,
        name: faker.hacker.noun(),
        color: faker.internet.color(),
      });
      tshirt.update({
        source: `http://${IP}:3333/front_${tshirt.id}.png`,
        sourceBack: `http://${IP}:3333/front_${tshirt.id}.png`,
      });
      R.times(async () => {
        const textures = await TshirtTextures.create({
          source: faker.random.arrayElement(arrTextures),
          posX: faker.random.number(70, 170),
          posY: faker.random.number(70, 270),
          renderSize: Math.floor(Math.random() * 100) + 80,
          face: faker.random.arrayElement(['front', 'back']),
          tshirtId: i + 1,
          backgroundColor: faker.random.arrayElement([
            '#00ff00',
            '#ff0000',
            '#0000ff',
            '#000000',
            '#121212',
          ]),
          tintColor: faker.random.arrayElement([null, '#fafafa', null, '#1204f0']),
          text: '',
          rotate: faker.random.arrayElement(['15deg', '0deg', '30deg', '0deg']),
        });
        return textures;
      }, Math.floor(Math.random() * 10 + 1));
    }, 5);
  })();
*/
  console.log('\x1b[32m\x1b[1m¡DATABASE CREATED!\x1b[37m');
};

export default mockDB;
