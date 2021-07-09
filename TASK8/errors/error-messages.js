module.exports = {
  USER_ID_NOT_FOUND: {
    message: 'User by id not found',
    code: '404.1'
  },
  USER_NOT_FOUND: {
    message: 'User name not found',
    code: '404.2'
  },
  WRONG_EMAIL: {
    message: 'Email already exists in base',
    code: '400.1'
  },
  WRONG_NAME: {
    message: 'User name already exists in base',
    code: '400.2'
  },
  WRONG_EMAIL_OR_PASSWORD: {
    message: 'Password or email doesn\'t match',
    code: '401.1'
  },
  WRONG_NAME_OR_PASSWORD: {
    message: 'Password or user name not found',
    code: '401.2'
  },
  TOKEN_NOT_PASSED: {
    message: 'Token wasn\'t passed',
    code: '401.3'
  },
  TOKEN_NOT_VALID: {
    message: 'Invalid token',
    code: '401.4'
  },
  WRONG_TEMPLATE: {
    message: 'Template not found',
    code: '204.1'
  }
};
