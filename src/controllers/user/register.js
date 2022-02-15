const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../helpers/CustomError');
const userService = require('../../services/user');

const register = async (req, res, next) => {
  let newUser;
  try {
    const user = req.body;
    newUser = await userService.register(user);

    if (newUser instanceof CustomError) {
      return res.status(newUser.status).json({ message: newUser.message });
    }
  } catch (error) {
    next(error);
  }
  return res.status(StatusCodes.CREATED).json({ user: newUser });
};

module.exports = register;
