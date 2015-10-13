// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: 'Email address is required'       //TODO: validate
    },
    token: {
        type: String,
        required: 'Token is required'
    },
    loginType: String
});

// Return model
module.exports = restful.model('Users', userSchema);