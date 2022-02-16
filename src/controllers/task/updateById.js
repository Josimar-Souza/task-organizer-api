const { StatusCodes } = require('http-status-codes');
const taskService = require('../../services/task');
const CustomError = require('../../helpers/CustomError');

const updateById = async (req, res, next) => {
  let updatedTask;

  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const newValues = req.body;

    updatedTask = await taskService.updateById(id, userId, newValues);

    if (updatedTask instanceof CustomError) {
      return res.status(updatedTask.status).json({ message: updatedTask.message });
    }
  } catch (error) {
    next(error);
  }

  return res.status(StatusCodes.OK).json({ task: updatedTask });
};

module.exports = updateById;
