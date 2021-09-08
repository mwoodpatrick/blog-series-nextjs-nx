import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';

debugger; // eslint-disable-line no-debugger

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.start().then(() => apolloServer.createHandler({ path: '/api/graphql' }));
