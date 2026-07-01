const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    console.log('Fetching profile for userId:', req.params.userId);
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('followers', 'name email')
      .populate('following', 'name email')
      .populate('eventsCreated')
      .populate('eventsAttended')
      .populate('postsCreated');

    if (!user) {
      console.log('User not found:', req.params.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User profile fetched successfully:', user._id);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update profile
router.put('/:userId', auth, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this profile' });
    }

    const { name, profession, hobbies, bio, location } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        name,
        profession,
        hobbies,
        bio,
        location,
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Follow a user
router.post('/:userId/follow/:followId', auth, async (req, res) => {
  try {
    console.log('Follow request:', { userId: req.userId, followId: req.params.followId });
    
    if (req.userId === req.params.followId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const user = await User.findById(req.userId);
    const userToFollow = await User.findById(req.params.followId);

    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.following.includes(req.params.followId)) {
      user.following.push(req.params.followId);
      await user.save();

      userToFollow.followers.push(req.userId);
      await userToFollow.save();
      console.log('User followed successfully');
    }

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Follow error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Unfollow a user
router.post('/:userId/unfollow/:followId', auth, async (req, res) => {
  try {
    console.log('Unfollow request:', { userId: req.userId, followId: req.params.followId });
    
    const user = await User.findById(req.userId);
    const userToUnfollow = await User.findById(req.params.followId);

    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.following = user.following.filter(
      (id) => id.toString() !== req.params.followId
    );
    await user.save();

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== req.userId
    );
    await userToUnfollow.save();

    console.log('User unfollowed successfully');
    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error('Unfollow error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search users by location and hobbies
router.get('/search', async (req, res) => {
  try {
    const { city, hobby } = req.query;

    const filter = {};
    if (city) filter['location.city'] = city;
    if (hobby) filter.hobbies = hobby;

    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
