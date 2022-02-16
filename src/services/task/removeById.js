const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../helpers/CustomError');
const taskModel = require('../../models/task');

const removeById = async (id) => {
  let deleteStatus;
  try {
    deleteStatus = await taskModel.removeById(id);

    if (!deleteStatus) {
      const error = new CustomError('Invalid id', StatusCodes.BAD_REQUEST);
      return error;
    }

    if (deleteStatus.deletedCount === 0) {
      const error = new CustomError('Task not found', StatusCodes.NOT_FOUND);
      return error;
    }
  } catch (error) {
    console.log(error);
  }

  return deleteStatus;
};

module.exports = removeById;
