const mongoose = require('mongoose');

const myVal = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,

  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,

  },
  avatar: {
    type: String,
    required: true,
    validate: {

      validator(v) {
        return myVal.isURL(v, { require_protocol: true, allow_underscores: true });
      },

    },
  },

});

module.exports = mongoose.model('user', userSchema);
