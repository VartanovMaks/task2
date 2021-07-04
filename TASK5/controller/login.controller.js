const { passwordHasher } = require('../helpers');
const { User } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const errors = require('../errors/error-messages');

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { password, name } = req.body;

      const foundedUser = await User.findOne({ name });

      if (!foundedUser) {
        throw new ErrorHandler(404, errors.USER_NOT_FOUND.message, errors.USER_NOT_FOUND.code);
      }

      await passwordHasher.compare(foundedUser.password, password);

      res.json(foundedUser);
    } catch (e) {
      res.json(e.message);
    }
  },

};
