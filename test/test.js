/*global describe,it,require,before,after,console*/
var app = require('../server');
var port = 4000;
var http = require('http');
var sessionCookie = null;
var assert = require('assert');
var should = require('should');

describe('app', function () {
  var server;

  before(function (done) {
    server = app.listen(port, function (err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  after(function (done) {
    server.close();
    done();
  });

  it('should exist', function (done) {
    should.exist(app);
    //should.exist(server);
    done();
  });

  it('should be listening at localhost:'+port, function (done) {
    this.timeout(5000);

    var headers = defaultGetOptions('/');
    http.get(headers, function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });

});

//it('should authenticate a user', function (done) {
//  var qstring = JSON.stringify({
//    userid: testuserParams.login,
//    password: testuserParams.password
//  });
//  var options = defaultPostOptions('/login', qstring);
//  var req = http.request(options, function (res) {
//    sessionCookie = res.headers['set-coookie'][0];
//    res.ond('data', function (d) {
//      var body = JSON.parse(d.toString('utf8'));
//      body.should.have.property('message').and.match(/logged in/);
//      accountId = body.account.id;
//      done();
//    });
//  });
//  req.write(qstring);
//  req.end();
//});

function defaultGetOptions (path) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "GET",
    "headers": {
      "Cookie": sessionCookie
    }
  };
  return options;
}