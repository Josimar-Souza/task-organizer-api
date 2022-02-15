require('dotenv').config();
const mongoConnect = require('../connection');

const { MONGO_USER_COLLECTION } = process.env;

const findUserByEmail = async (email) => {
  let user;

  try {
    const db = await mongoConnect();

    user = await db.collection(MONGO_USER_COLLECTION).findOne({ email });
  } catch (error) {
    console.log(error);
  }

  return user;
};

module.exports = findUserByEmail;
