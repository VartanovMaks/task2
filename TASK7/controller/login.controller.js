const { passwordHasher } = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');
const errors = require('../errors/error-messages');
const { tokenService } = require('../services');
const { Token } = require('../database');

module.exports = {
  loginUser: async (req, res) => {
    try {
      if (!req.user) {
        throw new ErrorHandler(404, errors.USER_NOT_FOUND.message, errors.USER_NOT_FOUND.code);
      }

      const { password } = req.body;
      const hashedPassword = req.user.password;
      const id = req.user._id;

      await passwordHasher.compare(hashedPassword, password);

      const createdTokens = tokenService.createTokenPair();

      await Token.create({ ...createdTokens, userId: id });

      res.json({ ...createdTokens, user: req.user });
    } catch (e) {
      res.json(e.message);
    }
  },

};
