const { responseCodesEnum: { BAD_USER_DATA } } = require('../constants');
const { Token } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const Err = require('../errors/error-messages');
const { tokenService } = require('../services');

module.exports = {

  verifyAccessToken: async (req, res, next) => {
    try {
      const token = req.get('Authorization');

      if (!token) {
        throw new ErrorHandler(BAD_USER_DATA, Err.TOKEN_NOT_PASSED.message, Err.TOKEN_NOT_PASSED.code);
      }

      const foundedToken = await Token.findOne({ accessToken: token });

      if (!foundedToken) {
        throw new ErrorHandler(BAD_USER_DATA, Err.TOKEN_NOT_VALID.message, Err.TOKEN_NOT_VALID.code);
      }
      await tokenService.checkTokenValid(token);

      const verifiedToken = await Token.findOne({ accessToken: token });
      if (!verifiedToken) {
        throw new ErrorHandler(BAD_USER_DATA, Err.TOKEN_NOT_VALID.message, Err.TOKEN_NOT_VALID.code);
      }
      req.userId = verifiedToken.userId;

      next();
    } catch (e) {
      next(e);
    }
  }
};
