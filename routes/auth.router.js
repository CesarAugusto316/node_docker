const { Router } = require('express');
const authController = require('../controllers/auth.controller.js');


const authRouter = Router();

authRouter.route('/')
  .get(authController.getAll);

authRouter.route('/signup')
  .post(authController.signUp);

authRouter.route('/login')
  .post(authController.logIn);

// isAuthenticated
authRouter.route('/:id')
  .delete(authController.remove);
// .get(getById)
// .patch(update)

module.exports = { authRouter };
