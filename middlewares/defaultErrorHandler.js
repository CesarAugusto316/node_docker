/**
 * 
 * @param {import('./httpError.js').HttpError | Error} error 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
exports.defaultErrorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'something was wrong';

  if (error) {
    res.status(status).json({
      status,
      message
    });
  } else {
    next();
  }
};
