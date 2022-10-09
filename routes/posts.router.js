const { Router } = require('express');
const postsController = require('../controllers/posts.controller.js');


const postsRouter = Router();

postsRouter.route('/')
  .get(postsController.getAll)
  .post(postsController.create);

postsRouter.route('/:id')
  .get(postsController.getById)
  .patch(postsController.update)
  .delete(postsController.remove);

module.exports = { postsRouter };
