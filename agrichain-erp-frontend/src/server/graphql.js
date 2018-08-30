import {graphqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import expressPlayground from 'graphql-playground-middleware-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import addModelsToContext from './models';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function getCurrentUser(req) {
  // If we want to do any permissions checking on a per request basis, we can lock it down here.
  return req.user;
}

export default function addGraphql(app, db) {
  // GraphQL endpoint
  app.use(
    '/graphql',
    graphqlExpress(async (req) => {
      const user = await getCurrentUser(req);

      const context = {
        userId: user && user._id,
        user,
        // Add data models to GraphQL context - include current user in the models context
        ...(await addModelsToContext({db, currentUser: user})),
      };

      return {
        schema,
        context,
      };
    }),
  );

  // GraphQL Playground endpoint - API explorer
  app.use('/graphiql', (req, res) => {
    res.redirect('/playground');
  });

  app.get('/playground', expressPlayground({endpoint: '/graphql'}));
}
