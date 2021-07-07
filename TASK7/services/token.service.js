const jwtoken = require('jsonwebtoken');
const { promisify } = require('util');

const { ACCESS_TOKEN_WORD, REFRESH_TOKEN_WORD } = require('../constants/constant');

const verifyPromise = promisify(jwtoken.verify);

module.exports = {
  createTokenPair: () => {
    const accessToken = jwtoken.sign({}, ACCESS_TOKEN_WORD, { expiresIn: '5m' });
    const refreshToken = jwtoken.sign({}, REFRESH_TOKEN_WORD, { expiresIn: '10d' });

    return {
      accessToken,
      refreshToken
    };
  },

  checkTokenValid: async (token, tokenType = 'access') => {
    const secretWord = tokenType === 'access' ? ACCESS_TOKEN_WORD : REFRESH_TOKEN_WORD;

    await verifyPromise(token, secretWord);
  }
};
