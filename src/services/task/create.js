const { StatusCodes } = require('http-status-codes');
const taskModel = require('../../models/task');
const taskValidation = require('../../validations/task/createTaskValidation');
const CustomError = require('../../helpers/CustomError');

const create = async (task) => {
  let newTask;

  try {
    const validationStatus = taskValidation(task);

    if (validationStatus.error) {
      const { message } = validationStatus.error;
      const error = new CustomError(message, StatusCodes.BAD_REQUEST);
      return error;
    }

    newTask = await taskModel.create(task);
  } catch (error) {
    console.log(error);
  }

  return newTask;
};

module.exports = create;
