'use strict';
let Comment = require('../models/comment-Schema').Comment;
let Post = require('../models/post-Schema').Post;
let User = require('../models/user-Schema').User;

exports.getAllPosts = function(req, res) {
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

        Post.find(where)
        .sort(order)
        .limit(limit)
        .skip(offset)
        .exec((err, posts)=>{
             res.json(posts);
        });
};
exports.addPost = function(req, res) {
    User.findById(req.user._id, (err, user)=>{
        console.log(user);
        if (err) return error;
        if(user) {
            let post = new Post({author: user._id,
                topic: req.body.title,
                text: req.body.body,
            });
            post.save((err, post)=> {
                if (err) return err;
                user.posts.push( post._id );
                user.save((err)=>err);
                res.json(post);
            });
        }else{
            res.sendStatus(404);
        }
    });	
};
exports.getPost = function(req, res) {
    Post.findById(req.params.id, (err, post)=>{
        console.log(req.params.id)
        if (err) return err;
        if(post && post.status == "active") {
            res.json(post);
        }else{
            res.sendStatus(404);
        }
    });
};
exports.updatePost = function(req, res) {
    Post.findById(req.params.id, (err, post)=>{
        if (err) return err;
        if(post && post.status == "active") {
            post.text = req.body.body;
            post.save((err)=>err);
            res.json(post);
        }else{
            res.sendStatus(404);
        }
    });
};
exports.deletePost = function(req, res) {
    User.findById(req.user._id, (err, user)=>{
        if (err) return error;
        if(user && req.user._id == user._id) {
            let index;
            user.posts.forEach((item, i)=>{
                if(item == req.params.id) {
                    index = i;
                }
            });
            if(index) {
                user.posts.splice(index, 1);
            }
            user.save((err)=>err);
            Post.findOneAndUpdate({_id: req.params.id}, {$set:{status:"deleted"}},{ new: true }, function(err, doc) {
            });
            Post.findByIdAndRemove(req.params.id, (err, post)=>{
                if(err) return err;
                if(post) {
                    res.json(post);
                }else{
                    res.sendStatus(404);
                }
            });
        }else{
            res.sendStatus(404);
        }
    });
};
exports.postCount = function(req, res) {
    Post.count(function(err, c) {
          res.json({count:c});
    });
};