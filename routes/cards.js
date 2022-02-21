const cardsRouter = require('express').Router();

const { getCardsById } = require('../controllers/cards');

const { getCards } = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.get('/:id', getCardsById);

module.exports = { cardsRouter };
