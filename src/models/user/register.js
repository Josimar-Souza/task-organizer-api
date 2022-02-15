require('dotenv').config();
const mongoConnect = require('../connection');

const usersCollection = process.env.MONGO_USER_COLLECTION;

const register = async (user) => {
  let newUser;

  try {
    const db = await mongoConnect();

    const { insertedId: { id } } = await db.collection(usersCollection).insertOne(user);

    newUser = {
      _id: id,
      ...user,
    };
  } catch (error) {
    console.log(error);
  }

  return newUser;
};

module.exports = register;
