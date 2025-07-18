const express = require('express');
const cors = require('cors');
const path = require('path');
const appointmentRoutes = require('./routes/appointmentRoutes');
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accountRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
require("dotenv").config();

const app = express();

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api', chatRoutes); // leave this last among APIs if it’s generic

// Catch-all: serve React app for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
