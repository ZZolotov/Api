'use strict';
let Comment = require('../models/comment-Schema').Comment;
let Post = require('../models/post-Schema').Post;
let User = require('../models/user-Schema').User;

exports.countComments = function(req, res) {
	let where = {};
	if (req.query.where) {
		where = JSON.parse(req.query.where);
	};
        Comment.count(where, function(err, c) {
          res.json({count:c});
        });
};
exports.getAllComments = function(req, res) {
    let where = {};
    if(req.query.where) {
        where = JSON.parse(req.query.where);
    }
    let limit = 10;
    if(req.query.limit) {
        limit = parseInt(req.query.limit);
    }
    let offset = 0;
    if(req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    let order;
    if(req.query.order) {
        order= JSON.parse(req.query.order);
    }

    Comment.find(where)
    .sort(order)
    .limit(limit)
    .skip(offset)
    .exec((err, comments)=>{
         res.json(comments);
    });
};
exports.addComment = function(req, res) {
    User.findById(req.body.author, (err, user)=>{
        if (err) return error;
        if(user) {
            let comment = new Comment({
                author: req.body.author,
                articleId: req.body.articleId,
                text: req.body.text
            });
            comment.save((err, comment)=>{
                user.comments.push(comment._id);
                user.save((err)=>err);
                Post.findById(req.body.articleId, (err, post)=>{
                    post.comments.push(comment._id);
                    post.save((err)=>err);
                    res.json(comment);
                });
            });
        }else{
            res.sendStatus(404);
        }
    });
};
exports.getComment = function(req, res) {
    Comment.findById(req.params.id, (err, comment)=>{
        if (err) return err;
        if(comment && comment.status == "active") {
            res.json(comment);
        }else{
            res.sendStatus(404);
        }
    });
};
exports.updateComment = function(req, res) {
    Comment.findById(req.params.id, (err, comment)=>{
        if (err) return err;
        if(comment && req.user._id == comment.author && comment.status == "active") {
            comment.text = req.body.text;
            comment.save((err)=>err);
            res.json(comment);
        }else{
            res.sendStatus(404);
        }
    });
};
exports.deleteComment = function(req, res) {
    User.findById(req.user._id, (err, user)=>{
        if (err) return error;
        if(user && req.user._id == user.id) {
            let index;
            user.comments.forEach((item, i)=>{
                if(item == req.params.id) {
                    index = i;
                }
            });
            if(index) {
                 user.comments.splice(index, 1);
            }
            user.save((err)=>err);
            Comment.findOneAndUpdate({_id: req.params.id}, {$set:{status:"deleted"}},{ new: true }, function(err, doc) {

            });
        }
    });
};