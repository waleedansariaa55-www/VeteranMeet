const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    eventType: {
      type: String,
      enum: [
        'PublicTalk',
        'MotivationalTalk',
        'ProfessionalTalk',
        'ProfessionalTask',
        'PlantationDrive',
        'OrphanageVisit',
        'HospitalVisit',
        'RecreationalVisit',
        'OldHomeVisit',
        'BookReading',
      ],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdByType: {
      type: String,
      enum: ['veteran', 'organization', 'ngo'],
      required: true,
    },
    location: {
      city: String,
      coordinates: {
        type: { type: String, default: 'Point' },
        coordinates: [Number], // [longitude, latitude]
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    hobbiesRequired: [String],
    maxStars: {
      type: Number,
      min: 1,
      max: 5000,
      required: true,
    },
    currentStars: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    interested: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    attending: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    invitations: [
      {
        veteran: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'declined'],
          default: 'pending',
        },
      },
    ],
  },
  { timestamps: true }
);

// Geospatial index for location-based searches
eventSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Event', eventSchema);
