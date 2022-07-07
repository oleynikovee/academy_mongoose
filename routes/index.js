const userRoutes = require('./user.route.js');
const express = require('express');
const router = express.Router();

router.use('/user', userRoutes);

module.exports = router;
