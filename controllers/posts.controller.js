const { Post } = require('../models/post.model.js');
const { HttpError } = require('../middlewares/httpError.js');


/**
 * 
 * @type {import('express').RequestHandler}
 */
exports.getAll = async (req, res, next) => {
  try {
    const posts = await Post.find();

    if (posts) {
      res.status(200).json({
        posts
      });
    } else {
      next(new HttpError(400, 'no post found'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
exports.getById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.status(200).json({
        post
      });
    } else {
      next(new HttpError(400, 'no post found'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
exports.create = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    if (post) {
      res.status(201).json({
        post
      });
    } else {
      next(new HttpError(400, 'post could not be created'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
exports.update = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (post) {
      res.status(200).json({
        post
      });
    } else {
      next(new HttpError(400, 'post could not be updated'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (deleted) {
      res.status(200).json({
        post: null
      });
    } else {
      next(new HttpError(400, 'post don\'t exist'));
    }
  } catch (error) {
    next(error);
  }
};
