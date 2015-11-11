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

describe('Users', function () {
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

  it('/api/users should return users', function (done) {
    var headers = defaultGetOptions('/api/users');
    http.get(headers, function (res) {
      res.statusCode.should.equal(HTTP.OK);
      res.on('data', function (chunk) {
        var users = JSON.parse(chunk);
        validateUsers(users);
      });
      done();
    });
    // TIMEOUT? check if mongod is running
  });

  it('/api/users/33234/tasks should return tasks', function (done) {
    var headers = defaultGetOptions('/api/users/33234/tasks');
    http.get(headers, function (res) {
      res.statusCode.should.equal(HTTP.OK);
      res.on('data', function (chunk) {
        var tasks = JSON.parse(chunk);
        validateTasks(tasks);
      });
      done();
    });
  });
});

function validateUsers (users) {
  var i, user;
  users.length.should.be.greaterThanOrEqual.to(1);
  for (i = 0; i < users.length; i += 1) {
    user = users[i];
    user.should.have.property('email');
    user.should.have.property('tasks');
    user.should.have.property('name');
  }
}

function validateTasks (tasks) {
  var i, task;
  tasks.length.should.be.greaterThanOrEqual.to(1);
  for (i = 0; i < tasks.length; i += 1) {
    task = tasks[i];
    task.should.have.property('dueDate');
    task.should.have.property('status');
    task.should.have.property('challenge');
  }
}

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