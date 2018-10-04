const Datadate = require('../models/datadate');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bambangdb', {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

let data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));

Datadate.insertMany(data, function (err, r) {
  if(err) throw err;
  console.log('insert data success');
});
