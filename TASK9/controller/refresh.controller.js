const { constant: { AUTHORIZATION } } = require('../constants');
const { Token } = require('../database');
const { User } = require('../database');
const { tokenService } = require('../services');

module.exports = {
  updateTokenPair: async (req, res, next) => {
    try {
      const refreshToken = req.get(AUTHORIZATION);

      await Token.findOneAndRemove({ refreshToken });

      const createdTokens = tokenService.createTokenPair();

      await Token.create({ ...createdTokens, userId: req.userId });

      const foundedUser = await User.findById(req.userId);

      res.json({ ...createdTokens, user: foundedUser });

      next();
    } catch (e) {
      next(e);
    }
  }

};
