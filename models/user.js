// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var userSchema = new mongoose.Schema({
    email: String,                          //TODO: ADD type: String, unique: true, required: 'Email address is required'
    name: String,
    token: String,                          //TODO: Change for passport.js, ADD type: String, required: 'Token is required'
    loginType: String,
    tasks: [{
        dueDate: Date,
        completed: {                        //TODO: Available for backward compatibility, remove when dev branches don't use this anymore
            type: Boolean,
            default: false
        },
        status: {
            //0 = NONE, 1 = CHOSEN, 2 = COMPLETED
            type: Number,
            default: 0
        },
        challenge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Challenge'
        }
    }]
});

// Return model
module.exports = restful.model('User', userSchema);