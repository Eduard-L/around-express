const usersRouter = require('express').Router();

const {
  deleteUser, getUsersData, getUserById, createUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsersData);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', createUser);

usersRouter.patch('/me', updateUserInfo);

usersRouter.patch('/me/avatar', updateUserAvatar);

usersRouter.delete('/:id', deleteUser);

module.exports = { usersRouter };
