// handlers for reading files

const fs = require('fs');

const readUsersData = (filePath) => {
  return fs.promises.readFile(filePath)
    .then((file) => {
      return JSON.parse(file);
    });
};

const readCardsData = (filePath) => {
  return fs.promises.readFile(filePath)
    .then((file) => {
      return JSON.parse(file);
    });
};

module.exports = { readUsersData, readCardsData };
