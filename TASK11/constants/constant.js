module.exports = {
  PORT: process.env.PORT || 3000,
  OUTGOING_EMAIL: process.env.OUTGOING_EMAIL || 'noreply@example.com',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'no email password',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,

  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/feb-2021',
  ACCESS_TOKEN_WORD: process.env.ACCESS_TOKEN_WORD || 'ACCESS_CODE WORD',
  REFRESH_TOKEN_WORD: process.env.REFRESH_TOKEN_WORD || 'REFRESH_CODE_WORD',

  AUTHORIZATION: 'Authorization',
  REFRESH: 'refresh',
  ACCESS: 'Access',

  PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  VIDEO_MAX_SIZE: 15 * 1024 * 1024, // 15MB

  PHOTOS_MIMETYPES: [
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/tiff',
    'image/webp'
  ],

  DOCS_MIMETYPES: [
    'application/msword', // DOC
    'application/pdf', // PDF
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
  ],

  VIDEOS_MIMETYPES: [
    'video/mpeg',
    'video/mp4',
  ]

};
