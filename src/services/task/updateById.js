const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../helpers/CustomError');
const taskModel = require('../../models/task');
const taskValidation = require('../../validations/task/taskValidation');

const validUser = async (id, userId) => {
  const task = await taskModel.getById(id);

  if (!task) {
    const error = new CustomError('Task not found', StatusCodes.NOT_FOUND);
    return error;
  }

  if (task.userId !== userId) {
    const error = new CustomError('Cannot update another user\'s task', StatusCodes.UNAUTHORIZED);
    return error;
  }

  return true;
};

const updateById = async (id, userId, newValues) => {
  let updatedTask;

  try {
    const validationStatus = taskValidation(newValues);

    if (validationStatus.error) {
      const { message } = validationStatus.error;
      const error = new CustomError(message, StatusCodes.BAD_REQUEST);
      return error;
    }

    const isUserValid = await validUser(id, userId);

    if (isUserValid instanceof CustomError) {
      return isUserValid;
    }

    updatedTask = await taskModel.updateById(id, newValues);
  } catch (error) {
    console.log(error);
  }

  return updatedTask;
};

module.exports = updateById;
