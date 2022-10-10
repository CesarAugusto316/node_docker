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
        /**
         * 
         * Weather we login or signup we add the user to our current session
         * So we can access that user info whenever we go to any endpoint that
         * requires user authentication.
         */
        req.session.user = user;
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

        if (hasValidPassword) {
          /**
           * 
           * We add a user key-value to our redis db register session
           * and a cookie with same information is send to the browser client
           * as well.
           */
          req.session.user = userFound;

          return res.status(200).json({
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
