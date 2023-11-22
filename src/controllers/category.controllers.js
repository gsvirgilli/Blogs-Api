const { createCategory } = require('../services/category.service');

const createCategoryController = async (req, res) => {
  const { name } = req.body;

  const result = await createCategory({ name });

  res.status(result.status).json(result.data);
};

module.exports = {
  createCategoryController,
};
