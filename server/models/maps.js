const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapSchema = mongoose.Schema({
  title: String,
  lat: Number,
  lng: Number
})

module.exports = mongoose.model('Map', mapSchema);
