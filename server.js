//API
// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

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
app.use(logger('dev'));

//      Body data -> json
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));

// Error handling
app.use(function(err, req, res, next){
    //Only print stacktrace when in a dev environment
    var stackTrace = {};
    if(app.get('env') === 'development') stackTrace = err;

    console.error(err);
    res.status(500).send({
        status:500,
        message: err.message,
        error: stackTrace,
        type:'internal'
    });
});

// Start server
app.listen(1337);
console.log('--Eva-API available on port 1337');

//HTTP
// Dependencies
var serveStatic = require('serve-static');
var connect = require('connect');

// Start http server with apidoc as content
connect().use(serveStatic(__dirname + '/apidoc')).listen(80);
console.log('--Documentation available on port 80');
