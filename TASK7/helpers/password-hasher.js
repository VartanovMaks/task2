const bcrypt = require('bcrypt');
const errors = require('../errors/error-messages');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  compare: async (hashedPassword, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
      throw new ErrorHandler(401, errors.WRONG_EMAIL_OR_PASSWORD.message, errors.WRONG_EMAIL_OR_PASSWORD.code);
    }
  },

  hash: (password) => bcrypt.hash(password, 10)
};
