// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var bcrypt = require('bcrypt');
var SALT_FACTOR = 10;

// Schema
var userSchema = new mongoose.Schema({
    email: String,                          //TODO: ADD type: String, unique: true, required: 'Email address is required'
    name: String,
    password: String,                          //TODO: Change for passport.js, ADD type: String, required: 'Token is required'
    loginType: String,
    registeredOn: Date,
    isHashed: {
        type: Boolean,
        default: false
    },
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

userSchema.pre('save', function(next) {
    var user = this;
    if(user.isHashed) return next();
    if (user.password === undefined) return next();

    bcrypt.hash(user.password, SALT_FACTOR, function(err, hash) {
        if (err) return next(err);
        console.log(user.password + ' -> ' + hash);
        user.password = hash;
        user.isHashed = true;
        next();
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Return model
module.exports = restful.model('User', userSchema);