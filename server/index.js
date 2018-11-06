import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import sqlite from 'sqlite';
import { resolvers } from './data/resolvers';
import { typeDefs } from './data/schema';

import mockDB from './data/mocks';

const dbPromise = sqlite.open('./goToShirt.sqlite', { Promise });
const PORT = 8080;

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();

  server.applyMiddleware({ app });
  app.get('/:shirtID', async (req, res, next) => {
    try {
      const db = await dbPromise;
      const textures = await db.all(
        'SELECT * FROM tshirtTextures WHERE tshirtId = ?',
        req.params.shirtID,
      );

      res.send(textures);
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
