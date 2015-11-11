/*global describe,it,require,before,after,console*/
var app = require('../app');
var http = require('http');
var should = require('should');
var mongoose = require('mongoose');

var Challenge = require('../models/challenge');
var utils = require('./utils');

var port = 4000;
var sessionCookie = null;
var OK = 200;

describe('Categories', function () {
  var server;

  before(function (done) {
    server = app.listen(port, function (err, result) {
      if (err) {
        done(err);
      }
      done();
    });
  });

  after(function (done) {
    server.close();
    done();
  });

  describe('/api/categories', function () {

    it('/api/categories/:id/challenges should return challenges', function (done) {
      Challenge.findOne({}).exec(function (err, challenge) {
        should.not.exist(err);
        var categoryId = challenge.category;
        var path = '/api/categories/' + categoryId + '/challenges';
        var headers = defaultGetOptions(path);
        http.get(headers, function (res) {
          res.statusCode.should.equal(OK);
          res.on('data', function (chunk) {
            var users = JSON.parse(chunk);
            validateChallenges(users);
          });
          done();
        });
        // TIMEOUT? check if mongod is running
      });
    });
  });
});

function validateChallenges (challenges) {
  var i, challenge;
  challenges.length.should.be.greaterThanOrEqual.to(1);
  for (i = 0; i < challenges.length; i += 1) {
    challenge = challenges[i];
    challenge.should.have.property('title');
    challenge.should.have.property('description');
    challenge.should.have.property('difficulty');
    challenge.should.have.property('category');
  }
}

function defaultGetOptions (path) {
  return {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "GET",
    "headers": {
      "Cookie": sessionCookie
    }
  };
}