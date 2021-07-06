const { User } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const errors = require('../errors/error-messages');

module.exports = {

  checkLoginName: async (req, res, next) => {
    try {
      const { name } = req.body;

      const foundedUser = await User.findOne({ name });

      if (!foundedUser) {
        throw new ErrorHandler(401, errors.WRONG_NAME_OR_PASSWORD.message, errors.WRONG_NAME_OR_PASSWORD.code);
      }

      req.user = foundedUser;

      next();
    } catch (e) {
      next(e.message);
    }
  },

};
