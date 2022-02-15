const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../helpers/CustomError');
const userService = require('../../services/user');

const login = async (req, res, next) => {
  let token;

  try {
    const user = req.body;

    token = await userService.login(user);

    if (token instanceof CustomError) {
      return res.status(token.status).json({ message: token.message });
    }
  } catch (error) {
    next(error);
  }

  return res.status(StatusCodes.OK).json({ token });
};

module.exports = login;
