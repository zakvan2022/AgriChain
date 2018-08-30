import MongoClient from 'mongodb';
import randomstring from 'randomstring';
import {UNMISTAKABLE_CHARS} from './regex';

let db;
let connecting = false;

const connect = async function (mongoUrl = process.env.MONGO_URL) {
  if (connecting) {
    await new Promise((r) => setTimeout(r, 500));
    return await connect();
  }
  if (db) {
    return db;
  }

  console.log('-> Connecting to MongoDB');
  connecting = true;

  // Connect
  db = await MongoClient.connect(mongoUrl);
  try {
    const {version} = await db.admin().serverStatus();
    console.log(`Mongodb version ${version}`);
  } catch (e) {
    console.log('Could not determine mongo version.');
  }

  console.log('-> Connected to MongoDB');
  connecting = false;

  return db;
};

const generateId = () => randomstring.generate({
  length: 17,
  charset: UNMISTAKABLE_CHARS,
});


export default {connect};

export {generateId};
