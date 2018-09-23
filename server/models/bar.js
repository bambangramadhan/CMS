const mongoose = require('mongoose');

const barSchema = mongoose.Schema({
  email: String,
  password: String,
  retypepassword: String,
  token: String
})

module.exports = mongoose.model('index', barSchema);
