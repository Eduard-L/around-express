const allowedCors = [
  'https://www.spartan-warrior.students.nomoreparties.sbs',
  'http://www.spartan-warrior.students.nomoreparties.sbs',
  'https://spartan-warrior.students.nomoreparties.sbs',
  'http://spartan-warrior.students.nomoreparties.sbs',
  'https://api.spartan-warrior.students.nomoreparties.sbs',
  'http://api.spartan-warrior.students.nomoreparties.sbs',
  'localhost:3000'
];

function handleCors(req, res, next) {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  next();
}
module.exports = { handleCors }
