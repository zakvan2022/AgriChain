import path from 'path';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import './dotenv';
import DB from './db';
import addModelsToContext from './models';
import addGraphQL from './graphql';

(async () => {
  // Wait for DB connection to complete before allowing HTTP connections
  const db = await DB.connect();

  // Apply validators and indexes
  await addModelsToContext({db}, {applyValidatorsAndIndexes: true});

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  // Connect to database
  app.use(async (req, res, next) => {
    req.context = await addModelsToContext({db});
    next();
  });

  // Add graphQL
  addGraphQL(app, db);

  // This sets where all the public files can be served from.
  app.use(express.static(path.join(process.env.PWD, 'dist/')));

  // This will catch all incoming requests to the server
  // and redirect it to the index.html created by angular.
  // If new routes are needed, make sure to add them above this line.
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.env.PWD, 'dist/public/index.html'));
  });

  const port = process.env.PORT || '3000';
  app.set('port', port);


  const server = http.createServer(app);

  server.listen(port, () => console.log(`Site running on localhost:${port}`));
})();
