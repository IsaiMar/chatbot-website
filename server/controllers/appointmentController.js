const Appointment = require('../models/Appointment');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, pestType, date, notes } = req.body;

    const appointment = await Appointment.create({
      name,
      email,
      phone,
      pestType,
      date,
      notes,
      userId: req.userId,
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating appointment' });
  }
};

// @desc    Get all appointments for logged-in user
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching appointments' });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // 🔒 Check ownership
    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching appointment' });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // 🔒 Check ownership
    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating appointment' });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // 🔒 Check ownership
    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await appointment.deleteOne();
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting appointment' });
  }
};
