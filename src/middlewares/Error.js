const { StatusCodes } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
const Error = (error, req, res, next) => {
  console.log(error);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};

module.exports = Error;
