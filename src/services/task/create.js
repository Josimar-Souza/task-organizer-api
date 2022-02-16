const { StatusCodes } = require('http-status-codes');
const taskModel = require('../../models/task');
const taskValidation = require('../../validations/task/createTaskValidation');
const CustomError = require('../../helpers/CustomError');

const create = async (task, userId) => {
  let newTask;

  try {
    const validationStatus = taskValidation(task);

    if (validationStatus.error) {
      const { message } = validationStatus.error;
      const error = new CustomError(message, StatusCodes.BAD_REQUEST);
      return error;
    }

    const taskToCreate = {
      ...task,
      userId,
    };

    newTask = await taskModel.create(taskToCreate);
  } catch (error) {
    console.log(error);
  }

  return newTask;
};

module.exports = create;
