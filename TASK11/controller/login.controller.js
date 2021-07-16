const { tokenService, smtpService } = require('../services');
const { Token } = require('../database');
const { emailType: { LOGIN } } = require('../constants');

module.exports = {
  loginUser: async (req, res) => {
    try {
      const createdTokens = tokenService.createTokenPair();

      await Token.create({ ...createdTokens, userId: req.user._id });
      smtpService.outgoingMail(req.user.email, LOGIN, { customer: req.user.name, age: req.user.age });

      res.json({ ...createdTokens, user: req.user });
    } catch (e) {
      res.json(e.message);
    }
  },

};
