import { ApolloServer } from 'apollo-server';
import { resolvers } from './data/resolvers';
import { typeDefs } from './data/schema';

const PORT = 18674;

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen({ port: PORT });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
