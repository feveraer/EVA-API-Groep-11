// Dependencies
var ___ = require('underscore');
var express = require('express');
var jwt    = require('jsonwebtoken');
var config = require('../config');
var router = express.Router();

// Models
var Category = require('../models/category'),
    Challenge = require('../models/challenge'),
    User = require('../models/user');

// Routes
//      Categories
Category.methods(['get', 'put', 'post', 'delete']);

//      All challenges of a specific category: /categories/id/challenges
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

function findUserById(id){
    //TODO: Replace when out of dev with
    //return User.findOne({ _id : id});
    return User.findOne({});
}

//      All tasks of a specific user: /users/:id/tasks
User.route('tasks', {
    detail: true,
    handler: function(req, res, next) {
        //populate('tasks.challenge') will fill our challenge data within tasks
        findUserById(req.params.id)
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

//      All completed tasks of a specific user: /users/:id/completedtasks
User.route('completedTasks', {
    detail: true,
    handler: function(req, res, next) {
        //populate('tasks.challenge') will fill our challenge data within tasks
        findUserById(req.params.id)
            .populate('tasks.challenge')
            .exec( function(err, user){
                if(err) return next(err);
                if(!user) return next(new Error('User with ' + req.params.id + ' is null.'));

                //Get the user's tasks and define category path for populating
                var tasks = user.get('tasks').filter(
                    function (value) {
                        return (value.status ===  2);
                    }
                );

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

//      current tasks of a specific user: /users/:id/currenttask
User.route('currentTask', {
    detail: true,
    handler: function(req, res, next) {
        //populate('tasks.challenge') will fill our challenge data within tasks
        findUserById(req.params.id)
            .populate('tasks.challenge')
            .exec( function(err, user){
                if(err) return next(err);
                if(!user) return next(new Error('User with ' + req.params.id + ' is null.'));

                //Get the user's tasks and define category path for populating
                var tasks = user.get('tasks').filter(
                    function (value) {
                        return (value.status ===  1);
                    }
                );

                var populateOptions = {
                    path: 'challenge.category',
                    model: 'Category'
                };

                //Populate categories
                User.populate(tasks[0], populateOptions, function(err, populatedTasks){
                    res.send(populatedTasks);
                });
            });
    }
});

//      current tasks of a specific user: /users/:id/registeredOn
User.route('registeredOn', {
    detail: true,
    handler: function(req, res, next) {
        //populate('tasks.challenge') will fill our challenge data within tasks
        findUserById(req.params.id)
            .populate('tasks.challenge')
            .exec( function(err, user){
                if(err) return next(err);
                if(!user) return next(new Error('User with ' + req.params.id + ' is null.'));

                //Get the user's tasks and define category path for populating
                var date = user.get('registeredOn');

                res.send(date);
            });
    }
});

//      current tasks of a specific user: /users/:id/todaysTasks
User.route('todaysTasks', {
    detail: true,
    handler: function(req, res, next) {
        //populate('tasks.challenge') will fill our challenge data within tasks
        findUserById(req.params.id)
            .populate('tasks.challenge')
            .exec( function(err, user){
                if(err) return next(err);
                if(!user) return next(new Error('User with ' + req.params.id + ' is null.'));

                //Get the user's tasks for today and define category path for populating
                var tasks = user.get('tasks').filter(
                    function (value) {
                        var today = new Date();
                        today = new Date(today.toDateString());
                        var taskDate = new Date(value.dueDate);
                        taskDate = new Date(taskDate.toDateString())
                        return (taskDate.valueOf() ===  today.valueOf());
                    }
                );

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

    findUserById(req.params.userId).exec(function(err, user) {
        if(err) return next(err);

        if(!user) return next(new Error('User with '+req.params.userId + ' not found.'));

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
            if(err) return next(err);
            res.send(updatedUser);
        });
    });
});

// Register all routes
User.register(router, '/users');

// Authentication route
router.post('/authenticate', function(req, res, next) {

    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) return next(err);

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.token != req.body.token) {
                res.json({ success: false, message: 'Authentication failed. Password is incorrect.' });
            } else {
                // User has been found with the right password, create a jw-token
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Here is your token :)',
                    token: token
                });
            }

        }

    });
});

// Return router
module.exports =  router;
