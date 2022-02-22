// handlers for sending data to the user // async opertaion

const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const { readUsersData } = require('../helpers/files');

const getUsersData = async (req, res) => {
  try {
    const users = await readUsersData(usersFilePath);
    if (users) {
      res.send(users);
    } else {
      res.send('users are not found');
    }
  } catch (e) {
    res.status(500).send('{ message: some thing went wrong with the server }');
    console.log('error happened in getting users');
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await readUsersData(usersFilePath);
    const user = users.find((u) => u._id === req.params.id);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send('{ message: User ID not found }');
    }
  } catch (e) {
    console.log('error happened in getting user');
    res.status(500).send('{ message: some thing went wrong with the server }');
  }
};

module.exports = { getUsersData, getUserById };
