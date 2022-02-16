const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../helpers/CustomError');
const taskModel = require('../../models/task');

const removeById = async (id, userId) => {
  let deleteStatus;
  try {
    const task = await taskModel.getById(id);
    if (!task) {
      const error = new CustomError('Task not found', StatusCodes.NOT_FOUND);
      return error;
    }

    if (task.userId !== userId) {
      const error = new CustomError('Cannot delete another user\'s task', StatusCodes.UNAUTHORIZED);
      return error;
    }

    deleteStatus = await taskModel.removeById(id);
  } catch (error) {
    console.log(error);
  }

  return deleteStatus;
};

module.exports = removeById;
