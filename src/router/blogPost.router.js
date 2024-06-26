const express = require('express');

const router = express.Router();

const newPost = require('../controllers/blogPost.controllers');
const valiPost = require('../middlewares/validationToken');

router.post('/', valiPost.validationToken, newPost.createController);
router.get('/', valiPost.validationToken, newPost.getAllController);
router.get('/:id', valiPost.validationToken, newPost.getByIdController);
router.put('/:id', valiPost.validationToken, newPost.updateController);
router.delete('/:id', valiPost.validationToken, newPost.deleteController);

module.exports = router;