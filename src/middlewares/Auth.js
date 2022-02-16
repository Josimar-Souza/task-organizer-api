const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET } = process.env;

const Auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'token not found' });
    }

    try {
      const payload = jwt.verify(authorization, JWT_SECRET);
      req.user = payload.data;
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
  } catch (error) {
    next(error);
  }

  return next();
};

module.exports = Auth;
