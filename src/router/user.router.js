const express = require('express');

const validation = require('../middlewares/validationUser');
const userController = require('../controllers/user.controllers');

const router = express.Router();

router.post('/', validation.validationUser, userController.userController);

module.exports = router;