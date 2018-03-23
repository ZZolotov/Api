'use strict';
const express = require('express');
const router = express.Router();

let blog = require('../controllers/blog');
let comments = require('../controllers/comments');

require('../middleware/passport-init')();

let login = require('../middleware/auth-controllers').login,
    reg = require('../middleware/auth-controllers').reg,
    logout = require('../middleware/auth-controllers').logout,
    isAuth = require('../middleware/auth-checking').isAuth;

router.post('/login', login);
router.post('/register', reg);
router.get('/logout', logout);
router.get('/blog' , blog.getAllPosts);
router.post('/blog', blog.addPost);
router.get('/blog/count', blog.postCount);
router.get('/blog/:id', blog.getPost);
router.put('/blog/:id', blog.updatePost);
router.delete('/blog/:id', blog.deletePost);
router.get('/comments/count', comments.countComments);
router.get('/comments', comments.getAllComments);
router.post('/comments', comments.addComment);
router.get('/comments/:id', comments.getComment);
router.put('/comments/:id', comments.updateComment);
router.delete('/comments/:id', comments.deleteComment);
router.put('/*', isAuth);
router.delete('/*', isAuth);
router.post('/*', isAuth);

module.exports = router;