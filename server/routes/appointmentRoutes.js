const express = require('express');
const router = express.Router();

// Example GET route
router.get('/', (req, res) => {
  res.json({ message: 'Appointments API endpoint works!' });
});

module.exports = router;