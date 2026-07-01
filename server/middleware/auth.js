const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: 'No token, authorization denied' });
    }

    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
