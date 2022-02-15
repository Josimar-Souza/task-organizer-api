const { Router } = require('express');
const userRouter = require('./user/userRouter');

const rootRouter = Router({ mergeParams: true });

userRouter(rootRouter);

module.exports = (app) => {
  app.use(rootRouter);
};
