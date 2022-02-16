const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().min(15).required(),
  status: Joi.string().min(6).required(),
});

module.exports = (task) => schema.validate(task);
