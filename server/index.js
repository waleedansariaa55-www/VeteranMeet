require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import all models to register schemas
require('./models/User');
require('./models/Event');
require('./models/Post');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
app.use('/api/admin', require('./routes/admin'));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/veteranmeet')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
