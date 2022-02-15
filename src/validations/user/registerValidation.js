const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = (user) => schema.validate(user);
