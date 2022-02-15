const { Router } = require('express');
const register = require('./register');

const userRouter = Router({ mergeParams: true });

userRouter.post('/', register);

module.exports = (root) => {
  root.use('/users', userRouter);
};
