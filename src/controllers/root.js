const { Router } = require('express');
const userRouter = require('./user/userRouter');
const taskRouter = require('./task/taskRouter');

const rootRouter = Router({ mergeParams: true });

userRouter(rootRouter);
taskRouter(rootRouter);

module.exports = (app) => {
  app.use(rootRouter);
};
