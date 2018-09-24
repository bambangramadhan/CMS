var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const Data = require('../models/data');
var ObjectId = require('mongodb').ObjectID;

router.post('/search', function(req, res, next) {
  Data.findOne({
    letter: req.body.letter,
    frequency: req.body.frequency
  }).then(data => {
    res.json(
      [
        {
          _id: data._id,
          letter: data.letter,
          frequency: data.frequency
        }
      ]
    )
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.get('/', function(req, res, next) {
  Data.find()
  .then(data => {
    res.json(data)
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.put('/:id', function(req, res, next) {
  let id = req.params.id;
  Data.findByIdAndUpdate(id, {
    letter: req.body.letter,
    frequency: req.body.frequency
  }, {new: true})
  .then(data => {
    console.log(data);
    if(!data){
      res.json({error: true, message: `note with id : ${id} not found`})
    }else {
      res.json({
        success: true,
        message: 'data have been updated',
        data: {
          _id: data._id,
          letter: data.letter,
          frequency: data.frequency
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.post('/', function(req, res, next) {
  let data = new Data({
    letter: req.body.letter,
    frequency: req.body.frequency
  })
  data.save().then(data => {
    res.json({
      success: true,
      message: 'data have been added',
      data: {
        _id: data._id,
        letter: data.letter,
        frequency: data.frequency
      }
    })
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.delete('/:id', function(req, res, next) {
  Data.findByIdAndRemove(req.params.id)
  .then(data => {
    if(!data){
      res.json({error: true, message: `note with id : ${id} not found`})
    }else {
      res.json({
        success: true,
        message: 'data have been deleted',
        data: {
          _id: data._id,
          letter: data.letter,
          frequency: data.frequency
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.get('/:id', function(req, res, next) {
  Data.findOne({
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
          letter: data.letter,
          frequency: data.frequency
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

module.exports = router;
