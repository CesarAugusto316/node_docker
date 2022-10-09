const { User } = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const { HttpError } = require('../middlewares/httpError.js');


/**
 * 
 * @type {import('express').RequestHandler}
 */
exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users) {
      res.status(200).json({
        users
      });
    } else {
      next(new HttpError(400, 'no user found'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
exports.signUp = async (req, res, next) => {
  try {
    if (req.body.name && req.body.password) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ name: req.body.name, password: hash });

      if (user) {
        res.status(201).json({
          message: 'new user created',
          user
        });
      } else {
        next(new HttpError(400, 'that user already exists'));
      }
    } else {
      next(new HttpError(400, 'some fields are missing'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @type {import('express').RequestHandler}
 */
exports.logIn = async (req, res, next) => {
  try {
    if (req.body.name && req.body.password) {
      const userFound = await User.findOne({ name: req.body.name });

      if (userFound) {
        const hasValidPassword = bcrypt.compareSync(req.body.password, userFound.password);
        // here we should create a session ?

        if (hasValidPassword) {
          req.session.user = userFound;
          // we should return a sessionID as a cookie
          return res.status(201).json({
            message: 'you are logged in',
            user: userFound
          });
        }
      }
      return next(new HttpError(400, 'invalid credentials'));

    } else {
      next(new HttpError(400, 'some fields are missing'));
    }
  } catch (error) {
    next(error);
  }
};

// /**
//  * 
//  * @type {import('express').RequestHandler}
//  */
// exports.update = async (req, res, next) => {
//   try {
//     const post = await Post.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (post) {
//       res.status(200).json({
//         post
//       });
//     } else {
//       next(new HttpError(400, 'post could not be updated'));
//     }
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * 
 * @type {import('express').RequestHandler}
 */
exports.remove = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (deleted) {
      res.status(200).json({
        user: null
      });
    } else {
      next(new HttpError(400, 'user don\'t exist'));
    }
  } catch (error) {
    next(error);
  }
};
