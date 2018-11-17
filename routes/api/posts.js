const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Posts Works' });
});

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found.' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that id.' })
    );
});

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(400).json(err));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => Post.findById(req.params.id))
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          errors.notauthorized = 'User not authorized';
          return res.status(401).json(errors);
        }

        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found.' }));
  }
);

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ nopostfound: 'Post not found.' });
        }

        const index = post.likes.findIndex(item => item.user == req.user.id);

        if (index == -1) {
          post.likes.push({ user: req.user.id });
        } else {
          post.likes.splice(index, 1);
        }

        post
          .save()
          .then(post => res.json(post))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(404).json({ nopostfound: 'Post not found' }));
  }
);

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);
        post
          .save()
          .then(post => res.json(post))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(404).json({ postnotfound: 'Post not found.' }));
  }
);

// @route   DELETE api/posts/:id/comment/:comment_id
// @desc    Remove comment from a post
// @access  Private
router.delete(
  '/:id/comment/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ nopostfound: 'Post not found.' });
        }

        const commentToDelete = post.comments.find(
          comment => comment._id.toString() === req.params.comment_id
        );

        if (!commentToDelete) {
          return res
            .status(401)
            .json({ commenterror: 'Comment does not exist.' });
        }

        if (commentToDelete.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ commenterror: 'You cannot delete this comment.' });
        }

        post
          .update({ $pull: { comments: { _id: req.params.comment_id } } })
          .then(() => res.json({ comment: 'Comment deleted.' }))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
