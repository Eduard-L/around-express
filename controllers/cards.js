// handlers for sending data to the user // async opertaion
const path = require('path');

const cardsFilePath = path.join(__dirname, '..', 'data', 'cards.json');

const { readCardsData } = require('../helpers/files');

const getCards = async (req, res) => {
  try {
    const cardsData = await readCardsData(cardsFilePath);
    if (cardsData) {
      res.send(cardsData);
    } else {
      res.send('something went wrong with the cards data');
    }
  } catch (e) {
    res.status(500).send('{message: something went wrong with the server}');
  }
};

const getCardsById = async (req, res) => {
  try {
    const cardsData = await readCardsData(cardsFilePath);
    const card = cardsData.find((c) => c._id === req.params.id);

    if (card) {
      res.send(card);
    } else {
      res.status(404).send('{ message: card is not found }');
    }
  } catch (e) {
    res.status(500).send('{ message: something went wrong with the server }');
  }
};

module.exports = { getCards, getCardsById };
