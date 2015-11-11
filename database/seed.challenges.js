/*global require,console,module*/
var Challenge = require('../models/challenge');

var FixedChallenges = require('./challenges');

function seedChallenges (categories) {
  var fixedChallenges = FixedChallenges.createChallenges(categories);
  var challenges = [];
  for (var challengeIndex = 0; challengeIndex < fixedChallenges.length; challengeIndex++) {
    var challenge = new Challenge(fixedChallenges[challengeIndex % fixedChallenges.length]);

    challenges.push(challenge);
    challenge.save();
  }
  return challenges;
}

module.exports = {
  seedChallenges: seedChallenges
};