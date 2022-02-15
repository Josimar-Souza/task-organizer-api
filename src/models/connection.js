require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectionClient = new MongoClient(MONGO_URL, connectionOptions);

let db = null;

const connect = async () => {
  try {
    if (!db) {
      const connection = await connectionClient.connect();
      db = connection.db(MONGO_DB_NAME);
    }
  
    return db;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connect;