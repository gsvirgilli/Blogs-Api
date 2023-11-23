const { BlogPost, PostCategory, User, Category } = require('../models');
const serviceCategory = require('./category.service');

const post = async (title, content, categoryIds, userId) => {
  const noCategories = await serviceCategory.categoryGetById(categoryIds);
  
  const newPost = await BlogPost.create(
    { title, content, userId, published: Date.now(), updated: Date.now() },
  );

  const newPostId = categoryIds.map((categoryId) => ({
    postId: newPost.id,
    categoryId,
  }));

  await PostCategory.bulkCreate(newPostId);
  if (noCategories) {
    return { status: 400, message: 'one or more "categoryIds" not found' };
  }
  return { status: 201, data: newPost };
};

const getAll = async () => {
  const allPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { status: 200, data: allPost };
};

const getById = async (id) => {
  const postById = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (postById == null) {
    return { status: 404, data: { message: 'Post does not exist' } };
  }

  return { status: 200, data: postById };
};

module.exports = {
  post,
  getAll,
  getById,
};
