const { Token } = require('../database');
const { tokenService } = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');
const Err = require('../errors/error-messages');

module.exports = {

  verifyAccessToken: async (req, res, next) => {
    try {
      const token = req.get('Authorization');

      if (!token) {
        throw new ErrorHandler(401, Err.TOKEN_NOT_PASSED.message, Err.TOKEN_NOT_PASSED.code);
      }

      const foundedToken = await Token.findOne({ accessToken: token });

      if (!foundedToken) {
        throw new ErrorHandler(401, Err.TOKEN_NOT_VALID.message, Err.TOKEN_NOT_VALID.code);
      }
      await tokenService.checkTokenValid(token);

      const verifiedToken = await Token.findOne({ accessToken: token });
      if (!verifiedToken) {
        throw new ErrorHandler(401, Err.TOKEN_NOT_VALID.message, Err.TOKEN_NOT_VALID.code);
      }

      req.user = verifiedToken.user;

      next();
    } catch (e) {
      next(e);
    }
  },

};
