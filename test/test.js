/*global describe,it,require,before,after,console*/
var app = require('../app');
var http = require('http');
var should = require('should');

var port = 4000;
var sessionCookie = null;
var HTTP = {
  OK: 200,
  NOT_FOUND: 404
};

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

  it('should be listening at localhost:' + port, function (done) {
    var headers = defaultGetOptions('/');
    http.get(headers, function (res) {
      res.statusCode.should.equal(HTTP.NOT_FOUND);
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