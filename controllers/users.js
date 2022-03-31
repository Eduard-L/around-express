// handlers for sending data to the user // async opertaion
// const bcrypt = require('bcryptjs'); // importing bcrypt

const jwt = require('jsonwebtoken'); // importing the jsonwebtoken module

const User = require('../models/user');

const NOTFOUND_CODE = 404;
const VALIDATION_CODE = 400;
const DEFAULTERROR_CODE = 500;
const UNAUTHORIZED_CODE = 401;

const getUsersData = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).send(users);
    } else {
      res.status(VALIDATION_CODE).send({ message: 'something went wrong with the users' });
    }
  } catch (e) {
    res.status(DEFAULTERROR_CODE).send({ message: 'some thing went wrong with the server ' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.status(200).send(user);
    } else if (user === null) {
      res.status(NOTFOUND_CODE).json({ message: 'User has not found !' });
    } else {
      res.status(VALIDATION_CODE).send({ message: 'something went wrong with find the user ' });
    }
  } catch (e) {
    console.log(e.name)
    if (e.name === 'CastError') {
      res.status(VALIDATION_CODE).json({ message: 'you are trying to search for wrong id length' });
      return;
    }

    res.status(DEFAULTERROR_CODE).send({ message: 'some thing went wrong with the server ' });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    if (newUser) {
      res.status(201).send(newUser);
    } else {
      res.status(VALIDATION_CODE).json({ message: 'something went wrong with user creation' });
    }
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(VALIDATION_CODE).json({ message: 'you have sent a invalid info to the server' });
      return;
    }
    res.status(DEFAULTERROR_CODE).json({ message: 'something went wrong with user creation' });
  }
};

const updateUserInfo = async (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  try {
    const updateInfo = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { runValidators: true, new: true },

    );
    if (updateInfo && (name || about)) {
      res.status(200).send(updateInfo);
    } else if (userId !== '622330c03848c6c39908c775') {
      res.status(NOTFOUND_CODE).json({
        message: 'the user that you are trying to update is no longer excist',
      });
    } else {
      res.status(VALIDATION_CODE).send({ message: 'something went wrong with the update' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(VALIDATION_CODE).json({ message: 'you passing invalid user id, please try again' });
      return;
    }
    if (e.name === 'ValidationError') {
      res.status(VALIDATION_CODE).send({ message: 'your info is invalid , please try again!' });
      return;
    }
    res.status(DEFAULTERROR_CODE).send({ message: `something went wrong with the backend, ${e}` });
  }
};

const updateUserAvatar = async (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  try {
    const updateInfo = await User.findByIdAndUpdate(userId, { avatar }, { runValidators: true });
    if (updateInfo && avatar) {
      res.status(200).send({ message: 'the user avatar updated successfully' });
    } else if (userId !== '622330c03848c6c39908c775') {
      res.status(NOTFOUND_CODE).json({ message: 'the user that you are trying to update is no longer excist' });
    } else {
      res.status(VALIDATION_CODE).send({ message: 'something went wrong with the update avatar' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(VALIDATION_CODE).json({ message: 'you passing invalid user id, please try again' });
      return;
    }
    if (e.name === 'ValidationError') {
      res.status(VALIDATION_CODE).send({ message: 'your info is invalid , please try again!' });
      return;
    }
    res.status(DEFAULTERROR_CODE).send({ message: `something went wrong with the backend, ${e}` });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletingUser = await User.findByIdAndDelete(id);

    if (deletingUser) {
      res.status(200).json(deletingUser);
    } else if (deletingUser === null) {
      res.status(NOTFOUND_CODE).json({ message: 'you are trying to delete user that not excist' });
    } else {
      res.status(VALIDATION_CODE).send({ message: 'error while deleting user' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(VALIDATION_CODE).json({ message: 'you are sending invalid id to the server' });
      return;
    }
    res.status(DEFAULTERROR_CODE).send({ message: 'server error' });
  }
};


module.exports = {
  deleteUser, getUsersData, getUserById, createUser, updateUserAvatar, updateUserInfo,
};
