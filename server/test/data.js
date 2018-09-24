const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const Data = require('../models/data');
const should = chai.should();

chai.use(chaiHTTP);

describe('data', function(){
  //user.collection.drop();

  beforeEach(function(done){
    let data = new Data({
      letter: 'A',
      frequency: '1.1'
    });

    data.save(function(err){
      done();
    });
  });

  afterEach(function(done){
    Data.collection.drop();
    done();
  });

  it('seharusnya mencari data berdasarkan data yang dimasukkan dengan metode POST', function(done) {
    chai.request(server)
    .post('api/data/search')
    .send({
      letter: 'A',
      frequency: '1.1'
    }).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.property('_id');
      res.body.should.have.property('letter');
      res.body.should.have.property('frequency');
      res.body.letter.should.equal('A');
      res.body.frequency.should.equal('1.1');
      done();
    })
  })

  it('seharusnya menampilkan semua data yang ada di database dengan metode GET', function(done) {
    chai.request(server)
    .get('api/data')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('letter');
      res.body[0].should.have.property('frequency');
      res.body[0].letter.should.equal('A');
      res.body[0].frequency.should.equal('1.1');
      done();
    })
  })

  it('seharusnya merubah satu data berdasarkan id dengan metode PUT', function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      chai.request(server)
      .put('/api/data/' + res.body[0]._id)
      .send({
        letter: "B",
        frequency: "1.2"
      }).end(function(error, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.success.should.be.a('string');
        res.body.message.should.be.a('string');
        res.body.data.should.be.a('object');
        res.body.letter.should.equal('B');
        res.body.frequency.should.equal('1.2');
        done();
      })
    })
  })

  it('seharusnya menambahkan satu data dengan metode POST', function(done) {
    chai.request(server)
    .post('api/data')
    .send({
      letter: 'B',
      frequency: '1.2'
    }).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.should.have.property('message');
      res.body.should.have.property('data');
      res.body.success.should.be.a('string');
      res.body.message.should.be.a('string');
      res.body.data.should.be.a('object');
      res.body.letter.should.equal('B');
      res.body.frequency.should.equal('1.2');
      done();
    })
  })

  it('seharusnya menghapus satu data berdasarkan id dengan metode DELETE', function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      chai.request(server)
      .delete('/api/data/' + res.body[0]._id)
      .end(function(error, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.success.should.be.a('string');
        res.body.message.should.be.a('string');
        res.body.data.should.be.a('object');
        res.body.letter.should.equal('B');
        res.body.frequency.should.equal('1.2');
        done();
      })
    })
  })

  it('seharusnya menampilkan satu data berdasarkan id dengan metode GET', function(done){
    chai.request(server)
    .get('/api/data/' + res.body[0]._id)
    .end(function(error, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.should.have.property('message');
      res.body.should.have.property('data');
      res.body.success.should.be.a('string');
      res.body.message.should.be.a('string');
      res.body.data.should.be.a('object');
      res.body.letter.should.equal('B');
      res.body.frequency.should.equal('1.2');
      done();
    })
  })
