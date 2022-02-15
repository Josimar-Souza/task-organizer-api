require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { AES } = require('crypto-js');
const userModel = require('../../models/user');
const registerValidation = require('../../validations/user/registerValidation');
const CustomError = require('../../helpers/CustomError');

const encryptPassword = (password) => {
  const { PASSWORD_INCRYPT_SECRET } = process.env;

  const passEncrypted = AES.encrypt(password, PASSWORD_INCRYPT_SECRET).toString();

  return passEncrypted;
};

const checkUserExistence = async (email) => {
  const user = await userModel.findUserByEmail(email);

  if (!user) {
    return false;
  }

  return true;
};

const register = async (user) => {
  let newUser;

  try {
    const validStatus = registerValidation(user);

    if (validStatus.error) {
      const { message } = validStatus.error;
      const error = new CustomError(message, StatusCodes.BAD_REQUEST);
      return error;
    }

    const { password, email, ...rest } = user;

    const userExist = await checkUserExistence(email);

    if (userExist) {
      const error = new CustomError('User already registered', StatusCodes.CONFLICT);
      return error;
    }

    const incryptedUserPassword = {
      ...rest,
      email,
      password: encryptPassword(password),
    };

    const userRegistered = await userModel.register(incryptedUserPassword);

    const { password: newPassword, ...newUserRest } = userRegistered;
    newUser = newUserRest;
  } catch (error) {
    console.log(error);
  }

  return newUser;
};

module.exports = register;
