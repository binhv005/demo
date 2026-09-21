const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router
  .route('/')
  .get(articleController.getArticles)
  .post(articleController.createArticle);

router
  .route('/:id')
  .get(articleController.getArticleById)
  .patch(articleController.updateArticle)
  .delete(articleController.deleteArticle);

module.exports = router;
