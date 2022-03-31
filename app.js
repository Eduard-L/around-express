const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const bodyParser = require('body-parser');

const mainRouter = require('./routes/index');

const rateLimit = require('express-rate-limit')

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(limiter)

app.use(bodyParser.json());

app.use(helmet());

app.disable('x-powered-by');

const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '622330c03848c6c39908c775', // paste the _id of the test user created in the previous step
  };

  next();
});

app.use('/', mainRouter);

// if (process.env.NODE_ENV !== "test") {
//   app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//   });
// }

app.listen(PORT, () => {
  console.log(`everything works at port ${PORT}`);
});

