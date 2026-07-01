/**
 * Admin Setup Script
 * Run this once to create an admin account
 * Usage: node setupAdmin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/veteranmeet');
    console.log('MongoDB connected');

    // Admin credentials
    const adminData = {
      email: 'admin@veteranmeet.com',
      password: 'Admin@123456',
      name: 'Admin User',
      userType: 'veteran',
      isAdmin: true,
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin account already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Name:', existingAdmin.name);
      process.exit(0);
    }

    // Create admin user
    const admin = new User(adminData);
    await admin.save();

    console.log('✅ Admin account created successfully!');
    console.log('\n--- Admin Login Credentials ---');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('URL: http://localhost:3000/admin');
    console.log('\n⚠️  IMPORTANT: Save these credentials securely!');
    console.log('⚠️  Change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin:', error);
    process.exit(1);
  }
}

setupAdmin();
