const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const boydParser = require('body-parser')

const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');
const { nonExcistPage } = require('./routes/notFound');

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(boydParser.json())

app.use(helmet());

app.disable('x-powered-by');

const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '622330c03848c6c39908c775' // paste the _id of the test user created in the previous step
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(nonExcistPage);

app.listen(PORT, () => {
  console.log(`everything works at port ${PORT}`);
});
