const allowedCors = [
  'https://www.spartan-warrior.students.nomoreparties.sbs',
  'http://www.spartan-warrior.students.nomoreparties.sbs',
  'https://spartan-warrior.students.nomoreparties.sbs',
  'http://spartan-warrior.students.nomoreparties.sbs',
  'https://api.spartan-warrior.students.nomoreparties.sbs',
  'http://api.spartan-warrior.students.nomoreparties.sbs',
  'localhost:3000'
];
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

function handleCors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
}

module.exports = { handleCors }
