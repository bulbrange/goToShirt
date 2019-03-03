import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'express-jwt';
import sqlite from 'sqlite';
import { User } from './data/connectors';
import { resolvers } from './data/resolvers';
import { typeDefs } from './data/schema';
import mockDB from './data/mocks';
import JWT_SECRET from './secret';

const request = require('request');
const Jimp = require('jimp');
const fs = require('fs');
const rimraf = require('rimraf');
const text2png = require('text2png');

const dbPromise = sqlite.open('./goToShirt.sqlite', { Promise });
const PORT = 8080;
const fontStore = [
  { font: 'font1', name: 'Asly Brush' },
  { font: 'font2', name: 'Atmospherica Personal Use' },
  { font: 'font3', name: 'Riffle Free' },
  { font: 'font4', name: 'Sugar & Spice' },
  { font: 'font5', name: 'valentine' },
];
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res, connection }) => {
      // web socket subscriptions will return a connection
      if (connection) {
        // check connection for metadata
        return {};
      }
      const user = new Promise((resolve) => {
        jwt({
          secret: JWT_SECRET,
          credentialsRequired: false,
        })(req, res, () => {
          if (req.user) {
            resolve(User.findOne({ where: { id: req.user.id } }));
          } else {
            resolve(null);
          }
        });
      });
      return {
        user,
      };
    },
  });
  const app = express();

  server.applyMiddleware({ app });
  app.use(express.static('server/public'));
  app.set('view engine', 'ejs');

  app.get('/favicon.ico', (req, res) => res.status(204));
  app.get('/:shirtID', async (req, res, next) => {
    try {
      if (await !fs.existsSync(`server/public/${req.params.shirtID}`)) {
        await fs.mkdirSync(`server/public/${req.params.shirtID}`);
        await fs.mkdirSync(`server/public/${req.params.shirtID}/fonts`);
      }
      const db = await dbPromise;
      const textures = await db.all(
        'SELECT * FROM tshirtTextures WHERE tshirtId = ?',
        req.params.shirtID,
      );
      const tshirt = await db.get('SELECT * FROM tshirts WHERE id = ?', req.params.shirtID);

      const fonts = textures
        .filter(x => x.text !== '')
        .map((y, i) => {
          console.log(fontStore.filter(x => x.font === y.source)[0].name);
          fs.writeFileSync(
            `server/public/${req.params.shirtID}/fonts/${i}.png`,
            text2png(y.text, {
              font: `${y.renderSize}px ${fontStore.filter(x => x.font === y.source)[0].name}`,
              localFontPath: `server/public/fonts/${y.source}.ttf`,
            }),
          );
          y.texture = `server/public/${req.params.shirtID}/fonts/${i}.png`;
          y.tintColor = y.backgroundColor;
          return y;
        });
      fonts.map(x => console.log(x));
      await new Jimp(1024, 1024, tshirt.color, async (err, image) => {
        await image.writeAsync(`server/public/${req.params.shirtID}/color.png`).then(async () => {
          const base = [`server/public/${req.params.shirtID}/color.png`];
          const images = [
            ...base,
            ...textures.map(y => (y.text === '' ? `server/public/textures/${y.source}` : y.texture)),
          ];
          console.log(images);
          console.log(textures);

          const jimps = images.map((x, i) => {
            if (x.includes('color.png')) {
              return Jimp.read(x);
            }
            return Jimp.read(x).then((img) => {
              const deg = Number(textures[i - 1].rotate.split('deg')[0]);
              if (textures[i - 1].text === '') {
                return img
                  .resize(textures[i - 1].renderSize + 10, textures[i - 1].renderSize + 10)
                  .rotate(deg * -1, true)
                  .color([{ apply: 'xor', params: [textures[i - 1].tintColor] }]);
              }
              return img
                .rotate(deg * -1, true)
                .color([{ apply: 'xor', params: [textures[i - 1].tintColor] }]);
            });
          });

          await Promise.all(jimps).then(async (data) => {
            await data.map((x, i) => {
              if (i !== 0) {
                const sideTshirt = textures[i - 1].face;
                const posX = sideTshirt === 'front' ? textures[i - 1].posX : textures[i - 1].posX + 512;
                const posY = sideTshirt === 'front' ? textures[i - 1].posY : textures[i - 1].posY;
                data[0].composite(x, posX + 140, posY + 135);
              }
            });

            data[0].write(`server/public/${req.params.shirtID}/base.png`, () => console.log('wrote the image'));
          });
          res.render('index', {
            id: req.params.shirtID,
            camera: -1.7,
            bgB: 0.55,
            bgR: 0.33,
            bgG: 0.2,
          });
          request
            .get(`http://localhost:3333/frontAndBack/${req.params.shirtID}`)
            .on('response', response => console.log(response.statusCode));
        });
      });
    } catch (err) {
      next(err);
    }
  });
  app.get('/front/:shirtID', (req, res) => {
    res.render('index', {
      id: req.params.shirtID,
      camera: -1,
      bgB: 1,
      bgR: 1,
      bgG: 1,
    });
  });
  app.get('/back/:shirtID', (req, res) => {
    res.render('index', {
      id: req.params.shirtID,
      camera: 1,
      bgB: 1,
      bgR: 1,
      bgG: 1,
    });
  });
  app.get('/delete/:shirtID', async (req, res, next) => {
    try {
      if (await fs.existsSync(`server/public/${req.params.shirtID}`)) {
        await rimraf(`server/public/${req.params.shirtID}`, () => console.log('Tshirt deletion done!'));
      }
    } catch (err) {
      next(err);
    }
  });
  const http = require('http');
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  });
  //app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
};

const init = async () => {
  await mockDB({ populating: true, force: true });
  startServer();
};

init();