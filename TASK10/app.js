const express = require('express');
const fileLoad = require('express-fileupload');
// eslint-disable-next-line spaced-comment
const path = require('path');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
require('dotenv').config();

const { rootRouter, userRouter } = require('./router');
const connection = require('./database/MySQL');

const app = express();
mongoose.connect('mongodb://localhost:27017/feb-2021',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use(fileLoad());

app.get('/mysql', async (req, res) => {
  let newVar = {};

  try {
    newVar = await connection.query(`SELECT * FROM students WHERE id=${req.query.id}`);
  } catch (e) {
    console.log(e.message);
  }

  res.json(newVar[0]);
});

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_hadleErrors);

app.listen(3000, () => {
  console.log('App listen 3000');
});
// eslint-disable-next-line no-unused-vars
function _hadleErrors(err, req, res, next) {
  console.log(err);
  console.log(err.status, err.message, err.code);
  res
    .status(err.status)
    .json({
      status: err.status,
      message: err.message || 'Unknown error',
      customCode: err.code || 0
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Rout not fond'
  });
}
