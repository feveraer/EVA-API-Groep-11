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

//      All tasks of a specific user: /users/id/tasks
User.route('tasks', {
    detail: true,
    handler: function(req, res, next) {
        //populate('tasks.challenge') will fill our challenge data within tasks,
        //without populate we would return the objectId
        User.findOne({ _id : req.params.id })       // api/users/req.params.id/tasks
            .populate('tasks.challenge')
            .exec( function(err, user){
                if(err){
                    console.log(err.message);
                    res.send(err.message);
                    return next;
                }

                var tasks = user.get('tasks');
                res.send(tasks);
        });
    }
});

// Register all routes
User.register(router, '/users');

// Return router
module.exports =  router;