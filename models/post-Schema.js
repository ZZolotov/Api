'use strict';
let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  authorName: {
    type: String
  },
  label: {
    type: String
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  metaKeywords: {
    type: String
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
  comments: [String]
});

let Post = mongoose.model('Post', PostSchema);
module.exports.Post = Post;