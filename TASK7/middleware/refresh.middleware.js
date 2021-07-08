const { constant: { REFRESH } } = require('../constants');
const { Token } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const Err = require('../errors/error-messages');
const { tokenService } = require('../services');

module.exports = {

  verifyRefreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.get('Authorization');

      if (!refreshToken) {
        throw new ErrorHandler(401, Err.TOKEN_NOT_PASSED.message, Err.TOKEN_NOT_PASSED.code);
      }

      const foundedToken = await Token.findOne({ refreshToken });

      if (!foundedToken) {
        throw new ErrorHandler(401, Err.TOKEN_NOT_VALID.message, Err.TOKEN_NOT_VALID.code);
      }

      await tokenService.checkTokenValid(refreshToken, REFRESH);

      req.userId = foundedToken.userId;

      next();
    } catch (e) {
      next(e);
    }
  },

};
