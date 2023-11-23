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

module.exports = {
  post,
  getAll,
};
