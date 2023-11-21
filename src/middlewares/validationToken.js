const jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET || '1234';

const validationToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.length === 0) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const bearer = authorization.split(' ')[1] || authorization.split(' ')[0];
    const decoded = jwt.verify(bearer, key);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validationToken,
};