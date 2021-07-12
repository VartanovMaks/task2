const { responseCodesEnum: { NOT_FOUND } } = require('../constants');
const ErrorHandler = require('../errors/ErrorHandler');
const errors = require('../errors/error-messages');
const { passwordHasher } = require('../services');

module.exports = {

  passwordCompare: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ErrorHandler(NOT_FOUND, errors.USER_NOT_FOUND.message, errors.USER_NOT_FOUND.code);
      }

      const { password } = req.body;
      const hashedPassword = req.user.password;

      await passwordHasher.compare(hashedPassword, password);

      next();
    } catch (e) {
      next(e);
    }
  },

};
