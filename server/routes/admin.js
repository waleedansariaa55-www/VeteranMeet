const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    console.log('Admin: Fetching all users');
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all events (admin only)
router.get('/events', auth, adminAuth, async (req, res) => {
  try {
    console.log('Admin: Fetching all events');
    const events = await Event.find()
      .populate('createdBy', 'name email userType')
      .sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get dashboard statistics (admin only)
router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    console.log('Admin: Fetching statistics');
    const totalUsers = await User.countDocuments();
    const totalVeterans = await User.countDocuments({ userType: 'veteran' });
    const totalOrganizations = await User.countDocuments({ userType: 'organization' });
    const totalNGOs = await User.countDocuments({ userType: 'ngo' });
    const totalEvents = await Event.countDocuments();
    const activeEvents = await Event.countDocuments({ isActive: true });

    res.json({
      totalUsers,
      totalVeterans,
      totalOrganizations,
      totalNGOs,
      totalEvents,
      activeEvents,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:userId', auth, adminAuth, async (req, res) => {
  try {
    console.log('Admin: Deleting user:', req.params.userId);
    
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete event (admin only)
router.delete('/events/:eventId', auth, adminAuth, async (req, res) => {
  try {
    console.log('Admin: Deleting event:', req.params.eventId);
    
    const event = await Event.findByIdAndDelete(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user (admin only)
router.put('/users/:userId', auth, adminAuth, async (req, res) => {
  try {
    console.log('Admin: Updating user:', req.params.userId);
    
    const { name, email, userType, isAdmin, stars, veteranCategory } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        name,
        email,
        userType,
        isAdmin,
        stars,
        veteranCategory,
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update event (admin only)
router.put('/events/:eventId', auth, adminAuth, async (req, res) => {
  try {
    console.log('Admin: Updating event:', req.params.eventId);
    
    const { title, description, eventType, location, isActive, maxStars } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      {
        title,
        description,
        eventType,
        location,
        isActive,
        maxStars,
      },
      { new: true }
    ).populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
