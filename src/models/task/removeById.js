require('dotenv').config();
const { ObjectId } = require('mongodb');
const mongoConnect = require('../connection');

const { MONGO_TASK_COLLECTION } = process.env;

const removeById = async (id) => {
  let deleteStatus;

  try {
    const db = await mongoConnect();

    deleteStatus = await db.collection(MONGO_TASK_COLLECTION).deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    console.log(error);
  }

  return deleteStatus;
};

module.exports = removeById;
