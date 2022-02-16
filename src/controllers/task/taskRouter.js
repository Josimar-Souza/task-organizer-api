const { Router } = require('express');
const Auth = require('../../middlewares/Auth');
const create = require('./create');
const removeById = require('./removeById');

const taskRouter = Router({ mergeParams: true });

taskRouter.post('/', Auth, create);
taskRouter.delete('/:id', Auth, removeById);

module.exports = (root) => {
  root.use('/tasks', taskRouter);
};
