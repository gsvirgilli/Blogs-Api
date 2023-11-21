const jwt = require('jsonwebtoken');
const { User } = require('../models');

const key = process.env.JWT_SECRET || '1234';
const createToken = (payload) => {
  const token = jwt.sign({ payload }, key);
  return token;
};

const userService = async (displayName, email, password) => {
  const result = await User.findOne({
    where: { email },
  });

  if (result) {
    return { status: 409, data: { message: 'User already registered' } };
  }

  const createUser = await User.create({ displayName, email, password });
  const { id } = createUser;
  const token = createToken({ id });
  return { status: 201, data: { token } };
};

const getAllUsers = async () => {
  const result = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { status: 200, data: result };
};

const getUserById = async (id) => {
  const result = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  
  if (!result) {
    return { status: 404, data: { message: 'User does not exist' } };
  }
  return { status: 200, data: result };
};

module.exports = {
  userService,
  getAllUsers,
  getUserById,
};