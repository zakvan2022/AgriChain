# Server

The server runs using the Express framework. Currently there is a single endpoint that catches all incoming urls and servers back the index.html found in the dist folder.

### MongoDB
Connection to the database happens in db.js. Every collection should extend off of the BaseModel.js. This will allow us to group all generic queries like `findOneById` together while retaining different schemas for each seperate collection.  

To drop into the mongo shell, run utilities/mongo_shell.sh. To show which databases you can connect to, run `show dbs`. This application is currently only using the agri-chain db. Run `use agri-chain` to access it. To get a list of collections within a database, run `show collections`. From here you can manually add, update, and delete entries within the database.

### Misc

#### Commands
* `npm run buildServer` - Transpiles everything coming from the index.js file and copies it over to the dist folder.  
* `npm run startServer` - Uses Nodemon to run server. Pages will be served at whatever the environments port is set to or defaults to 3000  
* `npm run express` - Shortcut for running buildServer and startServer.  
* `./utilites/mongo_shell.sh` - Shortcut for accessing the mongo database.
