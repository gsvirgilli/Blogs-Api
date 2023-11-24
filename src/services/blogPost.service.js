const { BlogPost, PostCategory, User, Category } = require('../models');

const post = async (title, content, categoryIds, userId) => {
  if (!title || !content || !categoryIds) {
    return { status: 400, response: { message: 'Some required fields are missing' } };
  }

  const existingCategories = await Category.findAll({ where: { id: categoryIds } });

  if (existingCategories.length !== categoryIds.length) {
    return { status: 400, response: { message: 'one or more "categoryIds" not found' } };
  }

  const createdBlogPost = await BlogPost.create({
    title, content, userId, published: new Date(), updated: new Date(),
  });

  const postId = createdBlogPost.id;
  const postCategoryAssociations = categoryIds.map((categoryId) => ({
    postId,
    categoryId,
  }));

  await PostCategory.bulkCreate(postCategoryAssociations);

  return { status: 201, response: createdBlogPost };
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
