const { Category } = require('../models');

const createCategory = async (category) => {
  const result = await Category.create(category);

  return { status: 201, data: result };
};

const getAllCategories = async () => {
  const result = await Category.findAll();

  return { status: 200, data: result };
};

module.exports = {
  createCategory,
  getAllCategories,
};