require('dotenv').config();
const { ObjectId } = require('mongodb');
const mongoConnect = require('../connection');

const { MONGO_TASK_COLLECTION } = process.env;

const updateById = async (id, newValues) => {
  let updatedTask;

  try {
    const db = await mongoConnect();

    await db.collection(MONGO_TASK_COLLECTION).updateOne(
      { _id: ObjectId(id) },
      { newValues },
    );

    updatedTask = {
      _id: id,
      ...newValues,
    };
  } catch (error) {
    console.log(error);
  }

  return updatedTask;
};

module.exports = updateById;
