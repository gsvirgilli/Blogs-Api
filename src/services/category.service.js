const { Category } = require('../models');

const createCategory = async (category) => {
  const result = await Category.create(category);

  return { status: 201, data: result };
};

const getAllCategories = async () => {
  const result = await Category.findAll();

  return { status: 200, data: result };
};

const categoryGetById = async (categoryIds) => {
  const findById = categoryIds.map(async (id) => Category.findByPk(id));
  const result = await Promise.all(findById);

  const nullCategories = result.some((id) => id === null);
  return nullCategories;
};

module.exports = {
  createCategory,
  getAllCategories,
  categoryGetById,
};