const mainRouter = require('express').Router();

const { cardsRouter } = require('./cards');
const { usersRouter } = require('./users');
const { nonExcistPage } = require('./notFound');

mainRouter.use('/users', usersRouter);
mainRouter.use('/cards', cardsRouter);
mainRouter.use(nonExcistPage);

module.exports = mainRouter;
