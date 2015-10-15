// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var userSchema = new mongoose.Schema({
    email: String,                          //TODO: ADD type: String, unique: true, required: 'Email address is required'
    token: String,                          //TODO: ADD type: String, required: 'Token is required'
    loginType: String,
    tasks: [{
        dueDate: Date,
        completed: {
            type: Boolean,
            default: false
        },
        challenge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Challenge'
        }
    }]
});

// Return model
module.exports = restful.model('User', userSchema);