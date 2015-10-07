// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
//    --------------------------------------------------------------------------------
//    |property      |   Local   |   Facebook            |   Google                  |
//    |------------------------------------------------------------------------------|
//    |username :    |   input   |   profile.displayName |   profile.displayName     |
//    |password :    |   input   |   /                   |   /                       |
//    |facebookID :  |   /       |   profile.id          |   /                       |
//    |googleID :    |   /       |   /                   |   profile.id              |
//    --------------------------------------------------------------------------------
var userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true},
    facebookID: String,
    googleID: String
});

// Return model
module.exports = restful.model('Users', userSchema);

