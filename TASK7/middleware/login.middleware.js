const { responseCodesEnum: { BAD_USER_DATA } } = require('../constants');
const { User } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const Err = require('../errors/error-messages');

module.exports = {

  checkLoginName: async (req, res, next) => {
    try {
      const { name } = req.body;

      const foundedUser = await User.findOne({ name });

      if (!foundedUser) {
        throw new ErrorHandler(BAD_USER_DATA, Err.WRONG_NAME_OR_PASSWORD.message, Err.WRONG_NAME_OR_PASSWORD.code);
      }

      req.user = foundedUser;

      next();
    } catch (e) {
      next(e);
    }
  },

};
