const handleNonExcistPage = (req, res) => {
  res.status(400).send({ 'message': 'Requested resource not found' });
};

module.exports = { handleNonExcistPage };
