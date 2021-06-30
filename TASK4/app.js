const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const {rootRouter,userRouter} = require('./router');

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

function _hadleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.code || 0
    });
}