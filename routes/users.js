const usersRouter = require('express').Router();

const { getUsersData, getUserById } = require('../controllers/users');

usersRouter.get('/', getUsersData);

usersRouter.get('/:id', getUserById);

module.exports = { usersRouter };
