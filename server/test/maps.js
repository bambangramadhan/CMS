const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const Maps = require('../models/maps');
const should = chai.should();

chai.use(chaiHTTP);

describe('map', function(){

  beforeEach(function(done){
    let map = new Maps({
      title: 'Trans Studio Mall',
      lat:-6.9261257,
      lng:107.6343728
    });

    map.save(function(err){
      done();
    });
  });

  afterEach(function(done){
    Maps.collection.drop();
    done();
  })

  it('Seharusnya sistem mengembalikan maps berdasarkan nilai title yang dimasukan dengan metode POST', function(done){
    chai.request(server)
    .post('/api/maps/search')
    .send({
      title: 'Trans Studio Mall'
    }).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('lat');
      res.body[0].should.have.property('lng');
      res.body[0].title.should.equal('Trans Studio Mall');
      res.body[0].lat.should.equal(-6.9261257);
      res.body[0].lng.should.equal(107.6343728);
      done();
    })
  })

  it('Seharusnya sistem mengembalikan nilai title, latitude dan longitude dengan metode GET', function(done){
    chai.request(server)
    .get('/api/maps')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body[0].should.be.an('object');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('lat');
      res.body[0].should.have.property('lng');
      res.body[0].title.should.equal('Trans Studio Mall');
      res.body[0].lat.should.equal(-6.9261257);
      res.body[0].lng.should.equal(107.6343728);
      done();
    })
  })

  it('Seharusnya sistem berhasil mengubah maps dengan metode PUT', function(done){
    chai.request(server)
    .get('/api/maps')
    .end((err, res) => {
      chai.request(server)
      .put('/api/maps/' + res.body[0]._id)
      .send({
        title: 'Trans Studio Mall',
        lat:-6.9261257,
        lng:107.6343728
      }).end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.success.should.equal(true);
        res.body.message.should.equal("data has been updated");
        res.body.data.title.should.equal('Trans Studio Mall');
        res.body.data.lat.should.equal(-6.9261257);
        res.body.data.lng.should.equal(107.6343728);
        done();
      })
    })
  })

  it('seharusnya menambahkan satu data dengan metode POST', function(done){
    chai.request(server)
    .post('/api/maps')
    .send({
      title: 'Cihampelas Walk',
      lat:-6.8965475,
      lng:107.6103536
    }).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.should.have.property('message');
      res.body.should.have.property('data');
      res.body.success.should.equal(true);
      res.body.message.should.equal("data has been added");
      res.body.data.title.should.equal('Cihampelas Walk');
      res.body.data.lat.should.equal(-6.8965475);
      res.body.data.lng.should.equal(107.6103536);
      done();
    })
  })

  it('seharusnya menghapus satu data berdasarkan id dengan metode DELETE', function(done){
    chai.request(server)
    .get('/api/maps')
    .end((err, res) => {
      chai.request(server)
      .delete('/api/maps/' + res.body[0]._id)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.success.should.equal(true);
        res.body.message.should.equal("data has been deleted");
        res.body.data.title.should.equal('Trans Studio Mall');
        res.body.data.lat.should.equal(-6.9261257);
        res.body.data.lng.should.equal(107.6343728);
        done();
      })
    })
  })

  it('seharusnya menampilkan satu data berdasarkan id dengan metode GET', function(done){
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      chai.request(server)
      .get('/api/maps/' + res.body[0]._id)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.success.should.equal(true);
        res.body.message.should.equal("data found");
        res.body.data.title.should.equal('Trans Studio Mall');
        res.body.data.lat.should.equal(-6.9261257);
        res.body.data.lng.should.equal(107.6343728);
        done();
      })
    })
  })
})
