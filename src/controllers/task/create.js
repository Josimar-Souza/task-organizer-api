const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../helpers/CustomError');
const taskService = require('../../services/task');

const create = async (req, res, next) => {
  let newTask;
  try {
    const task = req.body;
    const { _id } = req.user;

    newTask = await taskService.create(task, _id);

    if (newTask instanceof CustomError) {
      return res.status(newTask.status).json({ message: newTask.message });
    }
  } catch (error) {
    next(error);
  }

  return res.status(StatusCodes.CREATED).json({ task: newTask });
};

module.exports = create;
