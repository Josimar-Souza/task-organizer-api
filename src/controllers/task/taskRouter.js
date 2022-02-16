const { Router } = require('express');
const Auth = require('../../middlewares/Auth');
const create = require('./create');
const removeById = require('./removeById');
const updateById = require('./updateById');
const getAllUserTasks = require('./getAllUserTasks');

const taskRouter = Router({ mergeParams: true });

taskRouter.use(Auth);

taskRouter.post('/', create);
taskRouter.delete('/:id', removeById);
taskRouter.put('/:id', updateById);
taskRouter.get('/', getAllUserTasks);

module.exports = (root) => {
  root.use('/tasks', taskRouter);
};
