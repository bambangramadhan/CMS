var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const Datadate = require('../models/datadate');
var ObjectId = require('mongodb').ObjectID;
var moment = require('moment')

router.post('/search', function(req, res) {
  let data1 = {};
  if(req.body.letter){
    data1.letter = req.body.letter
  }
  if(req.body.frequency){
    data1.frequency = req.body.frequency
  }
  Datadate.find(data1)
  .then(datadate => {
    let data = [];
    datadate.forEach(item => {
      data.push({
        _id: item._id,
        letter: moment(item.letter).format("YYYY-MM-DD"),
        frequency: item.frequency
      })
    })
    res.json(data)
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.get('/', function(req, res) {
  Datadate.find()
  .then(datadate => {
    let data = [];
    datadate.forEach(item => {
      data.push({
        _id: item._id,
        letter: moment(item.letter).format("YYYY-MM-DD"),
        frequency: item.frequency
      })
    })
    res.json(data)
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.put('/:id', function(req, res) {
  let id = req.params.id;
  Datadate.findByIdAndUpdate(id, {
    letter: req.body.letter,
    frequency: req.body.frequency
  }, {new: true})
  .then(data => {
    if(!data){
      res.json({error: true, message: `note with id : ${id} not found`})
    }else {
      res.json({
        success: true,
        message: 'data has been updated',
        data: {
          _id: data._id,
          letter: moment(data.letter).format("YYYY-MM-DD"),
          frequency: data.frequency
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.post('/', function(req, res) {
  let data = new Datadate({
    letter: req.body.letter,
    frequency: req.body.frequency
  })
  data.save().then(data => {
    res.json({
      success: true,
      message: 'data has been added',
      data: {
        _id: data._id,
        letter: moment(data.letter).format("YYYY-MM-DD"),
        frequency: data.frequency
      }
    })
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.delete('/:id', function(req, res) {
  Datadate.findByIdAndRemove(req.params.id)
  .then(data => {
    if(!data){
      res.json({error: true, message: `note with id : ${id} not found`})
    }else {
      res.json({
        success: true,
        message: 'data has been deleted',
        data: {
          _id: data._id,
          letter: moment(data.letter).format("YYYY-MM-DD"),
          frequency: data.frequency
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.get('/:id', function(req, res) {
  Datadate.findOne({
    _id: req.params.id
  })
  .then(data => {
    if(!data){
      res.json({error: true, message: `note with id : ${id} not found`})
    }else {
      res.json({
        success: true,
        message: 'data found',
        data: {
          _id: data._id,
          letter: moment(data.letter).format("YYYY-MM-DD"),
          frequency: data.frequency
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

module.exports = router;
