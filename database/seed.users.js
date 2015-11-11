/*global require,console,module*/
var User = require('../models/user');

var DAY_IN_MS = 86400000;

var config = {
  USERS_AMOUNT: 1,
  TASKS_PER_USER: 30,
  TASKS_PER_DAY: 3,
  DAY_OFFSET: 5
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
      tasks: generateTasks(challenges)
    });
    users.push(user);
    user.save();
  }

  return users;
}

function generateTasks (challenges) {
  var tasks = [];
  for (var dayIndex = 0; dayIndex < config.TASKS_PER_USER; dayIndex++) {
    tasks = tasks.concat(
      generateTasksForDay(challenges, dayIndex)
    );
  }
  return tasks;
}

function generateTasksForDay (challenges, dayIndex) {
  var tasks = [];
  var usedCategories = [];
  for (var taskPerDayIndex = 0; taskPerDayIndex < config.TASKS_PER_DAY; taskPerDayIndex++) {
    var challenge = findChallenge(challenges, dayIndex, taskPerDayIndex, usedCategories);
    var status = getStatusPerDayIndex(dayIndex, taskPerDayIndex);
    var task = {
      dueDate: generateDate(dayIndex),
      challenge: challenge._id,
      completed: (dayIndex < 3),                                          //TODO: replace.. For timeline development!
      status: status                                     // previous days = 2, current day = 1, tomorrow = 0
    };
    // unique category -> add to tasks, next iteration
    usedCategories.push(challenge.category);
    tasks.push(task);
  }
  usedCategories = [];
  return tasks;
}

//first task's date is 5 days before today,
//add a day to taskDate per task
function generateDate (taskIndex) {
  var taskDate = new Date();
  var daysToSubstract = config.DAY_OFFSET * DAY_IN_MS;
  var daysToAdd = (taskIndex + 1) * DAY_IN_MS;

  taskDate.setTime(taskDate.getTime() - daysToSubstract + daysToAdd);
  return taskDate;
}

// not random, keep looping
function findChallenge (challenges, dayIndex, taskPerDayIndex, categoriesUsedToday) {
  var challengeIndex = dayIndex * config.TASKS_PER_DAY + taskPerDayIndex;
  // start at the beginning if more requested than there are challenges
  challengeIndex %= challenges.length;
  return challenges[challengeIndex];
}

// give status for day
function getStatusPerDayIndex (dayIndex, taskPerDayIndex) {
  if (taskPerDayIndex > 0) {
    return 0; // only one task per day can have a status != 0
  }

  var today = config.DAY_OFFSET - 1;
  if (dayIndex < today) { // past
    return 2; // COMPLETED
  } else if (dayIndex === today) { // today & future
    return 0; // NONE
  }
}

module.exports = {
  seedUsers: seedUsers
};