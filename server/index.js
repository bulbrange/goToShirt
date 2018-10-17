import { ApolloServer } from 'apollo-server';
import { resolvers } from './data/resolvers';
import { typeDefs } from './data/schema';

import mockDB from './data/mocks';

const PORT = 18674;

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen({ port: PORT });
  console.log(`🚀 Server ready at ${url}`);
};

const init = async () => {
  await mockDB({ populating: false, force: false });
  startServer();
};

init();
