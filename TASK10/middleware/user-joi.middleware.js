const { userValidator } = require('../validators');

module.exports = {
  checkUserValidity: (req, res, next) => {
    try {
      const { error } = userValidator.createUser.validate(req.body);

      if (error) {
        throw new Error(error.details[0].message);
      }
      console.log('checkUserValidity');
      next();
    } catch (e) {
      res.json(e.message);
      next(e);
    }
  },
};
