const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  try {
    // First check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Check if user is admin
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = adminAuth;
