/*global require,console,process*/
//API
// Dependencies
var mongoose = require('mongoose');
var path = require('path');

var config = require('./config');
var app = require('./app');
var seed = require('./database/seed');

// MongoDB
mongoose.connect(config.database, function(){
    mongoose.connection.db.dropDatabase(function(){
        console.log('Database dropped.');
        seed.fillDatabase();
    });
});

// Start server
app.listen(1337);
console.log('--Eva-API available on port 1337');

//HTTP
// Dependencies
var serveStatic = require('serve-static');
var connect = require('connect');

var osPathSymbol = (process.platform === 'win32') ? '\\' : '/';
var apiDocFolder = path.join(__dirname, osPathSymbol + 'apidoc');
// Start http server with apiDocFolder as content
//connect().use(serveStatic(apiDocFolder)).listen(80);
console.log('--Documentation from ' + apiDocFolder + ' available on port 80');