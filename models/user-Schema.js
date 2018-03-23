'use strict';
let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  surname:{
    type: String
  },
  userpic: {
      type:String,
      default: ""
  },
  date: {
    type: Date,
    default: Date.now 
  },
  posts: [String], 
  comments:[String]
});

let User = mongoose.model('User', UserSchema);
module.exports.User = User;
