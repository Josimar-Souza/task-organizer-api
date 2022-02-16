const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../helpers/CustomError');
const taskService = require('../../services/task');

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteStatus = await taskService.removeById(id);

    if (deleteStatus instanceof CustomError) {
      return res.status(deleteStatus.status).json({ message: deleteStatus.message });
    }
  } catch (error) {
    next(error);
  }

  return res.status(StatusCodes.OK).json({ message: 'Task successfully deleted' });
};

module.exports = removeById;
