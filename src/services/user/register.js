require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { AES } = require('crypto-js');
const userModel = require('../../models/user');
const registerValidation = require('../../validations/user/registerValidation');
const CustomError = require('../../helpers/CustomError');

const encryptPassword = (password) => {
  const { PASSWORD_INCRYPT_SECRET } = process.env;

  const passEncrypted = AES.encrypt(password, PASSWORD_INCRYPT_SECRET);

  return passEncrypted;
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

    const { password, ...rest } = user;

    const incryptedUserPassword = {
      ...rest,
      password: encryptPassword(password),
    };

    newUser = await userModel.register(incryptedUserPassword);
  } catch (error) {
    console.log(error);
  }

  return newUser;
};

module.exports = register;
