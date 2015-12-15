/*global require,module*/
var fs = require('fs');

var Category = require('../models/category');

var challenges = JSON.parse(fs.readFileSync('./database/challenges.json', 'utf8'));
var categoryNames = filterCategories(challenges);

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
  return categoryNames.slice(0);
}

function filterCategories(challenges){
  var categories = [];
  for (var i = 0; i < challenges.length; i++){
    categories.push(challenges[i].category);
  }
  categories.getUnique = function(){
    var u = {}, a = [];
    for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
        continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
    }
    return a;
  };

  return categories.getUnique();
}

module.exports = {
  getCategoryNames: getCategoryNames,
  seedCategories: seedCategories
};