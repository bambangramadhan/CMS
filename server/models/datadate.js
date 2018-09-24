const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = mongoose.Schema({
  letter: Date,
  frequency: Number
})

module.exports = mongoose.model('Datadate', dateSchema);
