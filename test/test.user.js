var should = require("should");
var mongoose = require('mongoose');
var User = require("../models/user.js");
var db;

describe('User', function() {

    before(function (done) {
        db = mongoose.connect('mongodb://localhost/eva');
        done();
    });

    after(function (done) {
        mongoose.connection.close()
        done();
    });

    beforeEach(function(done) {
        console.log('Seeding data...');

       var user = new User({
           username: 'BrianPinsard',
           password: 'pass2easy',
           facebookID: '0a1b2c',
           googleID: '3d4e5f'
       }) ;

        user.save(function(err) {
            errCheck(err, 'New user added.');
            done();
        });
    });

    function errCheck(err, succesMessage) {
        if(err) console.log('ERR: ' + err.message);
        else console.log('\t\t\t' + succesMessage);
    }

    it('find a user by username', function(done) {
        User.findOne({ username: 'BrianPinsard' },
        function(err, user) {
            errCheck(err, 'User found through username.');
            user.username.should.eql('BrianPinsard');
            user.facebookID.should.eql('0a1b2c');
            user.googleID.should.eql('3d4e5f');
            done();
        });
    });

    it('find a user by googleID', function(done) {
        User.findOne({ googleID: '3d4e5f' },
            function(err, user) {
                errCheck(err, 'User found through googleID.');
                user.googleID.should.eql('3d4e5f');
                user.username.should.eql('BrianPinsard');
                done();
            });
    });

    it('find a user by facebookID', function(done) {
        User.findOne({ facebookID: '0a1b2c' },
            function(err, user) {
                errCheck(err, 'User found through facebookID.');
                user.facebookID.should.eql('0a1b2c');
                user.username.should.eql('BrianPinsard');
                done();
            });
    });

    afterEach(function(done) {
       User.remove({}, function() {
            done();
       });
    });

});