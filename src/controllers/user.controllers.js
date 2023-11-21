const userService = require('../services/user.service');

const userController = async (req, res) => {
  const { displayName, email, password } = req.body;
  const result = await userService.userService(displayName, email, password);
  return res.status(result.status).json(result.data);
};

module.exports = {
  userController,
};