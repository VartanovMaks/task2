const { passwordHasher } = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');
const errors = require('../errors/error-messages');
const { createTokenPair } = require('../services');
const { TokenBase } = require('../database');

module.exports = {
  loginUser: async (req, res) => {
    try {
      if (!req.user) {
        throw new ErrorHandler(404, errors.USER_NOT_FOUND.message, errors.USER_NOT_FOUND.code);
      }

      const { password, _id } = req.body;
      const hashedPassword = req.user.password;

      await passwordHasher.compare(hashedPassword, password);

      const createdTokens = createTokenPair();

      await TokenBase.create({ ...createdTokens, userId: _id });

      delete req.user._id;

      res.json({ ...createdTokens, user: req.user });
    } catch (e) {
      res.json(e.message);
    }
  },

};
