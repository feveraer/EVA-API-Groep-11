var User = require('../models/user'),
    Challenge = require('../models/challenge'),
    Category = require('../models/category');

var FixedChallenges = require('./challenges');

var USERS_AMOUNT = 1,
    CHALLENGES_AMOUNT = FixedChallenges.challengesAmount,
    TASKS_PER_USER = 30,
    DIFF_MIN = 1, DIFF_MAX = 3,
    DAY_IN_MS = 86400000,
    TASKS_PER_DAY = 3,
    DAY_OFFSET = 5;

console.log('Seeding data...');

console.log('-creating categories');

//Create categories
var categoryNames = FixedChallenges.createCategories();
var categories = [];

for(var catIndex = 0; catIndex < categoryNames.length; catIndex++){
    var category = new Category({
        name: categoryNames[catIndex]
    });

    categories.push(category);
    category.save();
}

console.log('-creating challenges');

//Generate challenges and save them to the database
var fixedChallenges = FixedChallenges.createChallenges(categories);
var challenges = [];
for(var challengeIndex = 0; challengeIndex < CHALLENGES_AMOUNT; challengeIndex++){
     var challenge = new Challenge(fixedChallenges[challengeIndex % fixedChallenges.length]);

    challenges.push(challenge);
    challenge.save();
}



console.log('-creating users');

//Generate users with tasks and save them to the database
for(var userIndex = 1; userIndex <= USERS_AMOUNT; userIndex++){
    var user = new User({
        email: "gebruiker_" + userIndex + "@gmail.com",
        name: "gebruiker_" + userIndex,
        token: "12345679abc",
        loginType: "facebook",
        tasks: generateTasks()
    });

    user.save();
}

console.log('seeding done');

// give status for day
function getStatusPerDayIndex(dayIndex, taskPerDayIndex){
    if(taskPerDayIndex > 0){
        return 0; // only one task per day can have a status != 0
    }

    var today = DAY_OFFSET - 1;
    if(dayIndex < today) { // before today
        return 2; // COMPLETED
    }else if (dayIndex == today) { // today
        return 1; // CHOSEN
    }else { // after today
        return 1; // CHOSEN, TODO: change to 0; // NONE
    }
}

function generateTasksForDay(dayIndex){
    var tasks = [];
    var usedCategories = [];
    for(var taskPerDayIndex = 0; taskPerDayIndex < TASKS_PER_DAY; taskPerDayIndex++) {
        var challenge = findChallenge(dayIndex, taskPerDayIndex, usedCategories);
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

// not random, keep looping
function findChallenge(dayIndex, taskPerDayIndex, categoriesUsedToday){
    var challengeIndex = dayIndex * TASKS_PER_DAY + taskPerDayIndex;
    // start at the beginning if more requested than there are challenges
    challengeIndex %= challenges.length;
    return challenges[challengeIndex];
}

//Generate random tasks
function generateTasks() {
    console.log('-generating tasks');
    var tasks = [];
    for(var dayIndex = 0; dayIndex < TASKS_PER_USER; dayIndex++){
        tasks = tasks.concat(
          generateTasksForDay(dayIndex)
        );
    }
    return tasks;
}

//first task's date is 5 days before today,
//add a day to taskDate per task
function generateDate(taskIndex) {
    var taskDate = new Date();
    var daysToSubstract = DAY_OFFSET * DAY_IN_MS;
    var daysToAdd = (taskIndex + 1) * DAY_IN_MS;

    taskDate.setTime(taskDate.getTime() - daysToSubstract + daysToAdd);
    return taskDate;
}

//Generate a random number between low and high,
//both are inclusive
function randomNumber (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}