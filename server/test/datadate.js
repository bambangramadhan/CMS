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
      frequency: 1.1
    });

    date.save(function(err){
      done();
    });
  });

  afterEach(function(done){
    Datadate.collection.drop();
    done();
  });

  it("Seharusnya sistem mengembalikan datadate berdasarkan nilai letter yang dimasukan dengan metode POST", function(done){
    chai.request(server)
    .post('/api/datadate/search')
    .send({
      letter: '2017-12-31'
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('letter');
      res.body[0].should.have.property('frequency');
      res.body[0].letter.should.equal('2017-12-31');
      res.body[0].frequency.should.equal(1.1);
      done();
    })
  })

  it("Seharusnya sistem mengembalikan datadate dengan metode GET", function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('letter');
      res.body[0].should.have.property('frequency');
      res.body[0].letter.should.equal('2017-12-31');
      res.body[0].frequency.should.equal(1.1);
      done();
    })
  })

  it("Seharusnya sistem berhasil mengubah datadate dengan metode PUT", function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      chai.request(server)
      .put('/api/datadate/' + res.body[0]._id)
      .send({
        letter: '2018-09-04',
        frequency: 4.11
      }).end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal("data has been updated");
        response.body.data.letter.should.equal('2018-09-04');
        response.body.data.frequency.should.equal(4.11);
        done();
      })
    })
  })

  it('seharusnya menambahkan satu datadate dengan metode POST', function(done){
    chai.request(server)
    .post('/api/datadate')
    .send({
      letter: '2018-09-04',
      frequency: 4.11
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.should.have.property('message');
      res.body.should.have.property('data');
      res.body.success.should.equal(true);
      res.body.message.should.equal("data has been added");
      res.body.data.letter.should.equal("2018-09-04");
      res.body.data.frequency.should.equal(4.11);
      done();
    })
  })

  it('seharusnya menghapus satu data berdasarkan id dengan metode DELETE', function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      chai.request(server)
      .delete('/api/datadate/' + res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal("data has been deleted");
        response.body.data.letter.should.equal('2017-12-31');
        response.body.data.frequency.should.equal(1.1);
        done();
      })
    })
  })

  it('seharusnya menampilkan datadate berdasarkan id dengan metode GET', function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      chai.request(server)
      .get('/api/datadate/' + res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal("data found");
        response.body.data.letter.should.equal('2017-12-31');
        response.body.data.frequency.should.equal(1.1);
        done();
      })
    })
  })
})
