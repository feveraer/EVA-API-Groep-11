/*global require,console,module*/
var config = {
  DAY_IN_MS: 86400000,
  TASKS_PER_USER: 30,
  TASKS_PER_DAY: 3,
  TODAY: function () {
    return new Date();
  }
};

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
    var date = generateDate(dayIndex);
    var challenge = findChallenge(challenges, dayIndex, taskPerDayIndex, usedCategories);
    var status = getStatusPerDayIndex(date, taskPerDayIndex);
    var task = {
      dueDate: generateDate(dayIndex),
      challenge: challenge._id,
      completed: (dayIndex < 3),                                          //TODO: replace.. For timeline development!
      status: 0                                     // previous days = 2, current day = 1, tomorrow = 0
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
function generateDate (dayIndex) {
  var daysToAdd = (dayIndex) * config.DAY_IN_MS;
  return new Date(config.TODAY().getTime() + daysToAdd);
}

// not random, keep looping
function findChallenge (challenges, dayIndex, taskPerDayIndex, categoriesUsedToday) {
  var challengeIndex = dayIndex * config.TASKS_PER_DAY + taskPerDayIndex;
  // start at the beginning if more requested than there are challenges
  challengeIndex %= challenges.length;
  return challenges[challengeIndex];
}

// give status for day
function getStatusPerDayIndex (date, taskPerDayIndex) {
  if (taskPerDayIndex > 0) {
    return 0; // only one task per day can have a status != 0
  }

  if (date.getTime() < new Date().getTime() - config.DAY_IN_MS) { // past
    return 2; // COMPLETED
  } else { // today & future
    return 0; // NONE
  }
}

module.exports = {
  generateTasks: generateTasks
};