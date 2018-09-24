const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = mongoose.Schema({
  letter: String,
  frequency: Number
})

module.exports = mongoose.model('Data', dataSchema);
