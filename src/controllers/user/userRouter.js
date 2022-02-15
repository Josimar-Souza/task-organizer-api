const { Router } = require('express');
const register = require('./register');
const login = require('./login');

const userRouter = Router({ mergeParams: true });

userRouter.post('/', register);
userRouter.post('/login', login);

module.exports = (root) => {
  root.use('/users', userRouter);
};
