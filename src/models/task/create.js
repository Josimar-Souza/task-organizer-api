require('dotenv').config();
const mongoConnect = require('../connection');

const { MONGO_TASK_COLLECTION } = process.env;

const create = async (task) => {
  let newTask;

  try {
    const db = await mongoConnect();

    const { insertedId: { id } } = await db.collection(MONGO_TASK_COLLECTION).insertOne(task);

    newTask = {
      _id: id,
      ...task,
    };
  } catch (error) {
    console.log(error);
  }

  return newTask;
};

module.exports = create;
