const express = require('express');
// eslint-disable-next-line spaced-comment
//const path = require('path');
const mongoose = require('mongoose');
const { rootRouter, userRouter } = require('./router');

const app = express();
mongoose.connect('mongodb://localhost:27017/feb-2021', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use(_hadleErrors);

app.listen(3000, () => {
  console.log('App listen 3000');
});
// eslint-disable-next-line no-unused-vars
function _hadleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.code || 0
    });
}
