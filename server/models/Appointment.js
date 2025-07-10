const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    pestType: String,
    date: Date,
    notes: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
