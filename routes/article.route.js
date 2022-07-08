const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.js');

router.post('/', articleController.createArticle);

router.put('/:articleId', articleController.updateArticle);

router.get('/', articleController.getListOfArticles);

router.delete('/:articleId', articleController.deleteArticle);

module.exports = router;