module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: {
      field: 'display_name',
      type: DataTypes.STRING(255),
    },
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    image: DataTypes.STRING(255),
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });
  return User;
};