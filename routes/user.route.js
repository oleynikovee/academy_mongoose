const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');

router.post('/', userController.createUser);

router.put('/:userId',userController.updateUser);

router.get('/:userId',userController.getUser);

router.get('/:userId/articles',userController.getUsersArticles);

router.delete('/:userId',userController.deleteUser);

module.exports = router;