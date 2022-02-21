const nonExcistPage = require('express').Router();

const { handleNonExcistPage } = require('../controllers/notFound');

nonExcistPage.get('*', handleNonExcistPage);

module.exports = { nonExcistPage };
