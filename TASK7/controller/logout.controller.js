const { constants: { AUTHORIZATION } } = require('../constants');
const { Token } = require('../database');

module.exports = {
  logoutUser: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await Token.deleteOne({ accessToken: token });

      res.json('User has successfuly logged out');
    } catch (e) {
      next(e);
    }
  },

};
