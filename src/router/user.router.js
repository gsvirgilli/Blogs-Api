const express = require('express');

const validation = require('../middlewares/validationUser');
const userController = require('../controllers/user.controllers');
const { validationToken } = require('../middlewares/validationToken');

const router = express.Router();

router.post('/', validation.validationUser, userController.userController);
router.get('/', validationToken, userController.getAllUsers);

module.exports = router;