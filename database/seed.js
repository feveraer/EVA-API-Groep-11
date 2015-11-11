/*global require,console*/
var userSeed = require('./seed.users'),
  challengeSeed = require('./seed.challenges'),
  categorySeed = require('./seed.categories');


var categories = categorySeed.seedCategories();
var challenges = challengeSeed.seedChallenges(categories);
userSeed.seedUsers(challenges);
console.log('seeding done');