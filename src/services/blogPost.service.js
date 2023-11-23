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

const update = async (title, content, id, userId) => {
  if (+userId !== +id) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }

  await BlogPost.update({ title, content }, { where: { id } });

  const response = await BlogPost.findByPk(id, {
    include:
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  });

  return { status: 200, data: response };
};

const deletePost = async (id, userId) => {
  const getPost = await getById(id);

  if (getPost.status === 404) {
    return { status: 404, data: { message: 'Post does not exist' } };
  }

  if (getPost.data.userId !== userId) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }
  await BlogPost.destroy({ where: { id } });

  return { status: 204 };
};

module.exports = {
  post,
  getAll,
  getById,
  update,
  deletePost,
};
