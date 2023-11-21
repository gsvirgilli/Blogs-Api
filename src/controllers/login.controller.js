const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService.login(email, password);
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return res.status(result.status).json(result.data);
};

module.exports = {
  login,
};
