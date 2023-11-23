const { BlogPost, PostCategory } = require('../models');
const Category = require('./category.service');

const post = async (title, content, categoryIds, userId) => {
  const noCategories = await Category.categoryGetById(categoryIds);
  
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

module.exports = {
  post,
};
