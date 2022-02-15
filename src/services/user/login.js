require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { AES, enc } = require('crypto-js');
const jwt = require('jsonwebtoken');
const CustomError = require('../../helpers/CustomError');
const userModel = require('../../models/user');

const { JWT_SECRET, PASSWORD_INCRYPT_SECRET } = process.env;

const decryptPassword = (password) => {
  const decryptedPassword = AES.decrypt(password, PASSWORD_INCRYPT_SECRET).toString(enc.Utf8);

  return decryptedPassword;
};

const getToken = (payload) => {
  const jwtOptions = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: payload }, JWT_SECRET, jwtOptions);

  return token;
};

const login = async (user) => {
  let token;
  const { email, password } = user;

  const loginError = new CustomError('invalid "email" or "password"', StatusCodes.UNAUTHORIZED);

  try {
    const userFound = await userModel.findUserByEmail(email);

    if (!userFound) {
      return loginError;
    }

    const userPassword = decryptPassword(userFound.password);

    if (password !== userPassword) {
      return loginError;
    }

    const { password: userFoundPassword, ...rest } = userFound;

    token = getToken(rest);
  } catch (error) {
    console.log(error);
  }

  return token;
};

module.exports = login;
