// handlers for sending data to the user // async opertaion

const Card = require('../models/card');

const NOTFOUND_CODE = 404;
const VALIDATION_CODE = 400;
const DEFAULTERROR_CODE = 500;

const getCards = async (req, res) => {
  try {
    const cardsData = await Card.find({});
    if (cardsData) {
      res.status(200).send(cardsData);
    } else {
      res.status(VALIDATION_CODE).send({ message: 'something went wrong with the cards data' });
    }
  } catch (e) {
    res.status(DEFAULTERROR_CODE).send({ message: 'something went wrong with the server' });
  }
};

const getCardsById = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findById(id);
    if (card) {
      res.status(200).send(card);
    } else if (card === null) {
      res.status(NOTFOUND_CODE).json({ message: 'wrong id card is not found' });
    } else {
      res.status(VALIDATION_CODE).send({ message: 'something went wrong with find the card' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(VALIDATION_CODE).json({ message: 'you have typed wrong id length' });
      return;
    }
    res.status(DEFAULTERROR_CODE).send({ message: 'something went wrong with the server ' });
  }
};

const createCard = async (req, res) => {
  const userId = req.user._id;
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: userId });
    if (card) {
      res.status(201).send(card);
    } else {
      res.status(VALIDATION_CODE).json({ message: 'somtething went wrong with card creation' });
    }
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(VALIDATION_CODE).json({ message: 'you have sent a wrong info to the server' });
      return;
    }
    res.status(DEFAULTERROR_CODE).send({ message: 'something wrong with server' });
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;

  try {
    const card = await Card.findByIdAndDelete(id);
    if (card) {
      res.status(200).json({ message: `your card has been deleted : ${card}` });
    } else if (card === null) {
      res.status(NOTFOUND_CODE).json({ message: 'you are trying to delete card that not excist' });
    } else {
      res.status(VALIDATION_CODE).send({ message: 'error while deleting card' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(VALIDATION_CODE).json({ message: 'you are sending invalid id to the server' });
      return;
    }
    res.status(DEFAULTERROR_CODE).send({ message: 'server error' });
  }
};
const likeCard = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (like) {
      res.status(200).send(like);
    } else if (like === null) {
      res.status(NOTFOUND_CODE).json({ message: 'you are trying to like card that is not excist' });
    } else {
      res.status(VALIDATION_CODE).send({ message: 'something went wrong with your like ' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(VALIDATION_CODE).send({ message: 'you pass invalid id for the like card' });
      return;
    }
    res.status(DEFAULTERROR_CODE).send({ message: `something went wrong with the backend ${e}` });
  }
};

const disLikeCard = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (like) {
      res.status(200).send(like);
    } else if (like === null) {
      res.status(NOTFOUND_CODE).json({ message: 'you are trying to dislike card that is not excist' });
    } else {
      res.status(VALIDATION_CODE).send({ message: 'something went wrong with the dislike ' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(VALIDATION_CODE).send({ message: 'you pass invalid id for the dislike card' });
      return;
    }
    res.status(DEFAULTERROR_CODE).json({ message: `something went wrong ${e}` });
  }
};

module.exports = {
  getCards, getCardsById, createCard, deleteCard, likeCard, disLikeCard,
};
