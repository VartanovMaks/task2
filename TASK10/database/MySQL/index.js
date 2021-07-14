const mysql = require('mysql2');
const { constant: { MYSQL_PASSWORD } } = require('../../constants');

const connection = mysql.createConnection({
  user: 'root',
  password: MYSQL_PASSWORD,
  database: 'feb-2021',
  host: 'localhost'
});

module.exports = connection.promise();
