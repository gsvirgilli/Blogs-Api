const jwt = require('jsonwebtoken');
const { User } = require('../models');

const key = process.env.JWT_SECRET || '1234';

const createToken = (payload) => {
  const tokenPassword = jwt.sign({ payload }, key);
  return tokenPassword;
};

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }
  const token = createToken({ payload: user });
  return { status: 200, data: { token } };
};

module.exports = {
  login,
  createToken,
};