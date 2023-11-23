const express = require('express');

const validationUser = require('../middlewares/validationUser');
const userController = require('../controllers/user.controllers');
const token = require('../middlewares/validationToken');

const router = express.Router();

router.post('/', validationUser.validationUser, userController.userController);
router.get('/', token.validationToken, userController.getAllUsers);
router.get('/:id', token.validationToken, userController.getUserById);
router.delete('/me', token.validationToken, userController.deleteUser);

module.exports = router;