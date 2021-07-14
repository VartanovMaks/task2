const {
  emailType: {
    LOGIN, LOGOUT, REFRESH, REGISTER
  }
} = require('../constants');

module.exports = {
  [LOGIN]: {
    templateName: 'login',
    subject: 'Login successful'
  },
  [LOGOUT]: {
    templateName: 'logout',
    subject: 'See you later'
  },
  [REFRESH]: {
    templateName: 'refresh',
    subject: 'Access data was changed'
  },
  [REGISTER]: {
    templateName: 'register',
    subject: 'Register success'
  }
};
