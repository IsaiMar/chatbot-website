const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

const authMiddleware = require('../middleware/authMiddleware');

// Require authentication for all routes
router.route('/')
  .get(authMiddleware, getAppointments)
  .post(authMiddleware, createAppointment);

router.route('/:id')
  .get(authMiddleware, getAppointmentById)
  .put(authMiddleware, updateAppointment)
  .delete(authMiddleware, deleteAppointment);

module.exports = router;
