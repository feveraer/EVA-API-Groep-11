// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var challengeSchema = new mongoose.Schema({
    title: String,
    description: String,
    difficulty: {                           //Level:
        type: Number,                       //1 = easy
        min: 1,                             //2 = medium
        max: 3                              //3 = hard
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        index: true
    }
});

// Return model
module.exports = restful.model('Challenge', challengeSchema);