const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const appointmentRoutes = require('./routes/appointmentRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use('/api/appointments', appointmentRoutes);
// Later: app.use('/api/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;