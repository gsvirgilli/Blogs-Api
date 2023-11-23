const express = require('express');

const router = express.Router();

const newPost = require('../controllers/blogPost.controllers');
const validate = require('../middlewares/validationPost');
const valiPost = require('../middlewares/validationToken');

router.post('/', valiPost.validationToken, validate.validationPost, newPost.createController);
router.get('/', valiPost.validationToken, newPost.getAllController);
router.get('/:id', valiPost.validationToken, newPost.getByIdController);
router.put('/:id', valiPost.validationToken, newPost.updateController);

module.exports = router;