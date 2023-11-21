module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING(255),
  }, {
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });
  return Categories;
};