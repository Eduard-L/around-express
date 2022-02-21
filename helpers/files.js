// handlers for reading files

const fs = require('fs');

const readUsersData = (filePath) => {
  const usersData = fs.promises.readFile(filePath)
    .then((file) => {
      return JSON.parse(file);
    });
  return usersData;
};

const readCardsData = (filePath) => {
  const cardsData = fs.promises.readFile(filePath)
    .then((file) => {
      return JSON.parse(file);
    });
  return cardsData;
};

module.exports = { readUsersData, readCardsData };
