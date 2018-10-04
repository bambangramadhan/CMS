var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', function(req, res) {
  if(req.body.password == req.body.retypepassword){
    let user = new User({
      email: req.body.email,
      password: req.body.password,
      retypepassword: req.body.retypepassword
    })
    user.save().then(data => {
      res.json({
        data : {
          email: data.email
        },
        token : jwt.sign({email: data.email, password: data.password}, 'tok', { expiresIn: 86400 })
      })
    }).catch(err => {
      res.json({error: true, message: err.message})
    })
  }else {
    res.json({error: true, message: 'retypepassword is not match with the password'})
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }).then(data => {
    if(!data){
      res.json({err: true, message: 'email not found'})
    }else{
      res.json({
        data : {
          email: data.email
        },
        token : jwt.sign({email: data.email, password: data.password}, 'tok', { expiresIn: 86400 })
      })
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
});

router.post('/check', function(req, res) {
  let token = req.body.token || req.query.token
  jwt.verify(token, 'tok', (err, decoded) => {
    if(!decoded){
      res.json({error: true, message: 'invalid token'})
    }else {
      res.json({valid: true})
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
});

router.get('/destroy', function(req, res) {
  res.json({
    logout: true
  })
});

module.exports = router;
