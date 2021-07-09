const { tokenService, smtpService } = require('../services');
const { Token } = require('../database');

module.exports = {
  loginUser: async (req, res) => {
    try {
      const createdTokens = tokenService.createTokenPair();

      await Token.create({ ...createdTokens, userId: req.user._id });
      smtpService.outgoingMail(req.user.email);

      res.json({ ...createdTokens, user: req.user });
    } catch (e) {
      res.json(e.message);
    }
  },

};
