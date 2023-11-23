const service = require('../services/blogPost.service');

const createController = async (req, res) => {
  const { user } = req;
  const { title, content, categoryIds } = req.body;
  const userId = user.payload.payload.id;
  const postNew = await service.post(title, content, categoryIds, userId);
  res.status(postNew.status).json(postNew.data);
};

const getAllController = async (req, res) => {
  const allPost = await service.getAll();
  res.status(allPost.status).json(allPost.data);
};

module.exports = {
  createController,
  getAllController,
};