// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
});

// Return model
module.exports = restful.model('Category', categorySchema);