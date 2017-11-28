var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Idea = require('../models/idea');

// AUTH Routes
//====================
// Display sign up form
router.get('/register', function (req, res) {
    Idea.find({ display: true }, function (err, allIdeas) {
        if (err) {
            console.log(err);
        } else {
            res.render('register', { ideas: allIdeas });
        }
    });
});

// Get data from sign up form and add to db
router.post('/register', function (req, res) {
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
    });
    User.register(newUser, req.body.password, function (err, User) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            console.log('You are ready to bake!');
            res.redirect('/');
        });
    });
});

// Login Routes
//=====================
// Display login form
router.get('/login', function (req, res) {
    Idea.find({ display: true }, function (err, allIdeas) {
        if (err) {
            console.log(err);
        } else {
            res.render('login', { ideas: allIdeas, message: "You MESSED UP!" });
        }
    });
});

// Get data from login form and verify user in db
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }),
    function (req, res) { });

// logic route
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// Catchall
router.get('*', function (req, res) {
    Idea.find({ display: true }, function (err, allIdeas) {
        if (err) {
            console.log(err);
        } else {
            res.render('catchall', { ideas: allIdeas });
        }
    });
});

// Projects
// Commented out because not in use right now (11/28/2017)
// router.get('/projects', function (req, res) {
//     res.render('projects');
// });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login first!")
    res.redirect('/login');
}

module.exports = router;