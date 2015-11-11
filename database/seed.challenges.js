/*global require,console,module*/
var fs = require('fs');

var Challenge = require('../models/challenge');

var challenges = JSON.parse(fs.readFileSync('./database/challenges.json', 'utf8'));

function seedChallenges (categories) {
  var fixedChallenges = createChallenges(categories);
  var challenges = [];
  for (var challengeIndex = 0; challengeIndex < fixedChallenges.length; challengeIndex++) {
    var challenge = new Challenge(fixedChallenges[challengeIndex % fixedChallenges.length]);

    challenges.push(challenge);
    challenge.save();
  }
  return challenges;
}

function createChallenges(categories){
  // get lookup
  var categoryIdLookup = createLookupFromCategories(categories);

  var challengesWithCategory = challenges;

  for( var i = 0; i < challengesWithCategory.length; i++) {
    var categoryName = challengesWithCategory[i].category;
    var categoryId = categoryIdLookup[categoryName];
    challengesWithCategory[i].category = categoryId;
  }
  return challengesWithCategory;
}

function createLookupFromCategories(categories){
  var categoryName_categoryId_dictionary = [];
  for(var i = 0; i < categories.length; i++){
    categoryName_categoryId_dictionary[categories[i].name] = categories[i]._id;
  }
  return categoryName_categoryId_dictionary;
}

module.exports = {
  seedChallenges: seedChallenges
};