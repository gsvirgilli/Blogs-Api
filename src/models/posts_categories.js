module.exports = (sequelize, DataTypes) => {
  const postCategories = sequelize.define('post_categories', {
    postId: {
      field: 'post_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      field: 'category_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });
  return postCategories;
};