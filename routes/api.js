// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Challenge = require('../models/challenge'),
    User = require('../models/user');

// Routes
//      Challenges
Challenge.methods(['get', 'put', 'post', 'delete']);
Challenge.register(router, '/challenges');

//      Users
User.methods(['get', 'put', 'post', 'delete']);

User.route('tasks', {
    detail: true,
    handler: function(req, res, next) {
        //req.populate('tasks.challenge');
        //var tasks = req.body.tasks;
        var id = req.params.id;
        console.log("Tasks requested for user with id: " + id);

        User.findOne({ email : "bert.beerens@gmail.com"})
            .populate('tasks.challenge')
            .exec( function(err, user){
                if(err) console.log(err.message);

                var tasks = user.get('tasks');
                res.send(tasks);
        });
    }
});

User.register(router, '/users');

// Return router
module.exports =  router;