const { emailType: { REGISTER } } = require('../constants');
const { smtpService } = require('../services');

module.exports = {
  register: (req, res, next) => {
    try {
      smtpService.outgoingMail(req.body.email, REGISTER, {
        customer: req.body.name,
        age: req.body.age,
        role: req.body.role
      });
      next();
    } catch (e) {
      next(e);
    }
  }

};
