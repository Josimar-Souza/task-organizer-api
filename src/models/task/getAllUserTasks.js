require('dotenv').config();
const mongoConnect = require('../connection');

const { MONGO_TASK_COLLECTION } = process.env;

const getAllUserTasks = async (userId) => {
  let tasks;

  try {
    const db = await mongoConnect();

    tasks = await db.collection(MONGO_TASK_COLLECTION).find({ userId }).toArray();
  } catch (error) {
    console.log(error);
  }

  return tasks;
};

module.exports = getAllUserTasks;
