const { Router } = require('express');
const Auth = require('../../middlewares/Auth');
const create = require('./create');

const taskRouter = Router({ mergeParams: true });

taskRouter.post('/', Auth, create);

module.exports = (root) => {
  root.use('/tasks', taskRouter);
};
