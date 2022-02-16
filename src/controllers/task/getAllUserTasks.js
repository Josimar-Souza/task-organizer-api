const { StatusCodes } = require('http-status-codes');
const taskService = require('../../services/task');

const getAllUserTasks = async (req, res, next) => {
  let tasks;

  try {
    const { _id: userId } = req.user;
    tasks = await taskService.getAllUserTasks(userId);
  } catch (error) {
    next(error);
  }

  return res.status(StatusCodes.OK).json({ tasks });
};

module.exports = getAllUserTasks;
