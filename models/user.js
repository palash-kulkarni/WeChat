var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: true,
    unique: true
  },
  email: {
    type: 'string',
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true
  },
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('User', UserSchema);
