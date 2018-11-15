import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import sqlite from 'sqlite';
import { resolvers } from './data/resolvers';
import { typeDefs } from './data/schema';
import mockDB from './data/mocks';

const Jimp = require('jimp');
const fs = require('fs');

const dbPromise = sqlite.open('./goToShirt.sqlite', { Promise });
const PORT = 8080;

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();

  server.applyMiddleware({ app });
  app.use(express.static('server/public'));
  app.set('view engine', 'ejs');

  app.get('/favicon.ico', (req, res) => res.status(204));
  app.get('/:shirtID', async (req, res, next) => {
    try {
      if (await !fs.existsSync(`server/public/${req.params.shirtID}`)) {
        await fs.mkdirSync(`server/public/${req.params.shirtID}`);
      }
      const db = await dbPromise;
      const textures = await db.all(
        'SELECT * FROM tshirtTextures WHERE tshirtId = ?',
        req.params.shirtID,
      );
      const tshirt = await db.get('SELECT * FROM tshirts WHERE id = ?', req.params.shirtID);

      await new Jimp(1024, 1024, tshirt.color, async (err, image) => {
        await image.writeAsync(`server/public/${req.params.shirtID}/color.png`);
      });

      await setTimeout(async () => {
        const base = [`server/public/${req.params.shirtID}/color.png`];
        // const font = [`images/${require.params.shirt}/font.png`];
        const images = [
          ...base,
          ...textures.filter(x => x.source !== '').map(y => `server/public/textures/${y.source}`),
        ];
        console.log(images);
        const jimps = images.map(x => Jimp.read(x));

        await Promise.all(jimps).then(async (data) => {
          await data.map(
            (x, i) => (i !== 0 ? data[0].composite(x, textures[i - 1].posX, textures[i - 1].posY) : null),
          );
          // await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then(font => data[0].print(font,120,150,'faker'));

          data[0].write(`server/public/${req.params.shirtID}/base.png`, () => console.log('wrote the image'));
        });
        res.render('index', { id: req.params.shirtID });
      }, 500);
    } catch (err) {
      next(err);
    }
  });

  app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
};

const init = async () => {
  await mockDB({ populating: true, force: true });
  startServer();
};

init();
