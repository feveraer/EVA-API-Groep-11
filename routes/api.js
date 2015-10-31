// Dependencies
var ___ = require('underscore');
var express = require('express');
var router = express.Router();

// Models
var Category = require('../models/category'),
    Challenge = require('../models/challenge'),
    User = require('../models/user');

// Routes
//      Categories
Category.methods(['get', 'put', 'post', 'delete']);

//      All tasks of a specific user: /categories/id/challenges
Category.route('challenges', {
    detail: true,
    handler: function(req, res, next) {
        Challenge.find({ category : req.params.id })
            //populate('category') will fill our category data
            .populate('category')
            .exec( function(err, challenges){
                if(err) return next(err);
                if(!challenges) return next(new Error('Challenge with ' + req.params.id + ' is null.'));

                res.send(challenges)
            });
    }
});

Category.register(router, '/categories');

//      Challenges
Challenge.methods(['get', 'put', 'post', 'delete']);
Challenge.register(router, '/challenges');

//      Users
User.methods(['get', 'put', 'post', 'delete']);

//      All tasks of a specific user: /users/:id/tasks
User.route('tasks', {
    detail: true,
    handler: function(req, res, next) {
        //populate('tasks.challenge') will fill our challenge data within tasks
        //TODO: Replace when out of dev with -> User.findOne({ _id : req.params.id })
        User.findOne({})
            .populate('tasks.challenge')
            .exec( function(err, user){
                if(err) return next(err);
                if(!user) return next(new Error('User with ' + req.params.id + ' is null.'));

                //Get the user's tasks and define category path for populating
                var tasks = user.get('tasks');
                var populateOptions = {
                    path: 'challenge.category',
                    model: 'Category'
                };

                //Populate categories
                User.populate(tasks, populateOptions, function(err, populatedTasks){
                    res.send(populatedTasks);
                });
            });
    }
});

//      Update a specific task from a specific user: /users/:id/tasks/:taskID
router.put('/users/:userId/tasks/:taskId', function(req, res, next) {
    var taskData = req.body;

    User.findById(req.params.userId, function(err, user) {
        if(err) return next(err);

        // Find the task we want to update
        var task = user.tasks.id(req.params.taskId);
        if(!task) return next(new Error('Task with ' + req.params.taskId + ' not found.'));

        // Update the data for each key in request's body
        // .each is a function of ____ (underscore.js)
        ___.each(taskData, function(value, key) {
            task[key] = value;
        });

        // Save the changes
        user.save(function (err, updatedUser) {
            console.log('changes to user saved!');
            res.send(updatedUser);
        });
    });
});

// Register all routes
User.register(router, '/users');

// Return router
module.exports =  router;
