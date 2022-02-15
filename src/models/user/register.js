require('dotenv').config();
const mongoConnect = require('../connection');

const usersCollection = process.env.MONGO_USER_COLLECTION;

const register = async (user) => {
  try {
    const db = await mongoConnect();

    const { insertedId: { id } } = await db.collection(usersCollection).insertOne(user);

    const newUser = {
      _id: id,
      ...user,
    };

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

module.exports = register;