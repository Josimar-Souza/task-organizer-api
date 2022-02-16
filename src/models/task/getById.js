require('dotenv').config();
const { ObjectId } = require('mongodb');
const mongoConnect = require('../connection');

const { MONGO_TASK_COLLECTION } = process.env;

const getById = async (id) => {
  let task;

  try {
    const db = await mongoConnect();

    task = await db.collection(MONGO_TASK_COLLECTION).findOne({ _id: ObjectId(id) });
  } catch (error) {
    console.log(error);
  }

  return task;
};

module.exports = getById;
