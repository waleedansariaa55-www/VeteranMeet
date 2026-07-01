const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create event
router.post('/', auth, async (req, res) => {
  try {
    console.log('Create event request:', { userId: req.userId, body: req.body });
    
    const {
      title,
      description,
      eventType,
      location,
      startDate,
      endDate,
      hobbiesRequired,
      maxStars,
    } = req.body;

    // Validate required fields
    if (!title || !eventType || !startDate || maxStars === undefined) {
      return res.status(400).json({ 
        message: 'Title, event type, start date, and max stars are required' 
      });
    }

    if (maxStars > 5000) {
      return res
        .status(400)
        .json({ message: 'Event cannot have more than 5000 stars' });
    }

    // Set default coordinates if not provided
    let eventLocation = location;
    if (!eventLocation) {
      eventLocation = { city: '' };
    }
    if (!eventLocation.coordinates) {
      eventLocation.coordinates = {
        type: 'Point',
        coordinates: [0, 0]  // Default: [longitude, latitude]
      };
    }

    const event = new Event({
      title,
      description,
      eventType,
      createdBy: req.userId,
      location: eventLocation,
      startDate,
      endDate,
      hobbiesRequired: hobbiesRequired || [],
      maxStars,
      currentStars: 0,
    });

    // Get user to determine creator type
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    event.createdByType = user.userType;

    await event.save();
    console.log('Event created successfully:', event._id);

    // Add to user's events created
    user.eventsCreated.push(event._id);
    await user.save();

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const { city, eventType, hobbies } = req.query;

    const filter = { isActive: true };
    if (city) filter['location.city'] = city;
    if (eventType) filter.eventType = eventType;
    if (hobbies) filter.hobbiesRequired = hobbies;

    const events = await Event.find(filter)
      .populate('createdBy', 'name email profession')
      .sort({ startDate: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get event by ID
router.get('/:eventId', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate('createdBy', 'name email profession')
      .populate('interested', 'name email')
      .populate('attending', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark event as interested
router.post('/:eventId/interested', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!event.interested.includes(req.userId)) {
      event.interested.push(req.userId);
      await event.save();
    }

    res.json({ message: 'Marked as interested', event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark event attendance and add stars
router.post('/:eventId/attend', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    const user = await User.findById(req.userId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!event.attending.includes(req.userId)) {
      event.attending.push(req.userId);

      // Add stars to user
      const starsToAdd = Math.min(100, event.maxStars);
      user.stars += starsToAdd;

      // Update veteran category based on stars
      if (user.stars >= 100000) user.veteranCategory = 'Eternal Sage';
      else if (user.stars >= 70000) user.veteranCategory = 'Platinum';
      else if (user.stars >= 65000) user.veteranCategory = 'Sapphire';
      else if (user.stars >= 60000) user.veteranCategory = 'Diamond';
      else if (user.stars >= 50000) user.veteranCategory = 'Golden';
      else if (user.stars >= 40000) user.veteranCategory = 'Ruby';
      else if (user.stars >= 25000) user.veteranCategory = 'Silver';

      event.currentStars = Math.min(event.currentStars + starsToAdd, event.maxStars);

      await event.save();
      await user.save();

      if (!user.eventsAttended.includes(req.params.eventId)) {
        user.eventsAttended.push(req.params.eventId);
        await user.save();
      }
    }

    res.json({
      message: 'Event attendance recorded',
      event,
      userStars: user.stars,
      veteranCategory: user.veteranCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Invite veterans to event
router.post('/:eventId/invite', auth, async (req, res) => {
  try {
    const { veteranIds } = req.body;
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: 'Only event creator can send invitations' });
    }

    for (const veteranId of veteranIds) {
      const veteran = await User.findById(veteranId);
      if (veteran) {
        // Check hobby match
        const hasMatchingHobby = veteran.hobbies.some((hobby) =>
          event.hobbiesRequired.includes(hobby)
        );

        if (hasMatchingHobby) {
          const invitationExists = event.invitations.some(
            (inv) => inv.veteran.toString() === veteranId
          );

          if (!invitationExists) {
            event.invitations.push({
              veteran: veteranId,
              status: 'pending',
            });
          }
        }
      }
    }

    await event.save();
    res.json({ message: 'Invitations sent successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
