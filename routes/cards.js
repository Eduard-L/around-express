const cardsRouter = require('express').Router();

const { getCardsById, getCards, createCard, deleteCard, likeCard, disLikeCard } = require('../controllers/cards');
const card = require('../models/card');



cardsRouter.get('/', getCards);

cardsRouter.get('/:id', getCardsById);

cardsRouter.post('/', createCard);

cardsRouter.delete('/:id', deleteCard)

cardsRouter.put('/:id/likes', likeCard)

cardsRouter.delete('/:id/likes', disLikeCard)

module.exports = { cardsRouter };
