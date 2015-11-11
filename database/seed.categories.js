/*global require,module*/
var Category = require('../models/category');
var FixedChallenges = require('./challenges');

function seedCategories () {
  var categoryNames = getCategoryNames();
  var categories = [];

  for (var catIndex = 0; catIndex < categoryNames.length; catIndex++) {
    var category = new Category({
      name: categoryNames[catIndex]
    });

    categories.push(category);
    category.save();
  }
  return categories;
}

function getCategoryNames(){
  return FixedChallenges.createCategories();
}

module.exports = {
  getCategoryNames: getCategoryNames,
  seedCategories: seedCategories
};