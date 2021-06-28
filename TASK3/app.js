const express = require('express');
const path = require('path');
const {rootRouter,userRouter} = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);
app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('App listen 3000');
});

