// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var challengeSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: 'Challenge id is required'
    },
    title: String,
    description: String,
    difficulty: {                           //Level:
        type: Number,                       //1 = easy
        min: 1,                             //2 = medium
        max: 3                              //3 = hard
    }
});

// Return model
module.exports = restful.model('Challenge', challengeSchema);