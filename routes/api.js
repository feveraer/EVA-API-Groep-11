// Dependencies
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var SALT_FACTOR = 10;

// Models
var User = require('../models/user')

// Requests
User.methods(['get', 'put', 'post', 'delete']);

// Hash password
User.before('post', hash_password);

function hash_password(req, res, next) {
    console.log('Registering user: ' + req.body.username);

    bcrypt.hash(req.body.password, SALT_FACTOR, function(err, hash){
        console.log('Password: ' + req.body.password + ' --HASHED-TO--> ' + hash);
        req.body.password = hash;
        next();
    });
}

/* Check password
 bcrypt.compare('enterPassHere', hash, function(err, res) {
 // res == true
 });
 */

// Register routes
User.register(router, '/users');

// Return router
module.exports =  router;