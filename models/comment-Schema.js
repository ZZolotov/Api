'use strict';
let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  articleId:{
    type: String,
    required:true
  },
  text: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now 
  },
  status: {
    type:String,
    enum:['active','deleted'],
    default:'active'
  },
  answers: [{
      id: String,
      default: ""
  }]
});

let Comment = mongoose.model('Comment', CommentSchema);
module.exports.Comment = Comment;
