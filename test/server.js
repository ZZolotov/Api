'use strict';
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose"),
    User = require('../models/user-Schema').User;

let chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server'),
    should = chai.should();

chai.use(chaiHttp);

describe('blog', () => {
    beforeEach((done) => { //clean db
        User.remove({}, (err) => { 
           done();         
        });     
    });

  describe('/GET blog', () => {
      it('it should GET all the blogs', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/blog')
            .end((err, res) => {
                res.should.have.status(401);
              done();
            });
      });
  });

});