// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   user: 'root',
//   password: MYSQL_PASSWORD,
//   database: 'feb-2021',
//   host: 'localhost'
// });
// module.exports = connection.promise();

const Sequalize = require('sequelize');
const path = require('path');
const fs = require('fs');
const { constant: { MYSQL_PASSWORD } } = require('../../constants');

module.exports = (() => {
  let instance;

  const initConnection = () => {
    const client = new Sequalize('feb-2021', 'root', MYSQL_PASSWORD, { dialect: 'mysql' });
    const models = {};
    // const models = {
    //   Student: 'XXX'
    // };
    const modelsDirectory = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');
    const readAndSetModels = () => {
      fs.readdir(modelsDirectory, (err, files) => {
        files.forEach((file) => {
          const [modelName] = file.split('.');
          // eslint-disable-next-line import/no-dynamic-require
          const modelFile = require(path.join(modelsDirectory, file));

          models[modelName] = modelFile(client);
        });
      });
    };

    return {
      getModel: (modelName) => models[modelName],
      setModels: () => readAndSetModels()
    };
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = initConnection();
      }

      return instance;
    }
  };
})();
