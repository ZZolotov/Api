'use strict';
let passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = require('../models/user-Schema').User;

module.exports.isAuth = (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : res.sendStatus(401);
};