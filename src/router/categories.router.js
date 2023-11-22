const express = require('express');

const { createCategoryController } = require('../controllers/category.controllers');

const { validationCategory } = require('../middlewares/validateCategory');
const { validationToken } = require('../middlewares/validationToken');

const router = express.Router();

router.post('/', validationToken, validationCategory, createCategoryController);

module.exports = router;