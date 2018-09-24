const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const Datadate = require('../models/datadate');
const should = chai.should();

chai.use(chaiHTTP);

describe('date', function(){
  //user.collection.drop();

  beforeEach(function(done){
    let date = new Datadate({
      letter: '2017-12-31',
      frequency: '1.1'
    });

    date.save(function(err){
      done();
    });
  });

  afterEach(function(done){
    Datadate.collection.drop();
    done();
  });

  it('seharusnya mencari datadate berdasarkan datadate yang dimasukkan dengan metode POST', function(done) {
    chai.request(server)
    .post('api/datadate/search')
    .send({
      letter: '2017-12-31',
      frequency: '1.1'
    }).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.property('_id');
      res.body.should.have.property('letter');
      res.body.should.have.property('frequency');
      res.body.letter.should.equal('2017-12-31');
      res.body.frequency.should.equal('1.1');
      done();
    })
  })

  it('seharusnya menampilkan semua datadate yang ada di database dengan metode GET', function(done) {
    chai.request(server)
    .get('api/datadate')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('letter');
      res.body[0].should.have.property('frequency');
      res.body[0].letter.should.equal('2017-12-31');
      res.body[0].frequency.should.equal('1.1');
      done();
    })
  })

  it('seharusnya merubah satu datadate berdasarkan id dengan metode PUT', function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      chai.request(server)
      .put('/api/datadate/' + res.body[0]._id)
      .send({
        letter: "2018-12-31",
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
        res.body.letter.should.equal('2018-12-31');
        res.body.frequency.should.equal('1.2');
        done();
      })
    })
  })

  it('seharusnya menambahkan satu datadate dengan metode POST', function(done) {
    chai.request(server)
    .post('api/datadate')
    .send({
      letter: '2018-12-31',
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
      res.body.letter.should.equal('2018-12-31');
      res.body.frequency.should.equal('1.2');
      done();
    })
  })

  it('seharusnya menghapus satu datadate berdasarkan id dengan metode DELETE', function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      chai.request(server)
      .delete('/api/datadate/' + res.body[0]._id)
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
        res.body.letter.should.equal('2018-12-31');
        res.body.frequency.should.equal('1.2');
        done();
      })
    })
  })

  it('seharusnya menampilkan satu datadate berdasarkan id dengan metode GET', function(done){
    chai.request(server)
    .get('/api/datadate/' + res.body[0]._id)
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
      res.body.letter.should.equal('2018-12-31');
      res.body.frequency.should.equal('1.2');
      done();
    })
  })
