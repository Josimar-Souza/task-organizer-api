const taskModel = require('../../models/task');

const getAllUserTasks = async (userId) => {
  let tasks;

  try {
    tasks = await taskModel.getAllUserTasks(userId);
  } catch (error) {
    console.log(error);
  }

  return tasks;
};

module.exports = getAllUserTasks;
