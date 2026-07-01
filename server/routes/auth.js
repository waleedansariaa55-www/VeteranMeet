const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, userType, profession, hobbies, location, username } =
      req.body;

    // Validate required fields
    if (!email || !password || !name || !userType || !username) {
      return res.status(400).json({ message: 'Email, password, name, username, and userType are required' });
    }

    // Validate username length
    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    // Check if user exists by email
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Check if username exists
    user = await User.findOne({ username: username.toLowerCase() });
    if (user) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    user = new User({
      email,
      password,
      name,
      username,
      userType,
      profession: profession || '',
      hobbies: hobbies || [],
      location: location || {},
    });

    await user.save();

    const payload = { userId: user._id, userType: user.userType };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret_key_here', {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user._id, userType: user.userType };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret_key_here', {
      expiresIn: '7d',
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        stars: user.stars,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('followers', 'name email')
      .populate('following', 'name email');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
