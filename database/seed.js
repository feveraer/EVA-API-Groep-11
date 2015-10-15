var User = require('../models/user'),
    Challenge = require('../models/challenge');

console.log('Seeding data...');

var muesliChallenge = new Challenge({
    title: "Eet muesli als ontbijt",
    description: "Begin met het opwarmen van...",
    difficulty: 1
});

var sojaMelkChallenge = new Challenge({
    title: "Drink een glas sojamelk",
    description: "Sojamelk drinken in plaats van...",
    difficulty: 1
});

muesliChallenge.save();
sojaMelkChallenge.save();

var bert = new User({
    email: "bert.beerens@gmail.com",
    token: "12345679abc",
    loginType: "gmail",
    tasks: [
        {
            dueDate: new Date,
            completed: true,
            challenge: muesliChallenge._id
        },
        {
            dueDate: new Date,
            challenge: sojaMelkChallenge._id
        }
    ]
});

bert.save(function(error) {
    if(!error) {
        console.log('find users...');
        User.find({})
            .populate('tasks.challenge')
            .exec(function(error, users) {
                console.log(JSON.stringify(users, null, "\t"));
            });
    } else {
        console.log(error.message);
    }
});