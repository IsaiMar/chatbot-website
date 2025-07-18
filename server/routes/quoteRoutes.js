const express = require("express");
const router = express.Router();
const { createQuote } = require("../controllers/quoteController");

// No authentication required for quote requests
router.post("/", createQuote);

module.exports = router;
