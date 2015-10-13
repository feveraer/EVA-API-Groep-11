// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var challengeSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: 'Challenge id is required'       //TODO: validate
    },
    title: String,
    description: String,
    difficulty: Number
});

// Return model
module.exports = restful.model('Users', userSchema);