var User = require('../models/user'),
    Challenge = require('../models/challenge'),
    Category = require('../models/category');

var USERS_AMOUNT = 10,
    CHALLENGES_AMOUNT = 30,
    TASKS_PER_USER = 21,
    DIFF_MIN = 1, DIFF_MAX = 3,
    DAY_IN_MS = 86400000;

console.log('Seeding data...');

//Create categories
var categoryNames = ["Breakfast", "Lunch", "Dinner", "Social"];
var categories = [];

for(var catIndex = 0; catIndex < categoryNames.length; catIndex++){
    var category = new Category({
        name: categoryNames[catIndex]
    });

    categories.push(category);
    category.save();
}

//Generate challenges and save them to the database
var challenges = [];
for(var challengeIndex = 1; challengeIndex <= CHALLENGES_AMOUNT; challengeIndex++){
     var challenge = new Challenge({
         title: "Uitdaging #" + challengeIndex,
         description: "Uitleg voor uitdaging #" + challengeIndex,
         difficulty: randomNumber(DIFF_MIN, DIFF_MAX),
         category: categories[randomNumber(0, categories.length-1)]._id
     });

    challenges.push(challenge);
    challenge.save();
}

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

//Generate random tasks
function generateTasks() {
    var randomTasks = [];

    for(var taskIndex = 0; taskIndex < TASKS_PER_USER; taskIndex++){
        randomTasks.push({
            dueDate: generateDate(taskIndex),
            challenge: challenges[randomNumber(0, CHALLENGES_AMOUNT-1)]._id,
            completed: (taskIndex < 3),                                          //TODO: replace.. For timeline development!
            status: (taskIndex < 4) ? 2 : 1                                     // previous days = 2, current day = 1, tomorrow = 0
        });
    }

    return randomTasks;
}

//first task's date is 5 days before today,
//add a day to taskDate per task
function generateDate(taskIndex) {
    var taskDate = new Date();
    var daysToSubstract = 5 * DAY_IN_MS;
    var daysToAdd = (taskIndex + 1) * DAY_IN_MS;

    taskDate.setTime(taskDate.getTime() - daysToSubstract + daysToAdd);
    return taskDate;
}

//Generate a random number between low and high,
//both are inclusive
function randomNumber (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}