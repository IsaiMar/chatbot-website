const express = require('express');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accountRoutes');
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use("/api", chatRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;