const { responseCodesEnum: { BAD_REQUEST } } = require('../constants');
const { User } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const errors = require('../errors/error-messages');

module.exports = {
  checkUserIdExists: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userById = await User.findById(userId);

      if (!userById) {
        throw new ErrorHandler(BAD_REQUEST, errors.USER_ID_NOT_FOUND.message, errors.USER_ID_NOT_FOUND.code);
      }

      req.user = userById;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserNameExists: async (req, res, next) => {
    try {
      const { name } = req.body;
      const { userId } = req.params;

      const foundedUser = await User.findOne({ name });

      if (foundedUser && !userId) {
        throw new ErrorHandler(BAD_REQUEST, errors.WRONG_NAME.message, errors.WRONG_NAME.code);
      }
      if (foundedUser && userId) {
        if (userId !== foundedUser.id) {
          throw new ErrorHandler(BAD_REQUEST, errors.WRONG_NAME.message, errors.WRONG_NAME.code);
        }
      }

      req.user = foundedUser;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserEmailUniq: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { userId } = req.params;

      const foundedUser = await User.findOne({ email });

      if (foundedUser && !userId) {
        throw new ErrorHandler(BAD_REQUEST, errors.WRONG_EMAIL.message, errors.WRONG_EMAIL.code);
      }
      if (foundedUser && userId) {
        if (userId !== foundedUser.id) {
          throw new ErrorHandler(BAD_REQUEST, errors.WRONG_EMAIL.message, errors.WRONG_EMAIL.code);
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  },

};
