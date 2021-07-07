const { Token } = require('../database');

module.exports = {
  logoutUser: async (req, res, next) => {
    try {
      const token = req.get('Authorization');

      await Token.deleteOne({ accessToken: token });

      res.json('User has successfuly logged out');
    } catch (e) {
      next(e);
    }
  },

};
