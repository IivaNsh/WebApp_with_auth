const express = require('express');
const router = express.Router();
var passport = require("passport");

const genPassword = require('../password').genPassword;

const User = require('../models/users');

router.get("/login", (req, res)=>{
    res.render('login');
});

router.get("/register", (req, res)=>{
    res.render('register');
});

router.post('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get("/protected_route", (req, res)=>{
    res.render('protected_route', { authenticated: req.isAuthenticated() });
});

router.post('/login', passport.authenticate('local', {failureRedirect: "/login", successRedirect: '/protected_route'}));

router.post('/register', (req, res, next) => {
    
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    newUser.save().then((user) => { console.log(user) });

    res.redirect('login');
});

module.exports = router