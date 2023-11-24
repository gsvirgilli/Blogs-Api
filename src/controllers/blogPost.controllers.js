const service = require('../services/blogPost.service');

const createController = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = req.user.payload.payload.id;
    const result = await service.post(title, content, categoryIds, userId);
    return res.status(result.status).json(result.response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllController = async (req, res) => {
  const allPost = await service.getAll();
  res.status(allPost.status).json(allPost.data);
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.getById(id);
  res.status(status).json(data);
};

const updateController = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const userId = user.payload.payload.id;
  const updatePost = await service.update(title, content, id, userId);
  res.status(updatePost.status).json(updatePost.data);
};

const deleteController = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const userId = user.payload.payload.id;

  const { status, data } = await service.deletePost(id, userId);

  if (status === 404 || status === 401) {
    return res.status(status).json(data);
  }
  res.status(status).end();
};

module.exports = {
  createController,
  getAllController,
  getByIdController,
  updateController,
  deleteController,
};
