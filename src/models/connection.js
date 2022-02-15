require('dotenv').config();
const { MongoClient } = require('mongodb');

const { MONGO_URL } = process.env;
const { MONGO_DB_NAME } = process.env;

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
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  return db;
};

module.exports = connect;
