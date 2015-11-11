/*global require,process,beforeEach,afterEach*/

/*
 * Modified from https://github.com/elliotf/mocha-mongoose
 *
 * This file gets executed automatically when testing
 */

var mongoose = require('mongoose');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

before(function (done) {
  mongoose.connect('mongodb://localhost/eva_test', function(){
    mongoose.connection.db.dropDatabase(function(){
      console.log('Database dropped.');
      require('../database/seed');
      done();
    });
  });
});

after(function (done) {
  mongoose.disconnect();
  return done();
});