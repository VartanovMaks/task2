const { User } = require('../database');

module.exports = {
  checkUserIdExists: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userById = await User.findById(userId);

      if (!userById) {
        throw new Error(`User with id ${userId} not found`);
      }

      req.user = userById;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserNameExists: async (req, res, next) => {
    try {
      req.userExists = false;
      const { name } = req.body;

      const foundedUser = await User.findOne({ name });

      if (foundedUser) req.userExists = true;

      next();
    } catch (e) {
      next(e);
    }
  },

};
