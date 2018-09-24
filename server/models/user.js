const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  retypepassword: String,
  token: String
})

module.exports = mongoose.model('User', userSchema);
