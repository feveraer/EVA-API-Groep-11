/*global require,console,module*/
var User = require('../models/user');

var taskSeed = require('./seed.tasks');

var config = {
  USERS_AMOUNT: 1,
};

function seedUsers (challenges) {
  var users = [];
  for (var userIndex = 1; userIndex <= config.USERS_AMOUNT; userIndex++) {
    var user = new User({
      email: "gebruiker_" + userIndex + "@gmail.com",
      name: "gebruiker_" + userIndex,
      token: "12345679abc",
      loginType: "facebook",
      registeredOn: new Date(2015, 10, 2),
      tasks: taskSeed.generateTasks(challenges)
    });
    users.push(user);
    user.save();
  }

  return users;
}

module.exports = {
  seedUsers: seedUsers
};