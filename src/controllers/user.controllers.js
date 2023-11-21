const userService = require('../services/user.service');

const userController = async (req, res) => {
  const { displayName, email, password } = req.body;
  const result = await userService.userService(displayName, email, password);
  return res.status(result.status).json(result.data);
};

const getAllUsers = async (req, res) => {
  const { status, data } = await userService.getAllUsers();
  return res.status(status).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userService.getUserById(id);
  return res.status(status).json(data);
};

module.exports = {
  userController,
  getAllUsers,
  getUserById,
};