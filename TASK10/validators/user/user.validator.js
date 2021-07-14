const Joi = require('joi');
const { regexp } = require('../../constants');
const { userRolesEnum } = require('../../constants');

module.exports = {
  createUser: Joi.object().keys({
    name: Joi.string().required().min(3).max(12),
    email: Joi.string().required().regex(regexp.EMAIL_REGEXP),
    password: Joi.string().min(8).max(20).required(),
    age: Joi.number().min(21).max(120),
    role: Joi.string().allow(...Object.values(userRolesEnum))
  })
};
