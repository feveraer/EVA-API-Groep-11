// Dependencies
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// MongoDB
mongoose.connect('mongodb://localhost/eva');

// Express
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Routes
app.use('/api', require('./routes/api'));

//Seed
require('./database/seed');

// Start server
app.listen(1337);
console.log('Eva-API is running on port 1337!')