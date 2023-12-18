const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/User');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
  
    // Extract the token without the "Bearer" prefix
    const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token1' });
    }

    req.user = { id: user._id, username: user.username };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token2' });
  }
};

module.exports = authenticationMiddleware;
