const { constant: { AUTHORIZATION } } = require('../constants');
const { smtpService } = require('../services');
const { Token } = require('../database');
const { emailType: { LOGOUT } } = require('../constants');

module.exports = {
  logoutUser: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await Token.deleteOne({ accessToken: token });

      smtpService.outgoingMail(req.user.email, LOGOUT, { customer: req.user.name, age: req.user.age });

      res.json('User has successfuly logged out');
    } catch (e) {
      next(e);
    }
  },

};
