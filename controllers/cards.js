// handlers for sending data to the user // async opertaion
const path = require('path');

const cardsFilePath = path.join(__dirname, '..', 'data', 'cards.json');

const { readCardsData } = require('../helpers/files');

const getCards = async (req, res) => {
  const cardsData = await readCardsData(cardsFilePath);
  res.send(cardsData);
}

const getCardsById = async (req, res) => {
  try {
    const cardsData = await readCardsData(cardsFilePath);
    const card = cardsData.find(card => card._id === req.params.id);

    if (card) {
      res.send(card);
    }
    else {
      res.status(404).send({ "message": "card is not found" });
    }
  }
  catch (e) {
    res.status(500).send({ "message": "something went wrong with the server" });
  }
};

module.exports = { getCards, getCardsById };
