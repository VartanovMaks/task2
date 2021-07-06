module.exports = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/feb-2021',
  ACCESS_TOKEN_WORD: process.env.ACCESS_TOKEN_WORD || 'ACCESS_CODE WORD',
  REFRESH_TOKEN_WORD: process.env.REFRESH_TOKEN_WORD || 'REFRESH_CODE_WORD',

  AUTHORIZATION: 'Authorization'
};
