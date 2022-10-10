const { HttpError } = require('./httpError');

/**
 * 
 * @type {import("express").RequestHandler}
 */
exports.isAuthenticated = async (req, res, next) => {
  try {
    const { user } = req.session;
    if (user) {
      req.authenticaedUser = user;
      next();
    } else {
      next(new HttpError(401, 'unauthorized'));
    }
  } catch (error) {
    next(error);
  }
};
