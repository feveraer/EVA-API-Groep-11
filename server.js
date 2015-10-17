// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

// MongoDB
mongoose.connect('mongodb://localhost/eva', function(){
    mongoose.connection.db.dropDatabase(function(){
        console.log('Database dropped.');
        require('./database/seed');
    });
});

// Express
var app = express();

//      Morgan to log requests
app.use(morgan('dev'));

//      Body data -> json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));

// Error handling
app.use(function(err, req, res, next){
    console.error(err);
    res.status(500).send({
        status:500,
        message: err.message,
        type:'internal'
    });
});

// Start server
app.listen(1337);
console.log('Eva-API is running on port 1337!')
