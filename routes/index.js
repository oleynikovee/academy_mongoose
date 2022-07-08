const userRoutes = require('./user.route.js');
const articleRoutes = require('./article.route.js');
const express = require('express');
const router = express.Router();

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);

module.exports = router;
