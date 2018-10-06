var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const Maps = require('../models/maps');
var ObjectId = require('mongodb').ObjectID;

router.post('/search', function(req, res, next){
  Maps.findOne({
    title: req.body.title
  }).then(data => {
    res.json(
      [
        {
          _id: data._id,
          title: data.title,
          lat: data.lat,
          lng: data.lng
        }
      ]
    )
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.get('/', function(req, res, next){
  Maps.find()
  .then(data => {
    res.json(data)
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.put('/:id', function(req, res, next){
  let id = req.params.id
  Maps.findByIdAndUpdate(id, {
    title: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
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
          title: data.title,
          lat: data.lat,
          lng: data.lng
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.post('/', function(req, res, next){
  let map = new Maps({
    title: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
  })
  map.save().then(data => {
    res.json({
      success: true,
      message: 'data has been added',
      data: {
        _id: data._id,
        title: data.title,
        lat: data.lat,
        lng: data.lng
      }
    })
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.delete('/:id', function(req, res, next){
  Maps.findByIdAndRemove(req.params.id)
  .then(data => {
    if(!data){
      res.json({error: true, message: `note with id : ${id} not found`})
    }else {
      res.json({
        success: true,
        message: 'data has been deleted',
        data: {
          _id: data._id,
          title: data.title,
          lat: data.lat,
          lng: data.lng
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

router.get('/:id', function(req, res, next){
  Maps.findOne({
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
          title: data.title,
          lat: data.lat,
          lng: data.lng
        }
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

module.exports = router;
