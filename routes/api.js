// Dependencies
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
        User.findOne({ _id : req.params.id })
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

// Register all routes
User.register(router, '/users');

// Return router
module.exports =  router;
