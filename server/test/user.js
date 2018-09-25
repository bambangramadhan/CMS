const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const User = require('../models/user');
const should = chai.should();

chai.use(chaiHTTP);

describe('user', function(){
  //user.collection.drop();

  beforeEach(function(done){
    let user = new User({
      email: 'bambang@gmail.com',
      password: '1234'
    });

    user.save(function(err){
      done();
    });
  });

  afterEach(function(done){
    User.collection.drop();
    done();
  });

  it('seharusnya menyimpan data dan menampilkan email dan token dengan metode GET', function(done){
    chai.request(server)
    .post('api/users/register')
    .send({
      email: 'restu@gmail.com',
      password: '1234'
      retypepassword: '1234'
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.should.have.property('token');
      res.body.data.should.be.a('object');
      res.body.token.should.be.a('string');
      res.body.data.email.should.equal('restu@gmail.com');
      done();
    })
  })

  it('seharusnya mengautentikasi data dengan metode POST', function(done){
    chai.request(server)
    .post('api/users/login')
    .send({
      email: 'restu@gmail.com',
      password: '1234'
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.should.have.property('token');
      res.body.data.should.be.a('object');
      res.body.token.should.be.a('string');
      res.body.data.email.should.equal('restu@gmail.com');
      done();
    })
  })

  it('seharusnya mengecek token dengan metode POST', function(done){
    chai.request(server)
    .post('api/users/check')
    .send({
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlc3R1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCIsImlhdCI6MTUzNzcxNjE3MX0.UULAtTPm2-NzEuYc9XjgmIVHD_bCkgTauksQx0S0yM0'
    }).end(function(error, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('valid');
      res.body.valid.should.equal(true);
      done();
    })
  })

  it('seharusnya menghancurkan token dengan metode GET', function(done){
    chai.request(server)
    .get('/api/users/destroy')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('logout');
      res.body.logout.should.equal(true);
      done();
    })
  })
})
