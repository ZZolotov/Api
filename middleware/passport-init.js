'use strict';
let passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = require('../models/user-Schema').User;

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password,done) => {
        User.findOne({ username : username},(err,user)=>{
            return err 
            ? done(err)
            : user
                ? password === user.password
                ? done(null, user)
                : done(null, false, { message: 'Incorrect password.' })
                : done(null, false, { message: 'Incorrect username.' });
        });
    }));

        passport.serializeUser((user, done)  => {
            done(null, user.id);
        });


        passport.deserializeUser((id, done) =>  {
            User.findById(id, (err,user) => {
                err 
                ? done(err)
                : done(null,user);
            });
        });
};