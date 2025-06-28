const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const appointmentRoutes = require('./routes/appointmentRoutes');
// Add chatbotRoutes later...

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/appointments', appointmentRoutes);
// Later: app.use('/api/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;