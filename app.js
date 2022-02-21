const express = require('express');

const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');
const { nonExcistPage } = require('./routes/notFound');

const app = express();
const { PORT = 3000 } = process.env;

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(nonExcistPage);

app.listen(PORT, () => {
  console.log(`everything works at port ${PORT}`);
});
