// handlers for reading files

const fs = require('fs');

const readUsersData = (filePath) => {
  const userData = fs.promises.readFile(filePath)
    .then((file) => {
      const data = JSON.parse(file);
      return data;
    });
  return userData;
};

const readCardsData = (filePath) => {
  const cardsData = fs.promises.readFile(filePath)
    .then((file) => {
      const data = JSON.parse(file);
      return data;
    });
  return cardsData;
};

module.exports = { readUsersData, readCardsData };
