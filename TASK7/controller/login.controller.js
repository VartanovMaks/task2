const { tokenService } = require('../services');
const { Token } = require('../database');

module.exports = {
  loginUser: async (req, res) => {
    try {
      const createdTokens = tokenService.createTokenPair();

      await Token.create({ ...createdTokens, userId: req.user._id });

      res.json({ ...createdTokens, user: req.user });
    } catch (e) {
      res.json(e.message);
    }
  },

};
