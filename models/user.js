// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Return model
module.exports = restful.model('Users', userSchema);