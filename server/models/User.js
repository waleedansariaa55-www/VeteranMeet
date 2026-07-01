const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['veteran', 'organization', 'ngo'],
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profession: String,
    hobbies: [String],
    bio: String,
    location: {
      city: String,
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: {
          type: [Number], // [longitude, latitude]
          default: [0, 0],
        },
      },
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    stars: {
      type: Number,
      default: 0,
    },
    veteranCategory: {
      type: String,
      enum: [
        'Silver',
        'Ruby',
        'Golden',
        'Diamond',
        'Sapphire',
        'Platinum',
        'Eternal Sage',
      ],
      default: undefined,
    },
    eventsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    eventsAttended: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    postsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Geospatial index for location-based searches
userSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('User', userSchema);
