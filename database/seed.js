/*global require,console,module*/
var userSeed = require('./seed.users'),
  challengeSeed = require('./seed.challenges'),
  categorySeed = require('./seed.categories');

function fillDatabase () {
  var categories = categorySeed.seedCategories();
  var challenges = challengeSeed.seedChallenges(categories);
  userSeed.seedUsers(challenges);
  console.log('seeding done');
}

module.exports = {
  fillDatabase: fillDatabase
};