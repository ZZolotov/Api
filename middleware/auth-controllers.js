'use strict';
let passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = require('../models/user-Schema').User,

    index = 0;
let redis  = require('redis'),
    client = redis.createClient(), set_size = 20;

module.exports.login = (req, res, next) => {
  passport.authenticate('local',
    (err, user, info) => {
      return err 
        ? next(err)
        : user
          ? req.logIn(user, (err) =>  {
                client.sadd(index,user);
                  index++;
                  res.sendStatus(200);
            })
          : res.sendStatus(401);
    }
  )(req, res, next);
};

module.exports.logout = (req, res)  =>  {
  req.logout();
  res.sendStatus(200);
};

module.exports.reg =  (req, res, next) => {
  let user = new User({ username: req.body.email, password: req.body.password});
  user.save((err) => {
    return err
      ? next(err)
      : req.logIn(user, (err) => {
        return err
          ? next(err)
          : res.sendStatus(200);
      });
  });
};
