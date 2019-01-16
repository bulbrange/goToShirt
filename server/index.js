import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import sqlite from 'sqlite';
import { resolvers } from './data/resolvers';
import { typeDefs } from './data/schema';
import mockDB from './data/mocks';

const request = require('request');
const Jimp = require('jimp');
const fs = require('fs');
const rimraf = require('rimraf');

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
        await image.writeAsync(`server/public/${req.params.shirtID}/color.png`).then(async () => {
          const base = [`server/public/${req.params.shirtID}/color.png`];
          const images = [
            ...base,
            ...textures.filter(x => x.source !== '').map(y => `server/public/textures/${y.source}`),
          ];
          console.log(images);

          const jimps = images.map((x,i) => {
            if(x.includes('color.png')){
              return Jimp.read(x);
            }else{
              return Jimp.read(x)
                .then(img => {
                  const deg = Number(textures[i - 1].rotate.split('deg')[0])
                  return img
                  .resize(textures[i - 1].renderSize, textures[i - 1].renderSize)
                  .rotate(deg*-1, false)
                  .color([{apply: 'xor', params: [textures[i - 1].tintColor]}])
                });
            }
          });

          await Promise.all(jimps).then(async (data) => {
            await data.map((x, i) => {
              if(i !== 0){
                const sideTshirt = textures[i - 1].face;
                const posX = sideTshirt === 'front' ? textures[i - 1].posX : textures[i - 1].posX + 512
                const posY = sideTshirt === 'front' ? textures[i - 1].posY : textures[i - 1].posY
                data[0].composite(x, posX + 140, posY + 135)
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
      id: req.params.shirtID, camera: -1, bgB: 1, bgR: 1, bgG: 1,
    });
  });
  app.get('/back/:shirtID', (req, res) => {
    res.render('index', {
      id: req.params.shirtID, camera: 1, bgB: 1, bgR: 1, bgG: 1,
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
  app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
};

const init = async () => {
  await mockDB({ populating: false, force: false });
  startServer();
};

init();
